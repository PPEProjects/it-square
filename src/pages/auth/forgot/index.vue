<template>

  <div>
    <p class='mb-0 text-sm opacity-90'>Don't worry! Fill in your email, if we can match it we'll send you a link to reset your password.</p>

    <div class='h-[50px]'></div>

    <a-form
      :model="formState"
      :rules='rules'
      layout='vertical'
      name="basic"
      autocomplete="off"
      @finish="onFinish"
      @finish-failed="onFinishFailed"
    >
      <a-form-item
        label="Email"
        name="email"
      >
        <a-input v-model:value="formState.email" placeholder='user@it-square.com' />
      </a-form-item>

      <div class='flex justify-center'>
        <a-button type="primary" html-type="submit">
          <p class='px-3'>Reset Password</p>
        </a-button>
      </div>

    </a-form>

    <div class='mt-auto'></div>

  </div>
  <div class='text-center text-gray-500 action'>
    <p class='mb-0'>
      Did you remember?
      <router-link to='/auth/signin' class='font-semibold underline'>
        SIgn In!
      </router-link>
    </p>
  </div>
</template>

<script lang='ts' setup>
import { ForgotPasswordInputDto } from '../../../dto/auth-input.dto'
import { Rule } from 'ant-design-vue/es/form'

const formState = reactive<ForgotPasswordInputDto>({
  email: ''
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
    ]
  }
)

const onFinish = (values: ForgotPasswordInputDto) => {
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
