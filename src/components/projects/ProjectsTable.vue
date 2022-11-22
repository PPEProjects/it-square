<template>
  <a-table
    :columns="columns"
    :data-source="projects"
    :loading="loading"
    :pagination="{
      total: count,
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
        <router-link :to="'/projects/' + record.id">
          {{ record.name }}
        </router-link>
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
          <a-button
            type="primary"
            size="small"
            class="mr-2"
            @click="openApprove(record)"
          >
            <div class="flex items-center">
              <i-ion-logo-apple-ar />
            </div>
          </a-button>

          <a-popconfirm
            title="Are you sure delete this task?"
            ok-text="Yes"
            cancel-text="No"
            @confirm="removeProjectHandle(record.id)"
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
            @click="$router.push('/projects/' + record.id)"
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
    v-model:visible="showApprove"
    title="Thay Đổi Trạng Thái"
    @ok="approveProjectHandle()"
  >
    <ul class="flex flex-wrap">
      <li
        v-for="(item, index) in approveOptions"
        :key="index"
        class="mr-5 transform transition"
        :class="{
          'scale-95': approveForm.active !== item.value
        }"
      >
        <div
          class="flex cursor-pointer items-center rounded-lg border-[2px] px-3 py-1.5 transition"
          :class="{
            'border-primary-500 bg-primary-100 text-white':
              approveForm.active === item.value
          }"
          @click="approveForm.active = item.value"
        >
          <span
            class="flex h-4 w-4 items-center justify-center rounded-full border"
          >
            <span
              class="h-2 w-2 transform rounded-full bg-primary-500 transition"
              :class="{
                'scale-0': approveForm.active !== item.value
              }"
            ></span>
          </span>

          <span
            class="ml-2 transition"
            :class="[
              approveForm.active === item.value
                ? 'font-semibold text-primary-600'
                : 'font-normal text-gray-600'
            ]"
          >
            {{ item.label }}
          </span>
        </div>
      </li>
    </ul>
  </a-modal>
</template>

<script lang="ts" setup>
import { GetProjectsVariables } from '#apollo/queries/__generated__/GetProjects'
import { ProjectActive, ProjectStatus } from '#apollo/__generated__/types'
import { useSearchTable } from '@composable/useSearchTable'
import { useApprove } from '@composable/useApprove'
import { useRemoveProject } from '@composable/useRemoveProject'
import { useProjects } from '@composable/useProjects'
import { useProjectCounter } from '@composable/useProjectsCounter'

const route = useRoute()

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: 'Category',
    dataIndex: ['category', 'name'],
    key: 'category',
    align: 'center'
  },
  {
    title: 'Active',
    dataIndex: 'active',
    key: 'active',
    align: 'center'
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
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

// Raw filter projects
const rawFilter = reactive<GetProjectsVariables>({
  filter: {
    limit: 7,
    offset: 0,
    sort: 'createdAt',
    active: []
  }
})

const { options, keyword, field } = useSearchTable({
  options: ref([
    {
      label: 'Name',
      value: 'goal_name'
    }
  ])
})

const onSearch = () => {
  rawFilter.filter.offset = 0
  rawFilter.filter.name = keyword.value
}

const onChangePage = (page: number) => {
  rawFilter.filter.offset = (page - 1) * rawFilter.filter.limit
}

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
const {
  projects,
  loading: projectsLoading,
  filter: projectsFilter
} = useProjects({
  fetchPolicy: 'network-only',
  filter: {
    active: filterActive.value
  }
})

// count projects
const { count, filter: countFilter, loading: countLoading } = useProjectCounter({
  fetchPolicy: 'network-only',
  filter: {
    active: filterActive.value
  }
})

// Quan sats keyword va field => resset
watch([keyword, field], () => {
  rawFilter.filter.name = keyword.value
  rawFilter.filter.offset = 0
})

// Quan sats rawfilter
watch(rawFilter, () => {
  projectsFilter.name = rawFilter.filter.name
  countFilter.name = rawFilter.filter.name
  projectsFilter.offset = rawFilter.filter.offset
})

// Xoá dự án
const { loading: deleteLoading, handle: removeProjectHandle } = useRemoveProject()

const {
  options: approveOptions,
  form: approveForm,
  open: openApprove,
  show: showApprove,
  handle: approveProjectHandle
} = useApprove()

const loading = computed(()=> projectsLoading.value || countLoading.value || deleteLoading.value)
</script>

<style scoped></style>
