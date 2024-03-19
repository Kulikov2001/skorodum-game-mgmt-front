import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
//import Vuesax from 'vuesax3'
import 'vuesax3/dist/vuesax.css'

import App from './App.vue'
import router from './router'

const app = createApp(App)
//app.config.globalProperties.BACKEND_API = 'http://localhost:8000/api/v1/';
app.use(createPinia())
app.use(router)
//app.use(Vuesax)
app.mount('#app')
