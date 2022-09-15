<template>
  <div>

    <tranform-view to="#studio-actions">
      <a-button type="primary" class="items-end" @click="$router.push('/studio/new-project')">
        Thêm Mới
        <template #icon>
          <i-ic-baseline-plus class="inline-block mr-1" />
        </template>
      </a-button>
    </tranform-view>

    <a-table :data-source="dataSource" :columns="columns">
      <template #bodyCell="{ column }">
        <template v-if="column.key === 'action'">
          <a-button type="primary" size="small">
            <template #icon>
              <i-material-symbols-edit-rounded class="inline-block" />
            </template>
          </a-button>
          <a-button
              type="danger"
              size="small"
              class="ml-2"
          >
            <template #icon>
              <i-ic-baseline-delete class="inline-block" />
            </template>
          </a-button>
        </template>
      </template>
    </a-table>

  </div>
</template>

<script lang="ts" setup>
const dataSource = [
  {
    key: '1',
    name: 'Smileeye Japan',
    age: 32,
    address: '10 Downing Street',
  },
  {
    key: '2',
    name: 'Green Home',
    age: 42,
    address: '10 Downing Street',
  },
]

const columns = [
  {
    title: 'Tên',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Trạng Thái',
    dataIndex: 'status',
    key: 'status',
  },
  {
    title: 'Phân Loại',
    dataIndex: 'status',
    key: 'status',
  },
  {
    title: 'Thành Viên',
    dataIndex: 'status',
    key: 'status',
  },
  {
    title: 'Hành Động',
    key: 'action',
    align: 'right',
    fixed: 'right',
    width: 130
  }
]
</script>
