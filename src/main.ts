import { createApp } from 'vue'
import './firebase'
import './assets/tailwind.css'

import App from './App.vue'

import VueCookies from 'vue-cookies'
import VueLoadingIndicator from '@nguyenshort/vue3-loading-indicator'
import { createPinia } from 'pinia'

import router from './routes'
import axios from './plugins/axios'
import animejs from './plugins/animejs'
import dayjs from './plugins/dayjs'

const app = createApp(App)

app.use(dayjs)
app.use(animejs)
app.use(axios)
app.use(VueLoadingIndicator)
app.use(createPinia())
app.use(VueCookies)

app.use(router)

app.mount('#app')

window.$vue = app
