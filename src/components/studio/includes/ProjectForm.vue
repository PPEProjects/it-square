<template>
  <div>
    <a-form
        id="project1-form"
        ref="formRef"
        :model="formState"
        layout="vertical"
        name="basic"
        autocomplete="off"
        :rules="rules"
        :class="[editImagesEnable ? '_edit_image' : '']"
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
                v-model:value="formState.technologies"
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
        </div>
        <div class="w-full pl-7">
          <a-form-item name="files" label="Tệp đính kèm">
            <draggable
                v-model="formState.files"
                item-key="id"
                group="people"
                class="rounded-md bg-primary-50 p-1.5 empty:hidden"
            >
              <template #item="{ element }">
                <div
                    class="mb-1.5 flex cursor-pointer items-center rounded-md bg-white px-2 py-1.5 last:mb-0"
                >
                  <span>{{ element.name }}</span>

                  <button class="ml-auto">
                    <i-ic-baseline-delete
                        class="inline-block scale-90 transform text-rose-500"
                        @click="
                      formState.files = formState.files.filter(
                        (e) => e.id !== element.id
                      )
                    "
                    />
                  </button>
                </div>
              </template>
            </draggable>

            <div class="mt-3">
              <a-button type="primary" size="small" @click="useFile.open()">
                <div class="flex items-center">
                  <i-ic-cloud-upload />
                  <span class="ml-2 text-xs"> Tải Lên </span>
                </div>
              </a-button>
            </div>

            <template #extra>
              <small>
                - Tải lên tệp đính kèm của bạn.
                <br />
                - Có thể thay đổi thứ tự tệp đính kèm bằng cách kéo thả.
              </small>
            </template>
          </a-form-item>
        </div>
      </div>

      <div class="h-3 w-full"></div>

      <a-form-item name="cover" class="cover-field">
        <template #label>
          <div class="flex h-6 w-full items-center justify-between">
            <h4 class="mb-0">Hình Ảnh</h4>

            <div :class="[!formState.covers.length ? 'invisible' : '']">
              <button
                  v-if="listDelete.length && editImagesEnable"
                  class="mr-3 rounded bg-rose-500 px-2 py-0.5 text-[12px] font-semibold text-white"
                  @click="removeSelected"
              >
                Xoá Đã Chọn({{ listDelete.length }})
              </button>

              <button
                  v-if="!editImagesEnable"
                  class="rounded bg-rose-500 px-2 py-0.5 text-[12px] font-semibold text-white"
                  @click="editImagesEnable = true"
              >
                Chỉnh Sửa
              </button>

              <button
                  v-else
                  class="rounded bg-primary-500 px-2 py-0.5 text-[12px] font-semibold text-white"
                  @click="editImagesEnable = false"
              >
                Xong
              </button>
            </div>
          </div>
        </template>
        <draggable
            v-model="formState.covers"
            item-key="id"
            group="people"
            class="mb-3 flex flex-wrap rounded-md bg-primary-50 p-1.5 empty:hidden"
        >
          <template #item="{ element }">
            <div class="image-item h-[200px] w-1/4 p-1.5">
              <div
                  class="relative h-full w-full overflow-hidden rounded-md border-[4px] border-white"
              >
                <button
                    class="absolute top-3 right-3 z-30 flex transform items-center rounded-md bg-rose-500 p-0.5 text-[18px] text-white transition"
                    :class="[
                  !editImagesEnable ? 'invisible scale-0 opacity-0' : ''
                ]"
                    @click="removeImageAt(element.id)"
                >
                  <i-material-symbols-close-rounded />
                </button>

                <label
                    class="absolute top-0 left-0 z-20 flex h-full w-full cursor-pointer items-center justify-center"
                    :class="[!editImagesEnable ? 'invisible' : '']"
                >
                  <div
                      class="transform rounded-full border-[3px] text-[30px] transition"
                      :class="[
                    listDelete.includes(element.id)
                      ? 'border-primary-500 text-primary-500'
                      : 'scale-95 border-transparent text-white'
                  ]"
                  >
                    <i-ic-outline-check />
                  </div>

                  <input
                      v-model="listDelete"
                      type="checkbox"
                      class="hidden"
                      name="selectImages"
                      :value="element.id"
                  />
                </label>

                <a-spin
                    wrapper-class-name="h-[200px]"
                    :spinning="element.loading"
                >
                  <img
                      class="relative z-10 h-full w-full object-cover transition-all"
                      :src="element.loading ? element.file : $cdn(element.file)"
                      alt=""
                  />
                </a-spin>
              </div>
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

      <a-form-item label="Mô Tả" name="content">
        <magic-editor ref="editorRef" v-model:value="formState.content" />
      </a-form-item>
    </a-form>

    <div>
      <a-button
          type="primary"
          @click="onSubmit"
      >
        <div class="flex items-center">
          <i-zondicons-cloud-upload />
          <span class="ml-2">Lưu</span>
        </div>
      </a-button>
    </div>

  </div>
</template>

<script lang="ts" setup>
import { Dayjs } from 'dayjs'
import { GetCategories } from '#apollo/queries/__generated__/GetCategories'
import { GET_CATEGORIES } from '#apollo/queries/categories'
import { GetTechnologies } from '#apollo/queries/__generated__/GetTechnologies'
import { GET_TECHNOLOGIES } from '#apollo/queries/platforms'
import { CreateProjectInput } from '#apollo/__generated__/itTypes'
import {FormInstance} from "ant-design-vue/lib/form";

const { result: queryCategories } = useQuery<GetCategories>(GET_CATEGORIES)
const categories = computed(() =>
  (queryCategories.value?.categories || []).map((e) => ({
    label: e.name,
    value: e.id
  }))
)

