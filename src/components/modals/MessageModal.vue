<template>

  <div
      ref='el'
      class='absolute bottom-0 left-0 w-full px-5 py-3 text-white opacity-0 z-10'
      :class='{
        "bg-primary-500": success,
        "bg-red-500": !success
    }'
  >
    {{ message }}
  </div>

</template>

<script lang="ts" setup>
defineProps<{
  message: string
  success: boolean
}>()

const el = ref<HTMLElement>()
const anime = useAnime()

const emit = defineEmits<{
  (e: 'update:message', value: string): void
  (e: 'done'): void
}>()
onMounted(() => nextTick(() => {
  anime({
    targets: el?.value,
    translateY: [50, 0],
    opacity: [0, 1],
    duration: 1200,
    complete: () => {
      setTimeout(() => {
        emit('update:message', '')
        emit('done')
      }, 3000)
    }
  })
}))

</script>
