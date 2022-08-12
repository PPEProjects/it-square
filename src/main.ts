import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import VueCookies from 'vue-cookies'

// Pinna store
import { createPinia } from 'pinia'
const pinia = createPinia()

import router from './routes'


import VueLoadingIndicator from '@nguyenshort/vue3-loading-indicator'

const app = createApp(App)

app.use(VueLoadingIndicator)
app.use(pinia)
app.use(VueCookies)

app.use(router)

app.mount('#app')
