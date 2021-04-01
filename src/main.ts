import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import elementPlus from '@/plugins/elementPlus.ts'
import 'element-plus/lib/theme-chalk/index.css'

const app = createApp(App)
elementPlus(app)
app.use(router).mount('#app')

// createApp(App)
//   .use(router)
//   .mount('#app')
