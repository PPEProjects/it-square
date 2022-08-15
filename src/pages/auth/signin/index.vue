<template>
  <a-form
    :model="formState"
    layout='vertical'
    name="basic"
    autocomplete="off"
    @finish="onFinish"
    @finish-failed="onFinishFailed"
  >
    <a-form-item
      label="Email"
      name="email"
      :rules="[{ required: true, message: 'Please input your email!' }]"
    >
      <a-input v-model:value="formState.email" placeholder='user@it-square.com' />
    </a-form-item>

    <a-form-item
      label="Password"
      name="password"
      :rules="[{ required: true, message: 'Please input your password!' }]"
    >
      <a-input-password v-model:value="formState.password" placeholder='**********' />
    </a-form-item>

    <div class='text-center text-gray-500'>
      <p>Forgot password? <a href='javascript:void(0)'>Click here</a></p>
    </div>

    <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
      <a-button type="primary" html-type="submit">
        Submit
      </a-button>
    </a-form-item>
  </a-form>
  <div class='text-center text-gray-500 action'>
    <p class='mb-0'>
      Don't have account?
      <router-link to='/auth/signup' class='font-semibold underline'>
        SIgn Up!
      </router-link>
    </p>
  </div>
</template>

<script lang='ts' setup>
import { LoginInputDto } from '@dto/auth-input.dto'

const formState = reactive<LoginInputDto>({
  email: '',
  password: ''
})

const onFinish = (values: LoginInputDto) => {
  console.log('Success:', values);
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
