<template>
  <div>

    <tranform-view to="#header-actions">
      <button
          class="rounded-full bg-gradient-to-r from-primary-500 to-primary-700 px-4 py-2 text-white"
          @click="$router.push('/auth/signin')"
      >
        <i-ic-round-upload class="inline-block mr-1" />
        <span>Đăng Tải</span>
      </button>
    </tranform-view>

    <div class="px-3">
      <project-form />
    </div>

  </div>
</template>

<style scoped>

</style>
