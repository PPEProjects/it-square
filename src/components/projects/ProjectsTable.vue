<template>
  <a-table
    :columns="columns"
    :data-source="projectsResult?.studioProjects || []"
    :loading="loading || deleting"
    :pagination="{
      total: countResult?.studioProjectsCount || 0,
      showLessItems: true,
      defaultPageSize: 7
    }"
    @change="onChangePage($event.current)"
  >
    <template #headerCell="{ column }">
      <template v-if="column.key === 'action'">
        <search-table
          v-model:keyword="keyword"
          v-model:field="field"
          :options="options"
          @change="onSearch"
        />
      </template>
    </template>

    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'name'">
        <a>
          {{ record.name }}
        </a>
      </template>

      <template v-if="column.key === 'active'">
        <a-tag v-if="record.active === ProjectActive.ACTIVE" color="#f50">
          Active
        </a-tag>
        <a-tag
          v-else-if="record.active === ProjectActive.DISABLED"
          color="#87d068"
        >
          Disabled
        </a-tag>
        <a-tag
          v-else-if="record.active === ProjectActive.DRAFT"
          color="#108ee9"
        >
          Draft
        </a-tag>
      </template>

      <template v-if="column.key === 'status'">
        <a-tag v-if="record.status === ProjectStatus.DONE" color="#f50">
          Done
        </a-tag>
        <a-tag
          v-else-if="record.status === ProjectStatus.PREPARE"
          color="#87d068"
        >
          Prepare
        </a-tag>
        <a-tag
          v-else-if="record.status === ProjectStatus.RUNNING"
          color="#108ee9"
        >
          Running
        </a-tag>
        <a-tag
          v-else-if="record.status === ProjectStatus.STUCK"
          color="#2db7f5"
        >
          Stuck
        </a-tag>
      </template>

      <template v-if="column.key === 'createdAt'">
        {{ $dayjs(record.createdAt).format('DD/MM/YYYY') }}
      </template>

      <template v-else-if="column.key === 'action'">
        <div>
          <a-popconfirm
            title="Are you sure delete this task?"
            ok-text="Yes"
            cancel-text="No"
            @confirm="
              removeProjectHandle({
                input: {
                  id: record.id
                }
              })
            "
          >
            <a-button type="danger" size="small">
              <div class="flex items-center">
                <i-ic-round-delete />
              </div>
            </a-button>
          </a-popconfirm>
          <a-button type="primary" size="small" class="ml-2">
            <div class="flex items-center">
              <i-material-symbols-edit />
            </div>
          </a-button>
        </div>
      </template>
    </template>
  </a-table>
</template>

<script lang="ts" setup>
import {
  GetProjects,
  GetProjectsVariables
} from '#apollo/queries/__generated__/GetProjects'
import { COUNT_PROJECTS, GET_PROJECTS } from '#apollo/queries/project.query'
import {
  CountProjects,
  CountProjectsVariables
} from '#apollo/queries/__generated__/CountProjects'
import { ProjectActive, ProjectStatus } from '#apollo/__generated__/types'
import { useSearchTable } from '@composable/useSearchTable'
import { REMOVE_PROJECT } from '#apollo/mutations/project.mutate'
import {
  RemoveProject,
  RemoveProjectVariables
} from '#apollo/mutations/__generated__/RemoveProject'

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
const apollo = useApollo()

const { options, keyword, field } = useSearchTable({
  options: ref([
    {
      label: 'Name',
      value: 'goal_name'
    }
  ])
})
// Raw filter projects
const rawFilter = reactive<GetProjectsVariables>({
  filter: {
    limit: 7,
    offset: 0,
    sort: 'createdAt',
    active: []
  }
})

const filterActive = computed(() => {
  if (
    [
      ProjectActive.ACTIVE,
      ProjectActive.DRAFT,
      ProjectActive.DISABLED
    ].includes(String(route.query.tab || '').toUpperCase() as ProjectActive)
  ) {
    return [String(route.query.tab || '').toUpperCase() as ProjectActive]
  }
  return []
})

// Filter projects
const filter = computed<GetProjectsVariables>(() => {
  return {
    filter: {
      name: keyword.value,
      limit: rawFilter.filter.limit,
      offset: rawFilter.filter.offset,
      sort: rawFilter.filter.sort,
      active: filterActive.value
    }
  }
})

const { result: projectsResult, loading } = useQuery<
  GetProjects,
  GetProjectsVariables
>(GET_PROJECTS, filter, {
  debounce: 300
})

// filter count projects
const countFilter = computed<CountProjectsVariables>(() => ({
  filter: {
    active: filterActive.value,
    name: keyword.value
  }
}))
const { result: countResult } = useQuery<CountProjects, CountProjectsVariables>(
  COUNT_PROJECTS,
  countFilter,
  {
    debounce: 300
  }
)

const onSearch = () => {
  rawFilter.filter.offset = 0
  rawFilter.filter.name = keyword.value
}

const onChangePage = (page: number) => {
  rawFilter.filter.offset = (page - 1) * rawFilter.filter.limit
}

// Xoá dự án
const {
  mutate: removeProjectHandle,
  loading: deleting,
  onDone: afterDelete
} = useMutation<RemoveProject, RemoveProjectVariables>(REMOVE_PROJECT)
afterDelete((val) => {
  if (val.data?.removeProject) {
    apollo.cache.evict({
      id: `Project:${val.data.removeProject.id}`
    })
  }
})
</script>

<style scoped></style>
