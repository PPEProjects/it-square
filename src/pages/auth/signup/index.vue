<template>
  <a-form
    :model="formState"
    :rules='rules'
    layout='vertical'
    name="basic"
    autocomplete="off"
    @finish="mutate"
    @finish-failed="onFinishFailed"
  >

    <a-form-item
      label="Name"
      name="name"
    >
      <a-input v-model:value="formState.name" placeholder='User A' />
    </a-form-item>


    <a-form-item
      label="Email"
      name="email"
    >
      <a-input v-model:value="formState.email" placeholder='user@it-square.com' />
    </a-form-item>

    <a-form-item
      label="Phone"
      name="phone"
    >
      <a-input v-model:value="formState.phone" placeholder='0123456789' />
    </a-form-item>

    <a-form-item
      label="Password"
      name="password"
    >
      <a-input-password v-model:value="formState.password" placeholder='**********' />
    </a-form-item>

    <a-form-item name='acceptEmail'>
      <div class='flex'>
        <a-switch v-model:checked="formState.acceptEmail" />
        <p class='ml-3 mb-0 text-xs opacity-70'>News and features updates, as well as occasional company announcements.</p>
      </div>
    </a-form-item>

    <div class='flex justify-center'>
      <a-button type="primary" html-type="submit" :loading='loading'>
        <span class='px-3'>Sign Up</span>
      </a-button>
    </div>
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
import { SignUpInputDto } from '@dto/auth-input.dto'
import { Rule } from 'ant-design-vue/es/form'
import { useMutation } from '@vue/apollo-composable'
import { SIGN_UP } from '#apollo/it/mutations/auth.mutations'
import { SignUp, SignUpVariables } from '#apollo/it/mutations/__generated__/SignUp'

const formState = reactive<SignUpInputDto>({
  name: '',
  email: '',
  phone: '',
  password: '',
  acceptEmail: false,
})

const rules = ref<Record<string, Rule[]>>(
  {
    name: [
      {
        required: true,
        message: 'Please input your name!',
      },
      {
        min: 2,
        max: 30,
        message: 'Name must be between 2 and 10 characters!',
      }
    ],
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
    phone: [
      {
        required: true,
        message: 'Please input your phone!'
      },
      {
        pattern: /^0[3456789]\d{8}$/,
        message: 'The phone number is not valid!'
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

const { mutate, loading } = useMutation<SignUp, SignUpVariables>(SIGN_UP, {
  variables: {
    input: {
      name: formState.name,
      email: formState.email,
      phone_number: formState.phone,
      password: formState.password,
      password_confirmation: formState.password,
    }
  }
})

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
}

</script>

<style scoped>
.action {
  @apply absolute bottom-[32px] left-0 right-0 flex items-center justify-center
}
</style>
