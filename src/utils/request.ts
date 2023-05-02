import axios, { type Method } from 'axios'
import { useUserStore } from '@/stores'
import router from '@/router'
import { showToast } from 'vant'

/* 
  定义后端接口返回的数据类型
*/
type Data<T> = {
  code: number
  message: string
  data: T
}

const baseURL = 'https://consult-api.itheima.net'

/* 创建axios实例 */
const service = axios.create({
  baseURL,
  timeout: 10000
})

/*
  配置请求拦截器 携带token
*/
service.interceptors.request.use(
  (config) => {
    /* 
    store的user对象中包含token则直接使用放到请求头中即可
  */
    const store = useUserStore()
    if (store.user?.token && config.headers) {
      config.headers['Authorization'] = `Bearer ${store.user?.token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

/* 
  配置响应拦截器 抽离出有效数据，增加401拦截
*/

service.interceptors.response.use(
  (res) => {
    /* 
    处理业务失败 后台约定，响应code如果不是10000，则表示业务逻辑失败
    解构核心响应数据
  */
    if (res.data?.code !== 10000) {
      showToast(res.data?.message || '业务处理失败')
      return Promise.reject(res.data)
    }
    // console.log('>>> resposne data: ', res)
    //  业务处理成功，返回响应数据
    return res.data
  },
  (error) => {
    /* 
      响应状态码非200都会进入这个异常，401意味着TOKEN失效
    */
    if (error.response.status === 401) {
      console.log('>>>>>>>>>>> error: ', error.response.data.message)
      showToast(error.response.data.message)
      // 删除用户信息
      const store = useUserStore()
      store.delUser()
      // 跳转登录，带上接口失效所在页面的地址，登录完成后回跳使用
      router.push({
        path: '/login',
        query: {
          callbackUrl: router.currentRoute.value.fullPath
        }
      })
    }
    return Promise.reject(error)
  }
)

/* 
  请求工具函数
*/
const request = <T>(url: string, method: Method = 'GET', submitData?: object) => {
  /* 
    这种泛型是什么写法?，为什么要传2个泛型参数
    泛型参数1：axios.request中定义的泛型参数1是any类型
    参数2： AxiosResponse类型

  */
  return service.request<T, Data<T>>({
    url,
    method,
    // 这里为什么要加 [] 啊，不理解！！！
    [method.toUpperCase() === 'GET' ? 'params' : 'data']: submitData
  })
}

export { service, baseURL, request }
