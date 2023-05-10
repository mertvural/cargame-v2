import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import "@/assets/base.css"
const app = createApp(App)
app.use(createPinia()).mount('#app')
