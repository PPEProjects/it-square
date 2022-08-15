<template>
  <div id='site-header'>

    <test-comp />

    <button>
      <i-ic-baseline-arrow-back-ios-new />
    </button>

  </div>
</template>

<script>
export default {
  name: 'SiteHeader'
}
</script>

<style scoped>
#site-header {
  @apply h-[80px] px-4 flex items-center
}
</style>
