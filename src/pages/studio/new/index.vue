<template>
  <div>
    <div class="pb-5">
      <a-steps>
        <a-step status="finish" title="Tạo Dự Án">
          <template #icon>
            <i-ic-twotone-pentagon />
          </template>
        </a-step>
        <a-step status="finish" title="Thiết Lập Nâng Cao">
          <template #icon>
            <i-icon-park-twotone-modify />
          </template>
        </a-step>
        <a-step status="process" title="Mời Tham Gia">
          <template #icon>
            <i-ic-twotone-mark-email-unread />
          </template>
        </a-step>
        <a-step status="wait" title="Hoàn Tất">
          <template #icon>
            <i-ph-flag-duotone />
          </template>
        </a-step>
      </a-steps>
    </div>

    <div
        class="relative overflow-y-auto scrollbar-hide"
        style="height: calc(100vh - 70px - 22px - 16px - 16px - 24px - 60px)"
    >
      <project-form />
    </div>
  </div>
</template>

<style scoped>

</style>
