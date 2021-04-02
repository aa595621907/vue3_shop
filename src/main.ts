import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import elementPlus from '@/plugins/elementPlus.ts'
import 'element-plus/lib/theme-chalk/index.css'
import axios from 'axios'
// 公共样式
import './assets/common/common.css'

const app = createApp(App)
elementPlus(app)
app.config.globalProperties.$http = axios
app.use(router).mount('#app')

// createApp(App)
//   .use(router)
//   .mount('#app')
