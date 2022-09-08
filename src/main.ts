import { createApp } from 'vue'
import './firebase'
import './assets/tailwind.css'

import App from './App.vue'

import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import VueCookies from 'vue-cookies'
import VueLoadingIndicator from '@nguyenshort/vue3-loading-indicator'
import { createPinia } from 'pinia'
import { MotionPlugin } from '@vueuse/motion'
import VueMitter from '@nguyenshort/vue3-mitt'

import router from './routes'
import axios from './plugins/axios'
import animejs from './plugins/animejs'
import dayjs from './plugins/dayjs'
import apollo from '@plugins/apollo'
import utils from '@plugins/utils'

const app = createApp(App)

/**
 * Tự động apply basic animation
 * @link https://auto-animate.formkit.com/
 */
app.use(autoAnimatePlugin)
app.use(VueMitter)

app.use(apollo)
app.use(dayjs)
app.use(animejs)
app.use(axios)
app.use(VueLoadingIndicator, {
  autoFinish: true,
  stepGap: 100
})
app.use(createPinia())
app.use(VueCookies)
app.use(MotionPlugin)
app.use(utils)

app.use(router)

app.mount('#app')

window.$vue = app
