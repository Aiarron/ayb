import { createApp } from 'vue'
import App from './App.vue'
import elementPlus from './element-plus/index'
import 'element-plus/dist/index.css'
import './styles/tailwindcss.css'

createApp(App)
  .use(elementPlus)
  .mount('#app')
