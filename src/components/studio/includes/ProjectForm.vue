<template>
  <a-form
    :model="formState"
    layout="vertical"
    name="basic"
    autocomplete="off"
    @finish="onFinish"
    @finish-failed="onFinishFailed"
  >
    <a-form-item name="name" class="chapter-name" has-feedback>
      <a-input v-model:value="formState.name" placeholder="Nhập tên dự án" />
    </a-form-item>

    <div class="w-[400px]">
      <a-form-item label="Phân Loại" name="category">
        <a-input
          v-model:value="formState.category"
          placeholder="Phân loại dự án"
        />
      </a-form-item>
    </div>

    <div class="w-[400px]">
      <a-form-item name="technical" has-feedback>
        <!-- Dùng loop -->
       <template #label>
         <span>Kĩ Năng</span>
       </template>

        <a-input
            v-model="inputTag"
            placeholder="Nhập tag của bạn"
            size="large"
            @press-enter="addTag()"
        ></a-input>

        <template #extra>
          <small>
            - Nhấn enter để thêm tag mới.
            <br />
            - Các tag này có thể giúp người đọc tìm kiếm được truyện của
            bạn!
          </small>
        </template>
      </a-form-item>
    </div>
  </a-form>
</template>

<script lang="ts" setup>
import { AddProjectInput } from '@dto/project-input.dto'

const formState = reactive<AddProjectInput>({
  name: '',
  category: '',
  technical: []
})

const inputTag = ref('')
const addTag = () => {
  formState.technical.push(inputTag.value)
  inputTag.value = ''
}

const skills = ref<string[]>([
  'HTML',
  'Java',
  'ReactNative',
  'Bootstrap',
  'Tailwind',
  'Vue',
  'Angular',
  'NodeJS',
  'ExpressJS',
  'MongoDB',
  'MySQL',
  'PostgreSQL',
  'TypeScript',
  'JavaScript',
  'Python',
  'Django',
  'Flask',
  'C++',
  'C#',
  'C'
])

const onFinish = (values: any) => {
  console.log('Success:', values)
}

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo)
}
</script>

<style>
.chapter-name input,
.chapter-name input:focus {
  border: none !important;
  outline: 0 !important;
  box-shadow: none !important;
  width: 100%;
  font-size: 28px;
  font-weight: 600;
  padding-left: 0;
  margin-bottom: 10px;
}
.chapter-name {
  margin-bottom: 10px;
}
</style>
