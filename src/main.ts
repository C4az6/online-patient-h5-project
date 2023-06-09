import { createApp } from 'vue'
import pinia from '@/stores'
import App from './App.vue'
import router from './router'
import 'vant/es/toast/style'

import './assets/main.css'
import 'virtual:svg-icons-register'

const app = createApp(App)

app.use(pinia)
app.use(router)

app.mount('#app')
