<template>
  <div>
    <a-form
      id="project1-form"
      ref="formRef"
      :model="form"
      layout="vertical"
      name="basic"
      autocomplete="off"
      :rules="rules"
    >
      <a-form-item name="name" class="chapter-name" has-feedback>
        <a-input v-model:value="form.name" placeholder="Nhập tên dự án" />
      </a-form-item>

      <div class="flex">
        <div class="w-[450px] flex-shrink-0">
          <a-form-item label="Logo" name="logo">
            <div class="w-[60px]">
              <a-spin :spinning="loadingLogo">
                <div
                  class="relative h-[60px] w-[60px] cursor-pointer overflow-hidden rounded-full bg-primary-50"
                  @click="openPickLogo()"
                >
                  <img
                    v-if="form.logo"
                    alt=""
                    :src="$cdn(form.logo)"
                    class="absolute inset-0 h-full w-full object-cover"
                  />
                  <div
                    class="absolute flex h-full w-full items-center justify-center bg-primary-600 text-[20px] text-white opacity-0 transition hover:opacity-100"
                  >
                    <i-ic-baseline-cloud-upload />
                  </div>
                </div>
              </a-spin>
            </div>

            <template #extra>
              <p class="mb-0 mt-2 text-[11px] text-gray-400 opacity-75">
                - Ảnh sẽ tự động cắt về kích thước 100px.
              </p>
            </template>
          </a-form-item>

          <a-form-item
            label="Ảnh Bìa"
            name="cover"
            class="aspect-w-12 aspect-h-7 relative"
          >
            <a-spin :spinning="loadingCover">
              <div
                class="aspect-w-12 aspect-h-7 relative w-full cursor-pointer overflow-hidden rounded-md bg-primary-50"
                @click="open()"
              >
                <img
                  v-if="form.cover"
                  alt=""
                  :src="$cdn(form.cover)"
                  class="absolute inset-0 h-full w-full object-cover"
                />
                <div
                  class="absolute flex h-full w-full items-center justify-center bg-primary-600 text-[40px] text-white opacity-0 transition hover:opacity-100"
                >
                  <i-ic-baseline-cloud-upload />
                </div>
              </div>
            </a-spin>
          </a-form-item>

          <a-form-item label="Phân Loại" name="category">
            <a-select
              v-model:value="form.category"
              placeholder="Phân loại dự án"
              :options="categories"
            ></a-select>
          </a-form-item>

          <a-form-item name="technologies" label="Programing lang, framework">
            <!-- Dùng loop -->
            <a-select
              v-model:value="form.technologies"
              show-search
              mode="tags"
              placeholder="Nhấn để thêm mới"
              :default-active-first-option="false"
              :show-arrow="false"
              :filter-option="false"
              :not-found-content="null"
              :options="searchTechnologies"
              @search="handleSearch"
            >
            </a-select>
          </a-form-item>

          <a-form-item name="estimate" label="Thời gian dự kiến">
            <a-range-picker class="w-full" @change="onChangeRangePicker" />
          </a-form-item>
        </div>

        <div class="ml-16 w-full">
          <a-form-item label="Tài Liệu" name="files">
            <draggable
              v-model="form.files"
              item-key="id"
              group="people"
              class="rounded-md bg-primary-50 p-1.5 empty:hidden"
            >
              <template #item="{ element }">
                <file-item :file="element" />
              </template>
            </draggable>

            <div class="mt-3">
              <a-button type="primary" size="small" @click="pickFiles">
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

      <a-form-item label="Mô Tả" name="content">
        <novel-editor ref="editorRef" v-model:value="form.content" />
      </a-form-item>
    </a-form>
    <a-modal
      v-model:visible="showCropModal"
      title="Cắt ảnh bìa"
      @ok="onCropAvatar"
    >
      <div class="project-cover">
        <image-cropper ref="cropRef" :config="{ aspectRatio: 12 / 7 }" />
      </div>
    </a-modal>
  </div>
</template>

<script lang="ts" setup>
import { GET_CATEGORIES } from '#apollo/queries/categories.query'
import { GetCategories } from '#apollo/queries/__generated__/GetCategories'
import { CreateProjectInput } from '#apollo/__generated__/types'
import {
  GetTechnologies,
  GetTechnologiesVariables
} from '#apollo/queries/__generated__/GetTechnologies'
import { GET_TECHNOLOGIES } from '#apollo/queries/technology.query'
import { Dayjs } from 'dayjs'
import { FormInstance } from 'ant-design-vue'

