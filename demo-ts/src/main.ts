import { createApp } from 'vue'
import App from './App.vue'
import zi from "zijid-ui"
import "./index.css"
const app=createApp(App)
app.use(zi)
app.mount('#app')
