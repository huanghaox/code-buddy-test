import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
const pinia = createPinia()
createApp(App).use(pinia)
.use(ElementPlus, {
  locale: zhCn,
})
.mount('#app')