const { result: queryCategories } = useQuery<GetCategories>(GET_CATEGORIES)
const categories = computed(() =>
  (queryCategories.value?.categories || []).map((e) => ({
    label: e.name,
    value: e.id
  }))
)

const form = reactive<CreateProjectInput>({
  category: '',
  logo: '',
  content: '',
  cover: '',
  estimate: [],
  name: '',
  technologies: [],
  files: []
})

const setForm = (doc: CreateProjectInput) => {
  Object.assign(form, doc)
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
  cover: [
    {
      message: 'Vui lòng chọn hình ảnh',
      required: true
    }
  ],
  logo: [
    {
      message: 'Vui lòng chọn hình ảnh',
      required: true
    }
  ],
  estimate: [
    {
      message: 'Thời gian ước tính là bắt buộc',
      validator: async () => {
        if (form.estimate?.length !== 2) {
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
        if (!form.technologies?.length) {
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

// Search technologies
const searchTechFilter = ref<GetTechnologiesVariables>({
  filter: {
    name: '',
    limit: 10,
    offset: 0
  }
})
const searchTechnologies = ref<{ label: string; value: string }[]>([])
const setTechs = (doc: { label: string; value: string }[]) => {
  searchTechnologies.value = doc.map((e) => ({
    label: e.label,
    value: e.value
  }))
}
const { onResult } = useQuery<GetTechnologies, GetTechnologiesVariables>(
  GET_TECHNOLOGIES,
  searchTechFilter
)
onResult((result) => {
  setTechs(
    (result?.data?.technologies || []).map((e) => ({
      label: e.name,
      value: e.id
    }))
  )
})

const tempSearch = ref<string>('')
const debounceSearch = useDebounceFn(() => {
  searchTechFilter.value.filter.name = tempSearch.value
}, 300)
const handleSearch = (val: string) => {
  tempSearch.value = val
  debounceSearch()
}

const onChangeRangePicker = (dates: [Dayjs, Dayjs]) => {
  form.estimate = [dates[0].unix(), dates[1].unix()]
}

// avatar
const showCropModal = ref(false)
const cropRef = ref()
const { files, open } = useFileDialog({
  accept: 'image/*',
  multiple: false
})
watch(files, (val) => {
  if (val?.length) {
    showCropModal.value = true
    nextTick(() => cropRef.value?.buildCropper(val[0]))
  }
})
const upload = useUpload()
const loadingCover = ref(false)
const onCropAvatar = async () => {
  loadingCover.value = true
  showCropModal.value = false
  try {
    const data = await cropRef.value?.cropImage()
    form.cover = URL.createObjectURL(data)
    const url = await upload.image(data, 'project')
    URL.revokeObjectURL(form.cover)
    if (url) {
      form.cover = url
    } else {
      form.cover = ''
    }
  } catch (e) {
    //
  }
  loadingCover.value = false
}

// Logo
const loadingLogo = ref(false)
const { files: logoFiles, open: openPickLogo } = useFileDialog({
  accept: 'image/*',
  multiple: false
})
const uploadLogo = async () => {
  if (logoFiles.value?.length) {
    loadingLogo.value = true
    try {
      form.logo = URL.createObjectURL(logoFiles.value[0])
      const url = await upload.image(logoFiles.value[0], 'logo')
      URL.revokeObjectURL(form.logo)
      if (url) {
        form.logo = url
      } else {
        form.logo = ''
      }
    } catch (e) {
      //
    }
    loadingLogo.value = false
  }
}
watch(logoFiles, () => uploadLogo())

// File
const { open: pickFiles, files: documents } = useFileDialog({
  multiple: true
})
const onPickFiles = async () => {
  try {
    const _files = await Promise.all(
      Array.from(documents.value || []).map(
        (file) =>
          new Promise<string>((resolve, reject) => {
            upload
              .document(file, 'project')
              .then((url) => {
                if (url) {
                  resolve(url)
                } else {
                  reject()
                }
              })
              .catch(() => {
                reject()
              })
          })
      )
    )
    form.files?.push(..._files)
  } catch (e) {
    //
  }
}
watch(documents, () => onPickFiles())

const editorRef = ref()

const formRef = ref<FormInstance>()

const submitForm = async () => {
  const content = editorRef.value?.getContent()
  form.content = content || ''
  await formRef.value?.validateFields()
  return form
}
defineExpose({
  submitForm,
  form,
  setForm,
  setTechs
})
</script>

<style scoped>
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
