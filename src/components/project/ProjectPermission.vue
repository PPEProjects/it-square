<template>
  <a-table
    :columns="columns"
    :data-source="roles"
    :loading="loading || creattingRole || updatingRole || deletingRole"
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
            This project have no roles now...
          </div>
        </div>
      </div>
    </template>

    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'user'">
        <div v-if="record.user" class="flex items-center">
          <a-avatar :src="$cdn(record.user.avatar)" />
          <h4 class="mb-0 ml-2">{{ record.user.name }}</h4>
        </div>
        <div v-else>--</div>
      </template>

      <template v-if="column.key === 'permissions'">
        <span v-for="(premit, index) in record.permissions" :key="index">
          <a-tag v-if="premit === PermissionEnum.REMOVE_PROJECT" color="#f50">
            Delete Project
          </a-tag>
          <a-tag
            v-else-if="premit === PermissionEnum.UPDATE_PROJECT"
            color="#2db7f5"
          >
            Update Project
          </a-tag>

          <a-tag
            v-else-if="premit === PermissionEnum.CREATE_ROLE"
            color="#87d068"
          >
            Create Role
          </a-tag>
          <a-tag
            v-else-if="premit === PermissionEnum.UPDATE_ROLE"
            color="#108ee9"
          >
            Update Role
          </a-tag>
          <a-tag v-else-if="premit === PermissionEnum.REMOVE_ROLE" color="#f50">
            Remove Role
          </a-tag>
        </span>
      </template>

      <template v-if="column.key === 'createdAt'">
        {{ $dayjs(record.createdAt).format('DD/MM/YYYY hh:mm') }}
      </template>

      <template v-if="column.key === 'action'">
        <div>
          <a-popconfirm
            title="Are you sure delete this position?"
            ok-text="Yes"
            cancel-text="No"
            placement="bottomLeft"
            @confirm="removeRoleHandle({ input: { id: record.id } })"
          >
            <a-button type="danger" size="small">
              <div class="flex items-center">
                <i-ic-round-delete />
              </div>
            </a-button>
          </a-popconfirm>

          <a-button
            type="primary"
            size="small"
            class="ml-2"
            @click="openEditRole(record)"
          >
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
    :title="editID ? 'Modify a Position' : 'Add New'"
    @ok="submitRole"
  >
    <a-form layout="vertical" :model="form">
      <a-form-item
        name="name"
        label="Role Name"
        :rules="[
          {
            required: true,
            message: 'Can not be empty',
            trigger: 'blur'
          }
        ]"
      >
        <a-input v-model:value="form.name" placeholder="Name..." />
      </a-form-item>

      <a-form-item name="permissions" label="Permissions">
        <a-checkbox-group v-model:value="form.permissions" style="width: 100%">
          <a-row>
            <a-col :span="8" class="mb-1.5">
              <a-checkbox :value="PermissionEnum.UPDATE_PROJECT">
                <span>Update Project</span>
              </a-checkbox>
            </a-col>
            <a-col :span="8" class="mb-1.5">
              <a-checkbox :value="PermissionEnum.REMOVE_PROJECT">
                <span>Remove Project</span>
              </a-checkbox>
            </a-col>

            <a-col :span="8" class="mb-1.5">
              <a-checkbox :value="PermissionEnum.CREATE_ROLE">
                <span>Create Role</span>
              </a-checkbox>
            </a-col>
            <a-col :span="8" class="mb-1.5">
              <a-checkbox :value="PermissionEnum.UPDATE_ROLE">
                <span>Update Role</span>
              </a-checkbox>
            </a-col>
            <a-col :span="8" class="mb-1.5">
              <a-checkbox :value="PermissionEnum.REMOVE_ROLE">
                <span>Delete Role</span>
              </a-checkbox>
            </a-col>
          </a-row>
        </a-checkbox-group>

<!--        <template #extra>-->
<!--          <p class="mb-0 mt-1 text-[11px] text-gray-500 opacity-75">-->
<!--            - Nếu bạn muốn tao vij tri ma ko co phan-->
<!--          </p>-->
<!--        </template>-->
      </a-form-item>

      <a-form-item label="User" name="user">
        <div>
          <a-select
            v-if="!userInRole"
            :value="form.user ? [form.user._id] : []"
            show-search
            placeholder="Enter user name"
            :default-active-first-option="false"
            :show-arrow="false"
            :filter-option="false"
            :not-found-content="null"
            :options="users"
            @search="searchUserHandle"
            @change="changeUserHandle"
          ></a-select>
          <div v-else class="flex items-center">
            <a-avatar :src="$cdn(userInRole.avatar)" />

            <h4 class="mb-0 ml-2">{{ userInRole.name }}</h4>

            <a-button
              type="danger"
              size="small"
              class="ml-auto"
              @click="removeUserInRole"
            >
              <template #icon>
                <i-ic-baseline-delete />
              </template>
              <span class="text-[11px] font-bold">Delete</span>
            </a-button>
          </div>
        </div>
      </a-form-item>
    </a-form>
  </a-modal>

  <teleport-view to="#actions">
    <a-button
      v-if="!loading"
      type="primary"
      class="ml-4"
      :loading="creattingRole || updatingRole"
      @click="openAddNew()"
    >
      <template #icon>
        <i-ic-baseline-check />
      </template>
      <span class="ml-1">Add New</span>
    </a-button>
  </teleport-view>
