<template>
  <a-form
    :model="formState"
    :rules='rules'
    layout='vertical'
    name="basic"
    autocomplete="off"
    @finish="loginHandle"
    @finish-failed="onFinishFailed"
  >
    <a-form-item
      label="Email"
      name="email"
    >
      <a-input v-model:value="formState.email" placeholder='user@it-square.com' />
    </a-form-item>

    <a-form-item
      label="Password"
      name="password"
    >
      <a-input-password v-model:value="formState.password" placeholder='**********' />
    </a-form-item>

    <div class='text-center text-gray-500'>
      <p>Forgot password? <router-link to='/auth/forgot'>Click here</router-link></p>
    </div>

    <div class='flex justify-center'>
      <a-button type="primary" html-type="submit" :loading='loading'>
        <span class='px-3'>Sign In</span>
      </a-button>
    </div>
  </a-form>
  <div class='text-center text-gray-500 action'>
    <p class='mb-0'>
      Don't have account?
      <router-link to='/auth/signup' class='font-semibold underline'>
        Sign In!
      </router-link>
    </p>
  </div>
</template>

<script lang='ts' setup>
import type { Rule } from 'ant-design-vue/es/form';

import { LoginInputDto } from '@dto/auth-input.dto'
import { SignIn, SignInVariables } from '#apollo/it/mutations/__generated__/SignIn'

const userStore = useUserStore()
const cookies = useCookies()

const formState = reactive<LoginInputDto>({
  email: 'dnstylish@gmail.com',
  password: 'Khoi@025'
})

const rules = ref<Record<string, Rule[]>>(
  {
    email: [
      {
        required: true,
        message: 'Please input your email!'
      },
      {
        type: 'email',
        message: 'The input is not valid E-mail!'
      }
    ],
    password: [
      {
        required: true,
        message: 'Please input your password!'
      },
      {
        min: 8,
        message: 'Password must be at least 8 characters long!'
      }
    ]
  }
)

const { mutate, loading } = useMutation<SignIn, SignInVariables>(SIGN_IN, {
  variables: {
    input: {
      email: formState.email,
      password: formState.password
    }
  }
})

/**
 * KO nhất thiết phải tại hàm riêng chỉ cần @finish="mutate"
 */
const loginHandle = async () => {
  try {
    const result = await mutate()

    if(result?.data?.log_in) {
      const { token, user } = result.data.log_in
      if(token && user) {
        userStore.setUser(user)
        userStore.setToken(token)
        cookies?.set('_token', token)
      }
    }
  } catch (e) {
    // Todo: handle error
  }
}

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
}

</script>

<style scoped>
.action {
  @apply absolute bottom-[32px] left-0 right-0 flex items-center justify-center
}
</style>
