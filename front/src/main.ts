import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import router from './router'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(ElementPlus, {
  locale: zhCn,
})
app.use(router)
app.mount('#app')