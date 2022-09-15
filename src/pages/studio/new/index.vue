<template>
  <div>

    <tranform-view to="#studio-actions">
      <a-button type="primary" class="items-end" @click="$router.push('/studio/new-project')">
        Đăng Tải
        <template #icon>
          <i-ic-round-upload class="inline-block mr-1" />
        </template>
      </a-button>
    </tranform-view>

    <div class="px-3">
      <project-form />
    </div>

  </div>
</template>

<style scoped>

</style>