</template>

<script lang="ts" setup>
import { GET_ROLES } from '#apollo/queries/role.query'
import {
  GetRoles,
  GetRoles_roles,
  GetRolesVariables
} from '#apollo/queries/__generated__/GetRoles'
import { CreateRoleInput, PermissionEnum } from '#apollo/__generated__/types'
import { FormInstance } from 'ant-design-vue'
import {
  CREATE_ROLE,
  REMOVE_ROLE,
  UPDATE_ROLE
} from '#apollo/mutations/project.mutate'
import {
  CreateRole,
  CreateRoleVariables
} from '#apollo/mutations/__generated__/CreateRole'
import { GET_USERS, USER_DOCUMENT } from '#apollo/queries/user.query'
import {
  GetUsers,
  GetUsersVariables
} from '#apollo/queries/__generated__/GetUsers'
import { UserDoc } from '#apollo/queries/__generated__/UserDoc'
import {
  UpdateRole,
  UpdateRoleVariables
} from '#apollo/mutations/__generated__/UpdateRole'
import {
  RemoveRole,
  RemoveRoleVariables
} from '#apollo/mutations/__generated__/RemoveRole'

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: 'User',
    dataIndex: 'user',
    key: 'user',
    align: 'center'
  },
  {
    title: 'Permissions',
    dataIndex: 'permissions',
    key: 'permissions',
    align: 'center'
  },
  {
    title: 'Created At',
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

const editID = ref('')
const form = ref<CreateRoleInput>({
  name: '',
  permissions: [],
  project: route.params.id as string,
  user: ''
})
const userInRole = ref<UserDoc>()

const resetForm = () => {
  form.value = {
    name: '',
    permissions: [],
    project: route.params.id as string,
    user: ''
  }
  editID.value = ''
  formRef.value?.resetFields()
}
const formRef = ref<FormInstance>()

const isShowMofidyModal = ref(false)

const { mutate, loading: creattingRole } = useMutation<
  CreateRole,
  CreateRoleVariables
>(CREATE_ROLE)

const apollo = useApollo()

// Tìm kiếm users
const searchUserFilter = ref<GetUsersVariables>({
  filter: {
    name: '',
    offset: 0,
    limit: 10,
    sort: 'createdAt',
    exclude: []
  }
})
watch(roles, (val) => {
  searchUserFilter.value.filter.exclude = val
    .filter((item) => item.user)
    .map((item) => item.user!.id)
})

const { result: searchUsersResult } = useQuery<GetUsers, GetUsersVariables>(
  GET_USERS,
  searchUserFilter,
  {
    debounce: 300
  }
)
const users = computed<{ label: string; value: string }[]>(() =>
  (searchUsersResult.value?.users || []).map((user) => ({
    label: user.name,
    value: user.id
  }))
)

const searchUserHandle = (keyword: string) => {
  searchUserFilter.value.filter.name = keyword
}

const changeUserHandle = (id: string) => {
  // laays user tu cache
  const cache = apollo.readFragment({
    id: apollo.cache.identify({
      __typename: 'User',
      id
    }),
    fragment: USER_DOCUMENT
  })
  if (cache) {
    form.value.user = id
    userInRole.value = cache
  }
}

const removeUserInRole = () => {
  userInRole.value = undefined
  form.value.user = ''
}

const openEditRole = (role: GetRoles_roles) => {
  editID.value = role.id
  form.value = {
    name: role.name,
    permissions: role.permissions,
    project: route.params.id as string,
    user: role.user?.id || ''
  }
  userInRole.value = role.user || undefined
  isShowMofidyModal.value = true
}

const openAddNew = () => {
  resetForm()
  isShowMofidyModal.value = true
}

const { mutate: updateRoleHandle, loading: updatingRole } = useMutation<
  UpdateRole,
  UpdateRoleVariables
>(UPDATE_ROLE)

const submitRole = async () => {
  isShowMofidyModal.value = false
  try {
    await formRef.value?.validate()

    if (editID.value) {
      await updateRoleHandle({
        input: {
          id: editID.value,
          name: form.value.name,
          permissions: form.value.permissions,
          user: form.value.user || null
        }
      })
    } else {
      const res = await mutate({
        input: {
          ...form.value,
          user: form.value.user || null
        }
      })

      if (res?.data?.createRole) {
        apollo.writeQuery<GetRoles, GetRolesVariables>({
          query: GET_ROLES,
          variables: {
            filter: {
              project: route.params.id as string
            }
          },
          data: {
            roles: [res.data.createRole, ...roles.value]
          }
        })
      }
    }
  } catch (e) {
    //
  }
}

const {
  mutate: removeRoleHandle,
  loading: deletingRole,
  onDone: afterDelete
} = useMutation<RemoveRole, RemoveRoleVariables>(REMOVE_ROLE)

afterDelete((val) => {
  if (val.data?.removeRole) {
    apollo.cache.evict({
      id: apollo.cache.identify({
        __typename: 'Role',
        id: val.data.removeRole.id
      })
    })
  }
})
</script>

<style scoped></style>
