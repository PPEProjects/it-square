<template>
  <div class="-my-[10px]">
    <a-table
        key="_id"
        :data-source="appStore.categories"
        :columns="columns"
        :loading="isLoading"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'avatar'">
          <a-avatar :src="$cdn(record.avatar)" />
        </template>

        <template v-else-if="column.key === 'primary'">
          <a-switch
              :checked="record.primary"
              @click="updateCategory({ input: { primary: !record.primary, id: record.id } })"
          />
        </template>

        <template v-else-if="column.key === 'action'">
          <a-button
              type="primary"
              size="small"
              @click="openEditCategory(record)"
          >
            <template #icon>
              <i-material-symbols-edit-rounded class="inline-block" />
            </template>
          </a-button>
          <a-popconfirm
              placement="topRight"
              title="Bạn không thể hoàn tác hành động này!"
              ok-text="Yes"
              cancel-text="No"
              @confirm="removeCategory({ input: { id: record.id } })"
          >
            <a-button :type="'danger' as ButtonType" size="small" class="ml-2">
            <template #icon>
              <i-ic-baseline-delete class="inline-block" />
            </template>
          </a-button>
          </a-popconfirm>
        </template>
      </template>

      <template #headerCell="{ column }">
        <template v-if="column.key === 'action'">
          <a-button type="primary" size="small" @click="visible = true">
            <template #icon>
              <i-material-symbols-add class="inline-block" />
            </template>
            Thêm Mới
          </a-button>
        </template>
      </template>
    </a-table>

    <a-modal
      v-model:visible="visible"
      :title="formData.id ? 'Cập Nhật' : 'Thêm Mới'"
      @ok="submitModal"
    >
      <a-form
        ref="formRef"
        :model="formData"
        layout="vertical"
        name="basic"
        autocomplete="off"
        :rules="rules"
      >
        <a-form-item label="Tên" name="name">
          <a-input v-model:value="formData.name" placeholder="Tên phân loại" />
        </a-form-item>

        <div v-auto-animate class="flex">
          <div v-if="formData.primary" class="w-1/2">
            <a-form-item label="Hình ảnh" name="avatar">
              <div class="w-16">
                <a-spin :spinning="loading">
                  <div
                    class="flex h-16 w-16 cursor-pointer items-center justify-center overflow-hidden rounded-full border-2 text-gray-400 transition hover:border-primary-500 hover:bg-primary-500 hover:text-white"
                    @click="useImages.open()"
                  >
                    <i-ic-sharp-cloud-upload class="text-[18px] text-current" />
                    <img
                      v-if="formData?.avatar"
                      alt=""
                      :src="$cdn(formData?.avatar)"
                      class="h-full w-full object-cover"
                    />
                  </div>
                </a-spin>
              </div>
              <template #extra>
                <span class="text-xs text-gray-400">
                  Nhấp vào để tải ảnh lên
                </span>
              </template>
            </a-form-item>
          </div>
          <div class="w-1/2">
            <a-form-item label="Phân nhón chính" name="primary">
              <a-switch v-model:checked="formData.primary" />

              <template #extra>
                <span class="text-xs text-gray-400">
                  Phân nhóm chính sẽ hiển thị ở thanh menu
                </span>
              </template>
            </a-form-item>
          </div>
        </div>

        <a-form-item label="Mô Tả" name="content">
          <a-textarea
            v-model:value="formData.content"
            placeholder="Mô tả phân nhóm"
            :auto-size="{ minRows: 3, maxRows: 6 }"
          />
        </a-form-item>
      </a-form>
    </a-modal>

    <a-modal
      v-model:visible="visibleCropper"
      title="Cắt hình ảnh"
      @ok="handleCrop"
    >
      <div class="avatar-category">
        <image-cropper
          ref="cropRef"
          :config="{ aspectRatio: 1 }"
          endpoint="categories"
        />
      </div>
    </a-modal>
  </div>
</template>

<script lang="ts" setup>
import {GetCategories, GetCategories_categories} from '#apollo/queries/__generated__/GetCategories'
import {CREATE_CATEGORIES, DELETE_CATEGORY, UPDATE_CATEGORY} from '#apollo/mutations/categories'
import {
  CreateCategory,
  CreateCategoryVariables
} from '#apollo/mutations/__generated__/CreateCategory'
import { FormInstance, Rule } from 'ant-design-vue/lib/form'
import {UpdateCategory, UpdateCategoryVariables} from "#apollo/mutations/__generated__/UpdateCategory";
import {RemoveCategory, RemoveCategoryVariables} from "#apollo/mutations/__generated__/RemoveCategory";
import {ColumnsType} from "ant-design-vue/lib/table";
import {ButtonType} from "ant-design-vue/lib/button";
import {GET_CATEGORIES} from "#apollo/queries/categories";

