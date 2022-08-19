<template>
  <h2 class="text-lg text-blue-700">Project Information</h2>
  <section class="rounded-lg bg-[#E0F2FE] text-base">
    <div class="mx-auto max-w-7xl">
      <div class="flex h-[62px] flex-wrap items-center justify-between px-4">
        <div class="flex w-0 flex-1 items-center">
          <i-bi-info-circle-fill class="flex-shrink-1 text-[#0369A1]" />
          <p class="my-0 ml-3 truncate font-medium text-white">
            <span class="text-[#0369A1]"
              >Congratulations for having a great project. Please
              <a href="#">see Pitch Deck sample here</a> for
              well-prepared.</span
            >
          </p>
        </div>
      </div>
    </div>
  </section>
  <a-form
    :model="formState"
    name="basic"
    :label-col="{ span: 8 }"
    :wrapper-col="{ span: 16 }"
    autocomplete="off"
    class="add-project space-y-6"
    @finish="onFinish"
    @finish-failed="onFinishFailed"
  >
    <a-form-item
      label="Project name"
      name="name"
      :rules="[{ required: true}]"
    >
      <a-input v-model:value="formState.name" />
    </a-form-item>
    <a-form-item
      label="Main description"
      name="description"
      :rules="[{ required: true}]"
    >
      <a-textarea v-model:value="formState.description" />
    </a-form-item>
    <!-- @link https://vuejs.org/guide/components/slots.html#fallback-content -->
    <a-form-item
      name="category"
    >
      <template #label>
        Category
        <span class="ml-1 text-gray-400"
          >(website, adon, extension, app, other...)</span
        >
      </template>
      <a-select v-model:value="formState.category">
        <a-select-option value="Website">Website</a-select-option>
        <a-select-option value="Addon">Addon</a-select-option>
        <a-select-option value="Extension">Extension</a-select-option>
        <a-select-option value="App">App</a-select-option>
        <a-select-option value="Other">Other</a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item name="skill" label="Programing lang, framework">
      <a-select
        v-model:value="formState.skill"
        mode="multiple"
      >
        <a-select-option value="HTML">HTML</a-select-option>
        <a-select-option value="CSS">CSS</a-select-option>
        <a-select-option value="Java">Java</a-select-option>
        <a-select-option value="ReactNative">ReactNative</a-select-option>
        <a-select-option value="Bootstrap">Bootstrap</a-select-option>
        <a-select-option value="Tailwind">Tailwind</a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item name="time_to_do" label="Time to do" v-bind="rangeConfig">
      <a-range-picker
        v-model:value="formState['time_to_do']"
        value-format="YYYY-MM-DD"
      />
    </a-form-item>

<!--    <a-form-item
      label="Programming Language"
      name="username"
      :rules="[{ required: true, message: 'Please input your username!' }]"
    >
      <a-input v-model:value="formState.username" />
    </a-form-item>-->
    <a-form-item label="Budget" name="budget">
      <a-input-number v-model:value="formState.budget">
        <template #addonAfter>
          <a-select v-model:value="addonAfterValue" style="width: 80px">
            <a-select-option v-for="item in list" :key="item" :value="item">
              {{ item }}
            </a-select-option>
          </a-select>
        </template>
      </a-input-number>
    </a-form-item>

    <a-form-item label="Main pictures">
      <a-form-item name="dragger" no-style>
        <a-upload-dragger
          v-model:fileList="formState.dragger"
          name="files"
          action="/upload.do"
        >
          <p class="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p class="ant-upload-text">
            Click or drag file to this area to upload
          </p>
          <p class="ant-upload-hint">Support for a single or bulk upload.</p>
        </a-upload-dragger>
      </a-form-item>
    </a-form-item>

    <a-form-item label="Files">
      <a-form-item name="dragger" no-style>
        <a-upload-dragger
          v-model:fileList="formState.dragger"
          name="files"
          action="/upload.do"
        >
          <p class="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p class="ant-upload-text">
            Click or drag file to this area to upload
          </p>
          <p class="ant-upload-hint">Support for a single or bulk upload.</p>
        </a-upload-dragger>
      </a-form-item>
    </a-form-item>

    <a-row>
      <a-col :span="8"> Privacy </a-col>
      <a-col :span="16">
        <div class="-space-y-px rounded-md bg-white">
          <label
            class="relative flex cursor-pointer rounded-tl-md rounded-tr-md border p-4 focus:outline-none"
          >
            <input
              v-model="formState.is_privacy"
              type="radio"
              :value="true"
              class="mt-0.5 h-4 w-4 shrink-0 cursor-pointer border-gray-300 text-indigo-600 focus:ring-indigo-500"
              aria-labelledby="privacy-setting-0-label"
              aria-describedby="privacy-setting-0-description"
            />
            <span class="ml-3 flex flex-col">
              <span
                id="privacy-setting-0-label"
                class="block text-sm font-medium"
              >
                Public
              </span>
              <span id="privacy-setting-0-description" class="block text-sm">
                This project will be visible to public.
              </span>
            </span>
          </label>

          <label
            class="relative flex cursor-pointer rounded-bl-md rounded-br-md border p-4 focus:outline-none"
          >
            <input
              v-model="formState.is_privacy"
              type="radio"
              :value="false"
              class="mt-0.5 h-4 w-4 shrink-0 cursor-pointer border-gray-300 text-indigo-600 focus:ring-indigo-500"
              aria-labelledby="privacy-setting-2-label"
              aria-describedby="privacy-setting-2-description"
            />
            <span class="ml-3 flex flex-col">
              <span
                id="privacy-setting-2-label"
                class="block text-sm font-medium"
              >
                Protected
              </span>
              <!-- Checked: "text-indigo-700", Not Checked: "text-gray-500" -->
              <span id="privacy-setting-2-description" class="block text-sm">
                All information is not visible to public.
              </span>
            </span>
          </label>
        </div>
      </a-col>
    </a-row>

    <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
      <a-button type="primary" html-type="submit">Submit</a-button>
    </a-form-item>
  </a-form>
</template>

<script lang="ts" setup>
interface FormState {
  name: string
  description: string
  category: string
  status: any
  time_to_do: any
  information: string
  level: string
  version: string
  budget: string
  is_privacy: boolean
  attachments: any
}

const rangeConfig = {
  rules: [
    { type: 'array' as const, required: true, message: 'Please select time!' }
  ]
}

const formState = reactive<FormState>({
  name: '',
  description: '',
  category: '',
  status: 'draff_project',
  time_to_do: null,
  skill: [],
  information: '',
  level: '',
  version: '',
  budget: '',
  is_privacy: true,
  attachments: {
    main_pictures: {},
    other_files: {}
  },
})
const onFinish = (values: any) => {
  console.log('formState', {formState})
  console.log('Success:', values)
}

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo)
}

/**
 * @link https://vuejs.org/guide/essentials/list.html
 */
const list = ref<string[]>(['USD', 'VND'])
</script>

<style>
.add-project button svg {
  @apply inline;
}
.add-project .ant-form-item-label {
  @apply text-left;
}
.ant-form-item-label > label.ant-form-item-required:not(.ant-form-item-required-mark-optional)::before{
  position: absolute;
  right: -12px;
}
</style>
