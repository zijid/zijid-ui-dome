import {createApp,h,}  from "vue"
import z,{ Message} from "zijid-ui";
import App from "./App.vue";
import "./index.css"
const app=createApp(App)
app.use(z)
console.log(`z:`,z);
app.mount("#app");