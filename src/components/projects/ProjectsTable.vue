<template>
  <a-table
    :columns="columns"
    :data-source="projects"
    :loading="loading"
    :pagination="{
      total: countProjects,
      showLessItems: true,
      defaultPageSize: 7
    }"
    @change="onChangePage($event.current)"
  >
    <template #headerCell="{ column }">
      <template v-if="column.key === 'action'">
        <search-table
          v-model:value="formSearch"
          :options="searchOptions"
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
</template>

<script lang="ts" setup>
import {
  GetProjects,
  GetProjects_studioProjects,
  GetProjectsVariables
} from '#apollo/queries/__generated__/GetProjects'
import { COUNT_PROJECTS, GET_PROJECTS } from '#apollo/queries/project.query'
import {
  CountProjects,
  CountProjectsVariables
} from '#apollo/queries/__generated__/CountProjects'
import { ProjectActive, ProjectStatus } from '#apollo/__generated__/types'

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
      limit: rawFilter.filter.limit,
      offset: rawFilter.filter.offset,
      sort: rawFilter.filter.sort,
      active: filterActive.value
    }
  }
})

const { result, loading } = useQuery<GetProjects, GetProjectsVariables>(
  GET_PROJECTS,
  filter.value,
  {
    debounce: 300
  }
)
const projects = computed<GetProjects_studioProjects[]>(
  () => result.value?.studioProjects || []
)

// filter count projects
const countFilter = reactive<CountProjectsVariables>({
  filter: {}
})
watch(rawFilter, () => {
  const _filter: any = Object.assign({}, rawFilter.filter)
  delete _filter.limit
  delete _filter.offset
  delete _filter.sort
  Object.assign(countFilter.filter, _filter)
})

const { result: countResult } = useQuery<CountProjects, CountProjectsVariables>(
  COUNT_PROJECTS,
  countFilter,
  {
    debounce: 300
  }
)

const countProjects = computed<number>(
  () => countResult.value?.studioProjectsCount || 0
)

/**
 * Các fild sẽ dùng để tìm kiếm
 * Mỗi số field đều phải có key và label
 * @type {Array<{key: string, label: string}>}
 * Sẽ search thoe value của field đó
 */
const searchOptions = [
  {
    label: 'Name',
    value: 'goal_name'
  }
]

const formSearch = reactive<{
  field: string
  keyword: string
}>({
  field: 'Name',
  keyword: ''
})

const onSearch = () => {
  Object.assign(rawFilter.filter, {
    name: formSearch.keyword,
    offset: 0
  })
}

const onChangePage = (page: number) => {
  Object.assign(rawFilter.filter, {
    offset: (page - 1) * rawFilter.filter.limit
  })
}
</script>

<style scoped></style>
