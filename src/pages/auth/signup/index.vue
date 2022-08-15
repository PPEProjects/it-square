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
      label="Name"
      name="name"
      :rules="[{ required: true, message: 'Please input your name!' }]"
    >
      <a-input v-model:value="formState.name" placeholder='User A' />
    </a-form-item>


    <a-form-item
      label="Email"
      name="email"
      :rules="[{ required: true, message: 'Please input your email!' }]"
    >
      <a-input v-model:value="formState.email" placeholder='user@it-square.com' />
    </a-form-item>

    <a-form-item
      label="Phone"
      name="phone"
      :rules="[{ required: true, message: 'Please input your phone!' }]"
    >
      <a-input v-model:value="formState.phone" placeholder='0123456789' />
    </a-form-item>

    <a-form-item
      label="Password"
      name="password"
      :rules="[{ required: true, message: 'Please input your password!' }]"
    >
      <a-input-password v-model:value="formState.password" placeholder='**********' />
    </a-form-item>

    <a-form-item name='acceptEmail'>
      <div class='flex'>
        <a-switch v-model:checked="formState.acceptEmail" />
        <p class='ml-3 mb-0 text-xs opacity-70'>News and features updates, as well as occasional company announcements.</p>
      </div>
    </a-form-item>

    <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
      <a-button type="primary" html-type="submit">
        Submit
      </a-button>
    </a-form-item>
  </a-form>
  <div class='text-center text-gray-500 action'>
    <p class='mb-0'>
      Already have an account?
      <router-link to='/auth/signin' class='font-semibold underline'>
        Sign In!
      </router-link>
    </p>
  </div>
</template>

<script lang='ts' setup>
import { RegisterInputDto } from '@dto/auth-input.dto'

const formState = reactive<RegisterInputDto>({
  name: '',
  email: '',
  phone: '',
  password: '',
  acceptEmail: false,
})

const onFinish = (values: RegisterInputDto) => {
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
