<template>
  <ul class="flex my-0">
    <li
        v-for="index in 5"
        :key="index"
        class="text-current ml-2 first:ml-0"
    >
      <i-bi-star-fill v-if="index <= rating" class="text-orange-500" />
      <i-bi-star-fill v-else class="text-gray-300" />
    </li>
  </ul>
</template>

<script lang="ts" setup>
defineProps<{
  rating: number
}>()
</script>

<style scoped>

</style>
