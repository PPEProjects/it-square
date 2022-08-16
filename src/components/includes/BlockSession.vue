<template>
  <div class='session-block'>
    <div class='session-title'>
      <div>
        <h4>{{ title }}</h4>
        <div class='opacity-90 text-gray-500 description'>{{ description }}</div>
      </div>

      <button class='flex items-center transition text-gray-500 hover:text-primary-600'>
        <span class='text-[13px] transition mr-1'>Xem Thêm</span>
        <i-material-symbols-arrow-forward-rounded class='transition' />
      </button>

    </div>
    <div class='session-content mt-5'>
      <slot></slot>
    </div>
  </div>
</template>

<script lang='ts' setup>
defineProps<{
  title: string;
  description?: string;
}>()
</script>

<style scoped lang='scss'>
.session-block {
  .session-title {
    @apply flex justify-between items-center;
    h4 {
      @apply font-semibold text-[24px] mb-0
    }

    .description {
      &:empty {
        @apply hidden
      }
    }

  }
}
</style>

