<template>
  <div
    class="mb-1.5 flex cursor-pointer items-center rounded-md bg-white px-2.5 py-1.5 last:mb-0"
  >

    <i-bx-bxs-file-png v-if="extention === 'png'" class="text-orange-500" />
    <i-jam-folder-zip-f v-else-if="extention === 'zip'" class="text-blue-600" />
    <i-ion-md-document v-else class="text-indigo-600" />

    <span class="ml-2">{{ fileName }}</span>

    <button class="ml-auto">
      <i-ic-baseline-delete
        class="inline-block scale-90 transform text-rose-500"
      />
    </button>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  file: string
}>()

const fileName = computed(() => {
  const file = props.file.split('/')
  return file[file.length - 1]
})

const extention = computed(() => {
  const file = props.file.split('.')
  return file[file.length - 1]
})
</script>

<style scoped></style>
