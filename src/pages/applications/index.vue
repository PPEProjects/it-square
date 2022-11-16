<template>
  <teleport-view to="#tabs">
    <tab-nav :tabs="tabs" />
  </teleport-view>
</template>

<script lang="ts" setup>
import {ProposalStatus} from "#apollo/__generated__/types";

const tabs = ref([
  {
    key: '',
    tab: 'Tất Cả'
  },
  {
    key: ProposalStatus.WAITING.toLowerCase(),
    tab: 'Đã Chờ'
  },
  {
    key: ProposalStatus.APPROVED.toLowerCase(),
    tab: 'Đã Duyệt'
  },
  {
    key: ProposalStatus.REJECTED.toLowerCase(),
    tab: 'Đã Từ Chối'
  }
])
</script>

<style scoped></style>
