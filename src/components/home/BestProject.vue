<template>
  <div ref='target' class='rounded-lg overflow-hidden h-[400px] relative'>
    <img class='w-full h-full object-cover rounded-lg' :style="layer0" src='/images/best-project.jpg' alt='' />
  </div>
</template>

<script lang='ts' setup>
import { CSSProperties } from 'vue'

const target = ref<HTMLDivElement>()
const parallax = reactive(useParallax(target))
const layerBase: CSSProperties = {
  position: 'absolute',
  height: '100%',
  width: '100%',
  transition: '.3s ease-out all',
  zIndex: 10,
}

const layer0 = computed(() => ({
  ...layerBase,
  transform: `translateX(${parallax.tilt * 10}px) translateY(${
    parallax.roll * 10
  }px) scale(1.1)`,
}))
</script>

<style scoped>

</style>
