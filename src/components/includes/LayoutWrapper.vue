<template>
  <div>
    <blank-layout v-if="$route.meta.layout === 'blank'" />
    <default-layout v-else />
  </div>
  <vue-loading-indicator />
</template>

<script lang="ts" setup>
import DefaultLayout from '@layouts/default.vue'
import BlankLayout from '@layouts/blank.vue'
import { useLoadingIndicator } from '@nguyenshort/vue3-loading-indicator'

import { useFirebaseContext } from '@composable/useFirebase'
import { useApollo } from '@composable/useApollo'
import { GetMe } from '#apollo/queries/__generated__/GetMe'
import { GET_ME } from '#apollo/queries/auth.query'

const firebaseCtx = useFirebaseContext()

const useUser = useUserStore()
const router = useRouter()

const { user } = useAuth(getAuth(firebaseCtx))

const apollo = useApollo()
const queryUserData = async() => {
  try {
    const { data } = await apollo.query<GetMe>({
      query: GET_ME
    })
    if (data.me) {
      useUser.setUser(data.me)
    } else {
      useUser.logout()
    }
  } catch (e) {
    useUser.logout()
  }
}

const onAuthChange = async () => {
  if (!user.value) {
    useUser.logout()
  } else {
    const token = await user.value.getIdToken()
    if (token) {
      useUser.token = token
      await queryUserData()
    }
  }
}
// Lắng nghe sự kiện đăng nhập
watch(user, async () => onAuthChange())
watch(() => useUser.auth, async () => {
  console.log('auth change')
})
// Init app
const vueClientInit = async () => {
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

// setup progress bar
const $loading = useLoadingIndicator()
const setupProgressLoading = () => {
  $loading?.start()
  router.beforeEach((to, from, next) => {
    //  does the page we want to go to have a meta.progress object
    //  start the progress bar
    $loading?.start()
    //  continue to next page
    next()
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
@import '@nguyenshort/vue3-loading-indicator/dist/style.css';

.vue-process-bar ._process {
  transition: 200ms linear;
}
</style>
