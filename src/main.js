import { createApp } from 'vue'
import App from './App.vue'
import router from "./index.js";
import './index.css'
import {createPinia} from "pinia";
import redaxios from "redaxios"

const instance = redaxios.create({
    withCredentials: false,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
    baseURL: 'http://auto.loc'

})

const pinia = createPinia()
const app = createApp(App)
    .use(pinia)
    .use(router);
app.config.globalProperties.$http = instance;
app.mount('#app')




