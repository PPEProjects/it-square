<template>
  <div
      :id='$route.meta.layout || "default"'
      class='text-gray-600 master-layout'
      :class="[ appStore.openSpotlight ? 'blur-[2px] filter' : '' ]"
  >
    <component :is="layout" :key="layout" />
  </div>
  <spotlight-view />
  <auth-modal />
  <vue-loading-indicator />
</template>

<script lang='ts' setup>
import { useLoadingIndicator } from '@nguyenshort/vue3-loading-indicator'

import {useFirebaseContext} from "@composable/useFirebase"

const firebaseCtx = useFirebaseContext()

import defaultLayout from '@layouts/default.vue'
import studioLayout from '@layouts/studio.vue'
import blankLayout from '@layouts/blank.vue'
import authLayout from '@layouts/auth.vue'

const appStore = useAppStore()
const userStore = useUserStore()

const useUser = useUserStore()
const router = useRouter()

const { user } = useAuth(getAuth(firebaseCtx))
const getUserMetaData = async () => {
  const db = getDatabase()
  dbOnValue(dbRef(db, 'users/' + user.value!.uid), async (data) => {
    if (data.exists()) {
      userStore.user = user.value
    }
  })
}
// Lắng nghe sự kiện đăng nhập
watch(user, (val) => {
  if (val) {
    getUserMetaData()
  } else {
    useUser.logout()
  }
})
// Init app
const vueClientInit = async  () => {
  router.beforeEach((to, from, next) => {
    if (to.meta.private && !useUser.auth) {
      sessionStorage.setItem('returnTo', to.fullPath)
      next('/auth/signin')
    } else {
      next()
    }
  })
}

await vueClientInit()

const layouts = shallowRef<Record<string, ReturnType<typeof defineComponent>>>({
  default: defaultLayout,
  studio: studioLayout,
  blank: blankLayout,
  auth: authLayout
})

const route = useRoute()
const layout = computed(() => {
  // lấy layout từ router
  const _name = Object.keys(layouts.value).includes(route.meta.layout || 'default') ? route.meta.layout || 'default' : 'default'
  return layouts.value[_name]
})

// setup progress bar
const $loading = useLoadingIndicator()
const setupProgressLoading = () => {
  $loading?.start()
  router.beforeEach((to, from, next) => {
    //  does the page we want to go to have a meta.progress object
    //  start the progress bar
    $loading?.start()
    //  continue to next page
    next();
  })
  router.afterEach(() => {
    //  finish the progress bar
    $loading?.finish()
  })
}

setupProgressLoading()

onMounted(() => {
  $loading?.finish()
})
</script>

<style>
@import "@nguyenshort/vue3-loading-indicator/dist/style.css";

.vue-process-bar ._process {
  transition: 200ms linear;
}
</style>
