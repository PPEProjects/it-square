<template>
  <teleport-view to="#tabs">
    <tab-nav :tabs="tabs" />
  </teleport-view>

  <projects-table :key="$route.query.tab" />


  <teleport-view to="#actions">
    <a-button
        type="primary"
        @click="$router.push('/workspace/new')"
    >
      <template #icon>
        <i-ic-baseline-check />
      </template>
      <span class="ml-1">
        Add New
      </span>
    </a-button>
  </teleport-view>

</template>
<script lang="ts" setup>
import {ProjectActive} from "#apollo/__generated__/types";

const tabs = ref([
  {
    key: '',
    tab: 'All'
  },
  {
    key: ProjectActive.ACTIVE.toLowerCase(),
    tab: 'Active'
  },
  {
    key: ProjectActive.DRAFT.toLowerCase(),
    tab: 'Draft'
  },
  {
    key: ProjectActive.DISABLED.toLowerCase(),
    tab: 'Blocked'
  }
])
</script>
