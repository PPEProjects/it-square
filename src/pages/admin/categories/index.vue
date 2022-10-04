<template>
  <div class="-my-[10px]">
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

      <template #headerCell="{ column }">
        <template v-if="column.key === 'action'">
          <a-button type="primary" size="small">
            <template #icon>
              <i-material-symbols-add class="inline-block" />
            </template>
            Thêm Mới
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
    width: 250
  },
  {
    title: 'Avatar',
    dataIndex: 'avatar',
    key: 'avatar',
  },
  {
    title: 'Mô Tả',
    dataIndex: 'description',
    key: 'description',
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