const appStore = useAppStore()
const getoApp = useGeto()
const columns: ColumnsType = [
  {
    title: 'Tên',
    dataIndex: 'name',
    key: 'name',
    width: 250
  },
  {
    title: 'Avatar',
    dataIndex: 'avatar',
    key: 'avatar'
  },
  {
    title: 'Phân Nhóm Chính',
    dataIndex: 'primary',
    key: 'primary',
    align: 'center'
  },
  {
    title: 'Mô Tả',
    dataIndex: 'content',
    key: 'content'
  },
  {
    title: 'Hành Động',
    key: 'action',
    align: 'right',
    fixed: 'right',
    width: 130
  }
]

const visible = ref<boolean>(false)

const formRef = ref<FormInstance>()
const formData = ref<Partial<GetCategories_categories>>({})

const rules = ref({
  name: [
    {
      required: true,
      message: 'Vui lòng nhập tên phân loại'
    }
  ],
  avatar: [
    {
      message: 'Vui lòng chọn hình ảnh',
      validator: async (_rule: Rule, value: number) => {
        if (formData.value.primary && !value) {
          return Promise.reject('Vui lòng chọn hình ảnh')
        }
        return Promise.resolve()
      }
    }
  ]
})

const visibleCropper = ref<boolean>(false)

const useImages = useFileDialog({
  multiple: false,
  accept: '.png,.jpg'
})

const cropRef = ref()
watch(useImages.files, (files) => {
  if (files?.length) {
    visibleCropper.value = true
    nextTick(() => {
      cropRef.value?.buildCropper(files[0])
    })
  }
})

const loading = ref<boolean>(false)
const handleCrop = () => {
  loading.value = true
  try {
    visibleCropper.value = false
    cropRef.value?.cropImage(async (image: Blob | any) => {
      formData.value.avatar = await cropRef.value?.uploadCrop(image)
      loading.value = false
    })
  } catch (e) {
    //
    loading.value = false
  }
}

const { loading: creatingCategory, mutate, onDone: afterCreatedCategory } = useMutation<
  CreateCategory,
  CreateCategoryVariables
>(CREATE_CATEGORIES)
const createCategory = async () => {
  visible.value = false
  mutate({
    input: {
      name: formData.value.name as string,
      content: formData.value.content as string,
      avatar: formData.value.avatar as string,
      primary: formData.value.primary as boolean
    }
  })
}

afterCreatedCategory((data) => {
  if(data?.data?.createCategory) {
    getoApp.cache.writeQuery<GetCategories>({
      query: GET_CATEGORIES,
      data: {
        categories: [
          ...appStore.categories,
          data.data.createCategory
        ]
      }
    })
  }
})

const { mutate: updateCategory, loading: updatingCategory } = useMutation<UpdateCategory, UpdateCategoryVariables>(UPDATE_CATEGORY)

const submitModal = async () => {
  try {
    await formRef.value?.validateFields()
    if (!formData.value.id) {
      await createCategory()
    } else {
      await updateCategory({
        input: {
          id: formData.value.id as string,
          name: formData.value.name as string,
          content: formData.value.content as string,
          avatar: formData.value.avatar as string,
          primary: formData.value.primary as boolean
        }
      })
    }
  } catch (e) {
    //
  }
  visible.value = false
}

const { mutate: removeCategory, loading: removingCategory, onDone } = useMutation<RemoveCategory, RemoveCategoryVariables>(DELETE_CATEGORY)

onDone(({ data }) => {
  if(data?.removeCategory) {
    appStore.categories = appStore.categories.filter((e) => e.slug !== data.removeCategory.slug)
  }
})

const isLoading = computed(() => creatingCategory.value || updatingCategory.value || removingCategory.value)

const openEditCategory = (item: GetCategories_categories) => {
  formData.value = Object.assign({}, item)
  nextTick(() => {
    visible.value = true
  })
}
</script>

<style>
.avatar-category .crop-image-tool {
  height: 300px;
}
.avatar-category .crop-image-tool .cropper-crop-box {
  border-radius: 50%;
  overflow: hidden;
}
</style>
