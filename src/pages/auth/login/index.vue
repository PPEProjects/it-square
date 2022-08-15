<template>
  <auth-layout image='/images/auth-bg.png' description='PROJECT DESCRIPTION' title='Login'>
    <template #default>
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
          name="username"
          :rules="[{ required: true, message: 'Please input your username!' }]"
        >
          <a-input v-model:value="formState.email" />
        </a-form-item>

        <a-form-item
          label="Password"
          name="password"
          :rules="[{ required: true, message: 'Please input your password!' }]"
        >
          <a-input-password v-model:value="formState.password" />
        </a-form-item>

        <div class='text-center'>
          <p>Forgot password? <a href='javascript:void(0)'>Click here</a></p>
        </div>

        <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
          <a-button type="primary" html-type="submit">Submit</a-button>
        </a-form-item>
      </a-form>
    </template>
  </auth-layout>
</template>

<script lang='ts' setup>
import { LoginInputDto } from '@dto/auth-input.dto'

const formState = reactive<LoginInputDto>({
  email: '',
  password: ''
})

const onFinish = (values: any) => {
  console.log('Success:', values);
}

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
}

</script>
