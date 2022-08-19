<template>
  <h2 class="mt-5 text-lg text-blue-700">Project Information</h2>
  {{ $env('VITE_BUNNY_URL') }}
  <section class="mb-10 mt-5 rounded-lg bg-[#E0F2FE] text-base">
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
  <!-- Ko sử dụng thì xoá @finish-failed="onFinishFailed" -->
  <a-form
    :model="formState"
    :rules="rules"
    name="basic"
    :label-col="{ span: 8 }"
    :wrapper-col="{ span: 16 }"
    autocomplete="off"
    class="add-project space-y-6"
    @finish="mutate"
  >
    <a-form-item label="Project name" name="name">
      <a-input v-model:value="formState.name" />
    </a-form-item>
    <a-form-item label="Main description" name="description">
      <a-textarea v-model:value="formState.description" />
    </a-form-item>
    <!-- @link https://vuejs.org/guide/components/slots.html#fallback-content -->
    <a-form-item name="category">
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
      <!-- Dùng loop -->
      <a-select v-model:value="formState.skill" mode="multiple">
        <a-select-option
          v-for="(item, index) in skills"
          :key="index"
          :value="item"
        >
          {{ item }}
        </a-select-option>
      </a-select>
    </a-form-item>

    <a-form-item name="time_to_do" label="Time to do">
      <a-range-picker value-format="YYYY-MM-DD" @change="onChangeRangePicker" />
    </a-form-item>

    <a-form-item label="Budget" name="budget">
      <!-- a-input-number sẽ chuyển value về number... muattion yêu cầu budget là string -->
      <!-- có thể cover string qua number bằng v-model:value.number -->
      <a-input v-model:value="formState.budget" style='width: auto'>
        <template #addonAfter>
          <!-- ko có hàm addonAfterValue => v-model:value="addonAfterValue" error  -->
          <a-select style="width: 100px">
            <a-select-option
              v-for="item in currencies"
              :key="item"
              :value="item"
            >
              {{ item }}
            </a-select-option>
          </a-select>
        </template>
      </a-input>
    </a-form-item>

    <a-form-item label="Main pictures">
      <a-form-item name="dragger" no-style>
        <a-upload-dragger
          name="files"
          action="/upload.do"
        >
          <p class="ant-upload-drag-icon flex justify-center text-[30px]">
            <!-- Icon bên dưới ko ồn tại -->
            <!-- <InboxOutlined />-->
            <!-- @link https://icones.js.org/ -->
            <i-ic-sharp-cloud-upload />
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
          name="files"
          action="/upload.do"
        >
          <p class="ant-upload-drag-icon flex justify-center text-[30px]">
            <i-ic-sharp-cloud-upload />
          </p>
          <p class="ant-upload-text">
            Click or drag file to this area to upload
          </p>
          <p class="ant-upload-hint">Support for a single or bulk upload.</p>
        </a-upload-dragger>
      </a-form-item>
    </a-form-item>

    <!-- Không có khái niệm form control -> chỉ cần tạo ntn là dc...html bên trong ko cần tuân theo quy tắc nào -->
    <a-form-item label="Privacy" name="is_privacy">
      <div class="-space-y-px rounded-md bg-white">
        <label
          class="relative flex cursor-pointer rounded-tl-md rounded-tr-md border p-4 focus:outline-none"
        >
          <input
            v-model="formState.is_privacy"
            type="radio"
            :value="true"
            :checked="!!formState.is_privacy"
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
            :checked="!formState.is_privacy"
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
    </a-form-item>

    <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
      <a-button type="primary" html-type="submit" :loading='loading'>Submit</a-button>
    </a-form-item>
  </a-form>
</template>

<script lang="ts" setup>
import { Rule } from 'ant-design-vue/es/form'
import {
  UpsertProjectMutation,
  UpsertProjectMutationVariables
} from '#apollo/it/mutations/__generated__/UpsertProjectMutation'
import { AddProjectInput } from '@dto/project-input.dto'
import { Status } from '#apollo/__generated__/itTypes'
import { Dayjs } from 'dayjs'

