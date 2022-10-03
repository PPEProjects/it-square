<template>
  <base-modal ref="modal" event="authModal" :max-width="450" title="Sign in">
    <template #default>
      <div style="width: 250px; height: 200px" class="mx-auto">
        <vue-lottie-player
          width="250px"
          height="200px"
          loop
          path="https://assets8.lottiefiles.com/packages/lf20_7jnffdxl.json"
        />
      </div>

      <div class="text-center">
        <small class="text-xs italic text-gray-400 opacity-90">
          Đăng Nhập
        </small>
      </div>
      <form
        id="authForm"
        v-auto-animate
        class="mx-auto mt-4 max-w-xs"
        @submit.prevent="authAction"
      >
        <text-field
          v-if="mode === 'register'"
          v-model:value="name"
          placeholder="Tên"
          class="mb-3"
        >
          <template #prefix>
            <i-ri-user-4-fill class="text-gray-400" />
          </template>
        </text-field>

        <text-field v-model:value="email" placeholder="Email ID">
          <template #prefix>
            <i-ic-outline-alternate-email class="text-gray-400" />
          </template>
        </text-field>

        <text-field
          v-model:value="password"
          placeholder="Password"
          type="password"
          class="mt-3"
        >
          <template #prefix>
            <i-ic-round-vpn-key class="text-gray-400" />
          </template>

          <template v-if="mode === 'login'" #suffix>
            <a
              class="ml-3 block flex-shrink-0 cursor-pointer text-xs text-primary-500"
            >
              Quên Mật Khẩu?
            </a>
          </template>
        </text-field>

        <div class="my-1 mt-3 text-center text-xs">
          <p class="text-gray-400">
            {{ mode === 'login' ? 'Chưa có tài khoản?' : 'Đã có tài khoản?' }}
            <a
              class="ml-1 cursor-pointer text-primary-500"
              @click="
                mode === 'register' ? (mode = 'login') : (mode = 'register')
              "
            >
              {{ mode === 'login' ? 'Đăng Ký' : 'Đăng Nhập' }}
            </a>
          </p>
        </div>

        <button
          class="mr-6 mt-3 flex w-full items-center justify-center rounded-full bg-gradient-to-r from-primary-500 to-primary-700 px-3 py-2.5 uppercase text-white shadow-lg shadow-primary-200"
          type="submit"
        >
          <i-material-symbols-arrow-circle-right />
          <span class="ml-1 text-xs font-semibold">
            {{ mode === 'login' ? 'Đăng Nhập' : 'Đăng Ký' }}
          </span>
        </button>

        <div>
          <div class="mt-5 flex items-center">
            <span class="h-px w-full bg-gray-200" />
            <span class="mx-3 flex-shrink-0 text-xs font-medium text-gray-400"
              >HOẶC TIẾP TỤC VỚI</span
            >
            <span class="h-px w-full bg-gray-200" />
          </div>
          <div class="mt-5 flex items-center justify-center">
            <button
                class="mx-3 scale-95 transform"
                @click="googleSignIn"
            >
              <img width="25" height="25" src="/images/logo/gg.png" alt="" />
            </button>
            <button class="mx-3 -translate-y-0.5 transform">
              <img
                src="/images/logo/apple.png"
                alt=""
                class="h-[25px] w-auto object-cover"
              />
            </button>
          </div>
        </div>
      </form>
      <div class="mt-8 text-center text-xs text-gray-400">
        <span class="mr-1">© 2021 Comix</span>
        <i>|</i>
        <span class="mx-1">Terms of Service</span>
        <i>|</i>
        <span class="ml-1">Privacy Policy</span>
      </div>

      <message-modal
        v-if="message"
        v-model:message="message"
        :success="isAuthenticated"
      />
    </template>
  </base-modal>
</template>

<script setup lang="ts">
import MyModal from '../modals/BaseModal.vue'
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from 'firebase/auth'
import { useFirebaseContext } from '@composable/useFirebase'
import type { FirebaseError } from 'firebase/app'
import { AuthErrorCodes, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'

const firebaseCtx = useFirebaseContext()

const { isAuthenticated, user } = useAuth(getAuth(firebaseCtx))


const mode = ref<'login' | 'register'>('login')

// Form data
const name = ref('Nguyên')
const email = ref<string>('dnstylish@gmail.com')
const password = ref<string>('Khoi@025')

const message = ref<string>('')

// active button
const isReady = computed(() => email.value && password.value)

// Support login action
const router = useRouter()

// Thông báo

const authAction = async () => {
  if(mode.value === 'login') {
    await login()
  } else {
    await register()
  }
}

/**
 * Lưu token vào cookie
 * Gi token vào store vad redirect đến trang chủ
 */
const login = async () => {
  console.log('login')
  try {
    await signInWithEmailAndPassword(
      getAuth(firebaseCtx),
      email.value,
      password.value
    )
    message.value = 'Đăng nhập thành công'
  } catch (e) {
    const _e = e as FirebaseError
    if (_e.code === AuthErrorCodes.USER_DELETED) {
      message.value = 'Tài khoản không tồn tại'
    } else if (_e.code === AuthErrorCodes.USER_DISABLED) {
      message.value = 'Tài khoản đã bị khóa'
    } else if (_e.code === AuthErrorCodes.INVALID_PASSWORD) {
      message.value = 'Mật khẩu không đúng'
    } else if (_e.code === AuthErrorCodes.INVALID_EMAIL) {
      message.value = 'Email không hợp lệ'
    } else {
      message.value = 'Đăng nhập thất bại'
    }
    //
  }
}

const register = async () => {
  console.log('register')
  try {
    const data = await createUserWithEmailAndPassword(
      getAuth(firebaseCtx),
      email.value,
      password.value
    )

    const db = getDatabase();
    await dbSet(dbRef(db, 'users/' + data.user.uid), {
      name: name,
      email: email
    })
    message.value = 'Đăng ký thành công'
  } catch (e) {
    console.log(e)
    const _e = e as FirebaseError
    if (_e.code === AuthErrorCodes.USER_DELETED) {
      message.value = 'Tài khoản không tồn tại'
    } else if (_e.code === AuthErrorCodes.USER_DISABLED) {
      message.value = 'Tài khoản đã bị khóa'
    } else if (_e.code === AuthErrorCodes.INVALID_PASSWORD) {
      message.value = 'Mật khẩu không đúng'
    } else if (_e.code === AuthErrorCodes.INVALID_EMAIL) {
      message.value = 'Email không hợp lệ'
    } else {
      message.value = 'Đăng nhập thất bại'
    }
    //
  }
}

const googleSignIn = () => signInWithPopup(getAuth(firebaseCtx), new GoogleAuthProvider())

const modal = ref<InstanceType<typeof MyModal> | null>(null)
watch(isAuthenticated, (val) => {
  if (val) {
    modal.value?.dispose()
  }
})

</script>
