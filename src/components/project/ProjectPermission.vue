<template>
  <a-table
    :columns="columns"
    :data-source="roles"
    :loading="loading || creattingRole"
  >
    <template #emptyText>
      <div class="py-10 pt-5 text-center">
        <div style="width: 300px; height: 250px" class="mx-auto">
          <vue-lottie-player
            width="300px"
            height="250px"
            loop
            path="https://assets4.lottiefiles.com/packages/lf20_ij2ngolf.json"
          />
          <div class="text-[11px] text-gray-400">
            Dựán hiện không có bất kì vị trí nào...
          </div>
        </div>
      </div>
    </template>

    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'action'">
        <div>
          <a-button type="danger" size="small">
            <div class="flex items-center">
              <i-ic-round-delete />
            </div>
          </a-button>
          <a-button type="primary" size="small" class="ml-2">
            <div class="flex items-center">
              <i-material-symbols-edit />
            </div>
          </a-button>
        </div>
      </template>
    </template>
  </a-table>

  <a-modal
    v-model:visible="isShowMofidyModal"
    title="Thêm Vị Trí"
    @ok="createRole"
  >
    <a-form layout="vertical" :model="form">
      <a-form-item
        name="name"
        label="Tên vị trí"
        :rules="[
          {
            required: true,
            message: 'Vui lòng nhập tên vị trí',
            trigger: 'blur'
          }
        ]"
      >
        <a-input v-model:value="form.name" placeholder="Tên vị trí" />
      </a-form-item>

      <a-form-item name="permissions" label="Phân Quyền">
        <a-checkbox-group v-model:value="form.permissions" style="width: 100%">
          <a-row>
            <a-col :span="8" class="mb-1.5">
              <a-checkbox :value="PermissionEnum.UPDATE_PROJECT">
                <span>Cập Nhật Dự Án</span>
              </a-checkbox>
            </a-col>
            <a-col :span="8" class="mb-1.5">
              <a-checkbox :value="PermissionEnum.REMOVE_PROJECT">
                <span>Xóa Dự Án</span>
              </a-checkbox>
            </a-col>

            <a-col :span="8" class="mb-1.5">
              <a-checkbox :value="PermissionEnum.CREATE_ROLE">
                <span>Tạo Vị Trí</span>
              </a-checkbox>
            </a-col>
            <a-col :span="8" class="mb-1.5">
              <a-checkbox :value="PermissionEnum.UPDATE_ROLE">
                <span>Cập Nhật Vị Trí</span>
              </a-checkbox>
            </a-col>
            <a-col :span="8" class="mb-1.5">
              <a-checkbox :value="PermissionEnum.REMOVE_ROLE">
                <span>Xóa Vị Trí</span>
              </a-checkbox>
            </a-col>
          </a-row>
        </a-checkbox-group>

        <template #extra>
          <p class="mb-0 mt-1 text-[11px] text-gray-500 opacity-75">
            - Nếu bạn muốn tao vij tri ma ko co phan
          </p>
        </template>
      </a-form-item>
    </a-form>
  </a-modal>

  <teleport-view to="#actions">
    <a-button
      v-if="!loading"
      type="primary"
      class="ml-4"
      :loading="creattingRole"
      @click="isShowMofidyModal = true"
    >
      <template #icon>
        <i-ic-baseline-check />
      </template>
      <span class="ml-1">Them Moi</span>
    </a-button>
  </teleport-view>
</template>

<script lang="ts" setup>
import { GET_ROLES } from '#apollo/queries/role.query'
import {
  GetRoles,
  GetRolesVariables
} from '#apollo/queries/__generated__/GetRoles'
import { CreateRoleInput, PermissionEnum } from '#apollo/__generated__/types'
import { FormInstance } from 'ant-design-vue'
import { CREATE_ROLE } from '#apollo/mutations/project.mutate'
import {
  CreateRole,
  CreateRoleVariables
} from '#apollo/mutations/__generated__/CreateRole'

const columns = [
  {
    title: 'Tên',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: 'Phân Loại',
    dataIndex: ['category', 'name'],
    key: 'category',
    align: 'center'
  },
  {
    title: 'Hoạt Động',
    dataIndex: 'active',
    key: 'active',
    align: 'center'
  },
  {
    title: 'Trạng Thái',
    dataIndex: 'status',
    key: 'status',
    align: 'center'
  },
  {
    title: 'Ngày Tạo',
    key: 'createdAt',
    dataIndex: 'createdAt',
    align: 'center'
  },
  {
    title: 'Action',
    key: 'action',
    align: 'right'
  }
]

const route = useRoute()
const { result, loading } = useQuery<GetRoles, GetRolesVariables>(GET_ROLES, {
  filter: {
    project: route.params.id as string
  }
})
const roles = computed(() => result.value?.roles || [])

const form = ref<CreateRoleInput>({
  name: '',
  permissions: [],
  project: route.params.id as string,
  user: ''
})
const resetForm = () => {
  form.value = {
    name: '',
    permissions: [],
    project: route.params.id as string,
    user: ''
  }
  formRef.value?.resetFields()
}
const formRef = ref<FormInstance>()

const isShowMofidyModal = ref(false)

const {
  mutate,
  loading: creattingRole,
  onDone
} = useMutation<CreateRole, CreateRoleVariables>(CREATE_ROLE)
const createRole = async () => {
  isShowMofidyModal.value = false
  try {
    await formRef.value?.validate()

    await mutate({
      input: {
        ...form.value,
        user: form.value.user || null
      }
    })
  } catch (e) {
    //
  }
}

const apollo = useApollo()
onDone((value) => {
  resetForm()
  try {
    if(value.data?.createRole) {
      apollo.writeQuery<GetRoles, GetRolesVariables>({
        query: GET_ROLES,
        variables: {
          filter: {
            project: route.params.id as string
          }
        },
        data: {
          roles: [value.data.createRole, ...roles.value]
        }
      })
    }
  } catch (e) {
    //
  }
})
</script>

<style scoped></style>