const { result: queryTechnologies } =
  useQuery<GetTechnologies>(GET_TECHNOLOGIES)
const technologies = computed(() => queryTechnologies.value?.technologies || [])

interface EnClose {
  id: string | number
  loading: boolean
  file: string
}

const formState = ref<
  Partial<Omit<CreateProjectInput, 'covers' | 'files'>> & {
    covers: EnClose[]
    files: (EnClose & {
      name: string
    })[]
  }
>({
  category: '',
  content: '12345',
  covers: [],
  estimate: [],
  files: [],
  name: '',
  technologies: []
})

const onChangeRangePicker = (dates: [string, string] | [Dayjs, Dayjs]) => {
  if (
    dates.length == 2 &&
    Object.values(dates).every(
      (date: string | Dayjs) => typeof date === 'string'
    )
  ) {
    console.log(dates)
  }
}

// upload
const uploader = useUpload()

const useFile = useFileDialog({
  multiple: true
})

watch(useFile.files, async (files) => {
  await Promise.all<string>(
    Array.from(files as FileList).map(
      (file) =>
        new Promise((resolve) => {
          const id = Math.round(Math.random() * 100000)

          formState.value.files.push({
            id,
            name: file.name,
            loading: true,
            file: URL.createObjectURL(file)
          })

          uploader.document(file, 'project').then((res) => {
            const index = formState.value.files.findIndex((e) => e.id === id)
            if (index > -1) {
              formState.value.files[index].name = getFileName(res)
              formState.value.files[index].loading = false
              formState.value.files[index].file = res
            }
            resolve(res)
          })
        })
    )
  )
})

const useImages = useFileDialog({
  multiple: true,
  accept: '.png,.jpg'
})

watch(useImages.files, async (files) => {
  await Promise.all(
    Array.from(files as FileList).map(
      (file) =>
        new Promise((resolve) => {
          const id = Math.round(Math.random() * 100000)

          formState.value.covers.push({
            id,
            loading: true,
            file: URL.createObjectURL(file)
          })
          uploader.image(file, 'project').then((res) => {
            const index = formState.value.covers.findIndex((e) => e.id === id)
            if (index > -1) {
              formState.value.covers[index].loading = false
              formState.value.covers[index].file = res
            }
            resolve(res)
          })
        })
    )
  )
})

const editImagesEnable = ref(false)
const removeImageAt = (id: string | number) => {
  formState.value.covers = formState.value.covers.filter((e) => e.id !== id)
}
const listDelete = ref<(string | number)[]>([])
const removeSelected = () => {
  formState.value.covers = formState.value.covers.filter(
    (e) => !listDelete.value.includes(e.id)
  )
  listDelete.value = []
}

const getFileName = (path: string) => {
  const arr = path.split('/')
  return arr[arr.length - 1]
}

const rules = ref({
  category: [
    {
      required: true,
      message: 'Vui lòng nhập tên phân loại'
    }
  ],
  content: [
    {
      required: true,
      message: 'Vui lòng nhập mô tả dự án'
    }
  ],
  covers: [
    {
      message: 'Vui lòng chọn hình ảnh',
      validator: async () => {
        if (!formState.value.covers.length) {
          return Promise.reject('Vui lòng chọn hình ảnh')
        }
        return Promise.resolve()
      }
    }
  ],
  estimate: [
    {
      message: 'Thời gian ước tính là bắt buộc',
      validator: async () => {
        if (formState.value.estimate?.length !== 2) {
          return Promise.reject('Thời gian ước tính là bắt buộc')
        }
        return Promise.resolve()
      }
    }
  ],
  technologies: [
    {
      message: 'Vui lòng chọn công nghệ',
      validator: async () => {
        if (!formState.value.covers.length) {
          return Promise.reject('Vui lòng chọn kĩ năng')
        }
        return Promise.resolve()
      }
    }
  ],
  name: [
    {
      required: true,
      message: 'Vui lòng nhập tên dự án'
    }
  ]
})

const formRef = ref<FormInstance>()
const editorRef = ref()

const onSubmit = async () => {
  try {
    const content = editorRef.value?.getContent()
    formState.value.content = content || ''
    await formRef.value?.validateFields()
  } catch (e) {
    //
  }
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

.cover-field label[for='basic_cover'] {
  width: 100%;
}

#project1-form._edit_image .image-item {
  /* Start the shake animation and make the animation last for 0.5 seconds */
  animation: shake 1s;

  /* When the animation is finished, start again */
  animation-iteration-count: infinite;
}

@keyframes shake {
  0% {
    transform: translate(1px, 1px) rotate(0deg);
  }
  10% {
    transform: translate(-1px, -2px) rotate(-1deg);
  }
  20% {
    transform: translate(-3px, 0px) rotate(1deg);
  }
  30% {
    transform: translate(3px, 2px) rotate(0deg);
  }
  40% {
    transform: translate(1px, -1px) rotate(1deg);
  }
  50% {
    transform: translate(-1px, 2px) rotate(-1deg);
  }
  60% {
    transform: translate(-3px, 1px) rotate(0deg);
  }
  70% {
    transform: translate(3px, 1px) rotate(-1deg);
  }
  80% {
    transform: translate(-1px, -1px) rotate(1deg);
  }
  90% {
    transform: translate(1px, 2px) rotate(0deg);
  }
  100% {
    transform: translate(1px, -2px) rotate(-1deg);
  }
}

#project1-form._edit_image .image-item img {
  filter: blur(2px) brightness(0.8);
}
</style>
