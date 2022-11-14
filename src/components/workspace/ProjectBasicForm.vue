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
        <div class="w-[400px] flex-shrink-0">
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
              placeholder="Nhấn để thêm mới"
              :default-active-first-option="false"
              :show-arrow="false"
              :filter-option="false"
              :not-found-content="null"
              :options="searchTechnologiesData"
              @search="handleSearch"
              @change="handleChange"
            >
            </a-select>
          </a-form-item>
        </div>
      </div>
    </a-form>
  </div>
</template>

<script lang="ts" setup>
import { GET_CATEGORIES } from '#apollo/queries/categories.query'
import { GetCategories } from '#apollo/queries/__generated__/GetCategories'
import { CreateProjectInput } from '#apollo/__generated__/types'

const { result: queryCategories } = useQuery<GetCategories>(GET_CATEGORIES)
const categories = computed(() =>
  (queryCategories.value?.categories || []).map((e) => ({
    label: e.name,
    value: e.id
  }))
)

const form = reactive<CreateProjectInput>({
  category: '',
  content: '',
  cover: '',
  estimate: [],
  name: '',
  technologies: []
})

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
const searchTechnologiesData = ref([])
const handleChange = (val: string) => {
  console.log(val)
  //
}
const handleSearch = (val: string) => {
  console.log(val)
  //
}
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