/**
 * @link https://vuejs.org/guide/essentials/list.html
 */
const currencies = ref<string[]>(['USD', 'VND'])
const skills = ref<string[]>([
  'HTML',
  'Java',
  'ReactNative',
  'Bootstrap',
  'Tailwind'
])

const formState = reactive<AddProjectInput>({
  name: '',
  description: '',
  category: '',
  // status có trong type của Project
  status: Status.draff_project,
  time_to_do: {
    from: '',
    to: ''
  },
  skill: [],
  information: '',
  level: '',
  version: '',
  budget: '',
  is_privacy: true,
  attachments: {
    main_pictures: {},
    other_files: {}
  }
})
const rules = ref<Record<string, Rule[]>>({
  name: [{ required: true }],
  description: [{ required: true }],
  time_to_do: [
    {
      required: true,
      validator(rule, value): Promise<void> {
        if (!value) {
          return Promise.resolve()
        }
        if (value.from > value.to) {
          return Promise.reject('From date must be less than to date')
        }
        return Promise.resolve()
      }
    },
    {
      validator(rule, value) {
        if (value.from && value.to) {
          return Promise.resolve()
        }
        return Promise.reject('Please select time to do')
      }
    }
  ],
  budget: [
    {
      validator(rule, value) {
        if (!value) {
          return Promise.resolve()
        }
        if (Number(value) > 0) {
          return Promise.resolve()
        }
        return Promise.reject('Please select budget')
      }
    }
  ]
})

/**
 * const client = useItSquare()
 * Đây là sử dụng inject vào component. Chỉ dc inject trong setup script..hoặc func dc gọi tức thì
 * https://vuejs.org/guide/components/provide-inject.html#prop-drilling
 * @param values
 */

// const client = useItSquare()
// const onFinish = async () => {
//   try {
//     const data = await client.mutate<
//       UpsertProjectMutation,
//       UpsertProjectMutationVariables
//     >({
//       // ko cân fimport...có sẵn trong global
//       mutation: UPSERT_PROJECT,
//       // Đầu vào là input: { varsiables }
//       variables: {
//         input: formState
//       }
//     })
//     console.log('data', { data })
//     // @ts-ignore
//     // this.user = data?.data?.me
//   } catch (e) {
//     // Logout
//     console.log(e)
//   }
// }

/**
 * @description Dùng shorthand sẽ tự động tạo loading, vfa handle error và auto cache. Loading dùng cho button submit...
 * Shorthand for: mutation
 */
const { mutate, loading } = useMutation<UpsertProjectMutation, UpsertProjectMutationVariables>(UPSERT_PROJECT, {
  variables: {
    input: formState
  }
})

// console.log('aa', formState.time_to_do)
// const { mutate, loading } = useMutation(UPSERT_PROJECT, {
//   variables: {
//     input: formState
//   }
// })

/**
 * @description Xảy ra khi range picker thay đổi
 * có 2 params là dates: Dayjs[] | string[], dateStrings: string[]
 * @param dates
 */
const onChangeRangePicker = (dates: [string, string] | [Dayjs, Dayjs]) => {
  if(dates.length == 2 && Object.values(dates).every((date: string | Dayjs) => typeof date === 'string')) {
    formState.time_to_do!.from = dates[0] as string
    formState.time_to_do!.to = dates[1] as string
  }
}
</script>

<style>
/**
 * @description button svg phạm vi quá rộng... một số chỗ khác vô tình có thể apply style này
 */
.add-project button svg {
  @apply inline;
}

.add-project .ant-form-item-label {
  @apply text-left;
}

/**
 * @description Phạm vi quá rộng sẽ ảnh hưởng tới form khác...khi form này dc tải => inject css vào head...những form sau có selector này sẽ bị ảnh hưởng
 * .ant-form-item-required::before => .ant-form-item-required::before
 */
.add-project .ant-form-item-required::before {
  position: absolute;
  right: -12px;
}
</style>
