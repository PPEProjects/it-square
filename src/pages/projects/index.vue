<template>
  <teleport-view to="#tabs">
    <tab-nav :tabs="tabs" />
  </teleport-view>

  <projects-table :key="$route.query.tab" />

</template>
<script lang="ts" setup>
import {ProjectActive} from "#apollo/__generated__/types";

const tabs = ref([
  {
    key: '',
    tab: 'Tất Cả'
  },
  {
    key: ProjectActive.ACTIVE.toLowerCase(),
    tab: 'Hoạt Động'
  },
  {
    key: ProjectActive.DRAFT.toLowerCase(),
    tab: 'Bản Nháp'
  },
  {
    key: ProjectActive.DISABLED.toLowerCase(),
    tab: 'Bị Khóa'
  }
])
</script>
