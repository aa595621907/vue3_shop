import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import elementPlus from '@/plugins/elementPlus.ts'
import 'element-plus/lib/theme-chalk/index.css'

// 公共样式
import './assets/common/common.css'

// 字体图标
import './assets/fonts/iconfont.css'

const app = createApp(App)
elementPlus(app)

app.use(router).mount('#app')

// createApp(App)
//   .use(router)
//   .mount('#app')
