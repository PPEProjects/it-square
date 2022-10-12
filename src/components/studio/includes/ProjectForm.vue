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
          <a-select
              v-model:value="formState.category"
              placeholder="Phân loại dự án"
              :options="categories"
          ></a-select>
        </a-form-item>

        <a-form-item name="skill" label="Programing lang, framework">
          <!-- Dùng loop -->
          <a-select
            v-model:value="formState.skills"
            mode="tags"
            placeholder="Vue, Nuxt,..."
          >
            <a-select-option
              v-for="(item, index) in technologies"
              :key="index"
              :value="item._id"
            >
              {{ item.name }}
            </a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item name="time_to_do" label="Thời gian dự kiến">
          <a-range-picker
            class="w-full"
            value-format="YYYY-MM-DD"
            @change="onChangeRangePicker"
          />
        </a-form-item>

        <a-form-item name="files" label="Tệp đính kèm">
          <draggable
            v-model="formState.files"
            item-key="id"
            group="people"
            class="mb-3 rounded-md bg-gray-50 p-3 empty:hidden"
          >
            <template #item="{ element }">
              <div class="cursor-pointer border-b py-2 last:border-0">
                <i-ci-dot-01-xs class="inline-block" />
                <span>{{ element.name }}</span>
                <i-ic-baseline-delete
                  class="inline-block scale-90 transform text-rose-500"
                  @click="
                    formState.files = formState.files.filter(
                      (e) => e.id !== element.id
                    )
                  "
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
              <br />
              - Có thể thay đổi thứ tự tệp đính kèm bằng cách kéo thả.
            </small>
          </template>
        </a-form-item>
      </div>
      <div class="w-full pl-7">
        <a-form-item name="images">
          <template #label>
            <div class="flex items-center justify-between">
              <h4 class="mb-0">Hình Ảnh</h4>
              <button>Chỉnh Sửa</button>
            </div>
          </template>
          <draggable
            v-model="formState.images"
            item-key="id"
            group="people"
            class="flex flex-wrap rounded-md bg-gray-50 empty:hidden mb-3"
          >
            <template #item="{ element }">
              <div class="my-2 h-[100px] w-1/4 overflow-hidden px-3">
                <img
                  class="h-full w-full object-cover"
                  :src="element.img"
                  alt=""
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
              <br />
              - Có thể thay đổi thứ tự hình ảnh bằng cách kéo thả.
            </small>
          </template>
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
import { Dayjs } from 'dayjs'
import { GetCategories } from '#apollo/queries/__generated__/GetCategories'
import { GET_CATEGORIES } from '#apollo/queries/categories'
import { GetTechnologies } from '#apollo/queries/__generated__/GetTechnologies'
import { GET_TECHNOLOGIES } from '#apollo/queries/platforms'

const { result: queryCategories } = useQuery<GetCategories>(GET_CATEGORIES)
const categories = computed(() => (queryCategories.value?.categories || []).map((e) => ({ label: e.name, value: e.id })))

const { result: queryTechnologies } =
  useQuery<GetTechnologies>(GET_TECHNOLOGIES)
const technologies = computed(() => queryTechnologies.value?.technologies || [])

const formState = reactive<AddProjectInput>({
  name: '',
  category: '',
  skills: [],
  images: [],
  time_to_do: {
    from: '',
    to: ''
  },
  files: []
})

const onChangeRangePicker = (dates: [string, string] | [Dayjs, Dayjs]) => {
  if (
    dates.length == 2 &&
    Object.values(dates).every(
      (date: string | Dayjs) => typeof date === 'string'
    )
  ) {
    formState.time_to_do!.from = dates[0] as string
    formState.time_to_do!.to = dates[1] as string
  }
}

const useFile = useFileDialog({
  multiple: true
})

watch(useFile.files, (files) => {
  Array.from(files as FileList).forEach((file) => {
    formState.files.push({
      id: Math.random(),
      name: file.name
    })
  })
})

const useImages = useFileDialog({
  multiple: true,
  accept: '.png,.jpg'
})

watch(useImages.files, (files) => {
  Array.from(files as FileList).forEach((file) => {
    formState.images.push({
      id: Math.random(),
      img: URL.createObjectURL(file)
    })
  })
})

const editImagesEnable = ref(false)

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
  margin-bottom: 6px;
}
.chapter-name {
  margin-bottom: 6px;
}
</style>
