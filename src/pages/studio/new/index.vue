<template>
  <div>
    <div class="pb-5">
      <a-steps>
        <a-step :status="buildStep(1)" title="Tạo Dự Án">
          <template #icon>
            <i-ic-twotone-pentagon />
          </template>
        </a-step>
        <a-step :status="buildStep(2)" title="Thiết Lập Nâng Cao">
          <template #icon>
            <i-icon-park-twotone-modify />
          </template>
        </a-step>
        <a-step :status="buildStep(3)" title="Mời Tham Gia">
          <template #icon>
            <i-ic-twotone-mark-email-unread />
          </template>
        </a-step>
        <a-step :status="buildStep(4)" title="Hoàn Tất">
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
      <project-form v-if="step === 1" @on-created="afterCreated" />
      <project-advance v-else-if="step === 2" :project="form" @next="step++" />
      <project-invite v-else-if="step === 3" :project="form" @next="step++" />
      <project-interview v-else-if="step === 4" :project="form" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { CreateProject_createProject } from '#apollo/mutations/__generated__/CreateProject'

const step = ref(4)

const buildStep = (position: number) => {
  if (position > step.value) {
    return 'wait'
  } else if (position === step.value) {
    return 'process'
  } else {
    return 'finish'
  }
}

const form = ref<Omit<CreateProject_createProject, '__typename'>|undefined>({
  id: '63468497a7433fabd7daa8b7',
  name: 'Chạm Vào Giai Điệu',
  slug: 'koki-matsuno'
})

const afterCreated = (
  data: Omit<CreateProject_createProject, '__typename'>
) => {
  form.value = data
  step.value = 2
}
</script>

<style scoped></style>
