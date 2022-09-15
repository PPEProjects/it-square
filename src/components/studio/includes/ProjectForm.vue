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

    <div class="flex">
      <div class="w-[400px] flex-shrink-0">

        <a-form-item label="Phân Loại" name="category">
          <a-input
              v-model:value="formState.category"
              placeholder="Phân loại dự án"
          />
        </a-form-item>

        <a-form-item name="skill" label="Programing lang, framework">
          <!-- Dùng loop -->
          <a-select
              v-model:value="formState.skills"
              mode="tags"
              placeholder="Vue, Nuxt,..."
          >
            <a-select-option
                v-for="(item, index) in skills"
                :key="index"
                :value="item"
            >
              {{ item }}
            </a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item name="time_to_do" label="Thời gian dự kiến">
          <a-range-picker class="w-full" value-format="YYYY-MM-DD" @change="onChangeRangePicker" />
        </a-form-item>

        <a-form-item name="files" label="Tệp đính kèm">

          <draggable
              v-model="formState.files"
              item-key="id"
              group="people"
              class="bg-gray-50 p-3 rounded-md empty:hidden mb-3"
          >
            <template #item="{element}">
              <div class="cursor-pointer py-2 border-b last:border-0">
                <i-ci-dot-01-xs class="inline-block" />
                <span>{{ element.name }}</span>
                <i-ic-baseline-delete
                    class="inline-block text-rose-500 transform scale-90"
                    @click="formState.files = formState.files.filter((e) => e.id !== element.id)"
                />
              </div>
            </template>
          </draggable>

          <a-button type="primary" size="small" @click="useFile.open()">
            <div class="flex items-center">
              <i-ic-cloud-upload />
              <span class="ml-2 text-xs"> Tải Lên </span>
            </div>
          </a-button>

          <template #extra>
            <small>
              - Tải lên tệp đính kèm của bạn.
              <br/>
              - Có thể thay đổi thứ tự tệp đính kèm bằng cách kéo thả.
            </small>
          </template>

        </a-form-item>

      </div>
      <div class="w-full pl-7">
        <a-form-item label="Hình Ảnh" name="images">
          <div>

            <draggable
                v-model="formState.images"
                item-key="id"
                group="people"
                class="bg-gray-50 p-3 rounded-md empty:hidden mb-3"
            >
              <template #item="{element}">
                <div class="cursor-pointer py-2 border-b last:border-0">
                  <i-ci-dot-01-xs class="inline-block" />
                  <span>{{ element.name }}</span>
                  <i-ic-baseline-delete
                      class="inline-block text-rose-500 transform scale-90"
                      @click="formState.images = formState.images.filter((e) => e.id !== element.id)"
                  />
                </div>
              </template>
            </draggable>

            <a-button type="primary" size="small" @click="useImages.open()">
              <div class="flex items-center">
                <i-ic-cloud-upload />
                <span class="ml-2 text-xs"> Tải Lên </span>
              </div>
            </a-button>

            <template #extra>
              <small>
                - Tải lên hình ảnh của bạn.
                <br/>
                - Có thể thay đổi thứ tự hình ảnh bằng cách kéo thả.
              </small>
            </template>

          </div>
        </a-form-item>
      </div>
    </div>

    <a-form-item label="Mô Tả" name="content">
      <magic-editor />
    </a-form-item>


  </a-form>
</template>

<script lang="ts" setup>
import { AddProjectInput } from '@dto/project-input.dto'
import {Dayjs} from "dayjs";

const formState = reactive<AddProjectInput>({
  name: '',
  category: '',
  skills: [],
  time_to_do: {
    from: '',
    to: ''
  },
  files: []
})

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

const onChangeRangePicker = (dates: [string, string] | [Dayjs, Dayjs]) => {
  if(dates.length == 2 && Object.values(dates).every((date: string | Dayjs) => typeof date === 'string')) {
    formState.time_to_do!.from = dates[0] as string
    formState.time_to_do!.to = dates[1] as string
  }
}

const useFile = useFileDialog({
  multiple: true,
  accept: '*'
})

watch(useFile.files, (files) => {
  Array.from(files as FileList).forEach((file) => {
    formState.files.push({
      id: Math.random(),
      name: file.name,
    })
  })
})


const useImages = useFileDialog({
  multiple: true,
  accept: '*'
})


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
