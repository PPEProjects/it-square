<template>
  <a-form
    :model="formState"
    :rules="rules"
    layout='vertical'
    name="basic"
    autocomplete="off"
    @finish="onFinish"
    @finish-failed="onFinishFailed"
  >
    <a-form-item
      label="Password"
      name="password"
    >
      <a-input-password v-model:value="formState.password" placeholder='**********' />
    </a-form-item>

    <a-form-item
      label="Confirm Password"
      name="rePassword"
    >
      <a-input-password v-model:value="formState.rePassword" placeholder='**********' />
    </a-form-item>

    <div class='flex justify-center'>
      <a-button type="primary" html-type="submit">
        Update Password
      </a-button>
    </div>
  </a-form>
  <div class='text-center text-gray-500 action'>
    <p class='mb-0'>
      Did you remember the password?
      <router-link to='/auth/signin' class='font-semibold underline'>
        Sign In!
      </router-link>
    </p>
  </div>
</template>

<script lang='ts' setup>
import { NewPasswordInputDto } from '../../../dto/auth-input.dto'
import { Rule } from 'ant-design-vue/es/form'

const formState = reactive<NewPasswordInputDto>({
  password: '',
  rePassword: ''
})

const rules = ref<Record<string, Rule[]>>(
  {
    password: [
      {
        required: true,
        message: 'Please input your password!'
      },
      {
        min: 8,
        message: 'Password must be at least 8 characters long!'
      }
    ],
    rePassword: [
      {
        required: true,
        message: 'Please input your confirm password!'
      },
      {
        validator: async (_rule: Rule, value: string) => {
          if (value === '') {
            return Promise.reject('Please input the password again');
          } else if (value !== formState.password) {
            return Promise.reject("Two inputs don't match!");
          } else {
            return Promise.resolve();
          }
        },
      }
    ]
  }
)

const onFinish = (values: NewPasswordInputDto) => {
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
