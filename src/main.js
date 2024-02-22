import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import globalComponents from './global-components'
import utils from './utils'
import './assets/css/app.css'
import store from './stores'
import Vue3ColorPicker from "vue3-colorpicker"
import "vue3-colorpicker/style.css";
const app = createApp(App).use(router).use(store).use(Vue3ColorPicker).use(createPinia())

globalComponents(app)
utils(app)

app.mount('#app')
