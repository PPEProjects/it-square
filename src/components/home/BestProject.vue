<template>
  <div ref="target" class="relative h-[400px] overflow-hidden rounded-lg">
    <img
      class="relative z-0 h-full w-full rounded-lg object-cover"
      src="/images/banner/bg.png"
      alt=""
    />

    <div
      class="absolute top-1/2 left-0 z-10 h-4/5 w-1/2 translate-x-24 -translate-y-1/2 transform"
    >
      <div class="relative h-full w-full">
        <img
          v-motion
          :initial="{
            y: 400,
            opacity: 0
          }"
          :delay="500"
          :enter="{
            y: 0,
            opacity: 1
          }"
          class="absolute top-0 left-0 z-0 h-full w-auto object-cover"
          :style="buildLayerStyle(1)"
          src="/images/banner/eart.png"
          alt=""
        />
        <img
          v-motion
          :delay="1000"
          :initial="{
            y: 400,
            opacity: 0
          }"
          :enter="{
            y: 0,
            opacity: 1
          }"
          class="absolute top-0 left-0 z-10 h-full w-auto object-cover"
          :style="buildLayerStyle(2)"
          src="/images/banner/user.png"
          alt=""
        />
        <img
          v-motion
          :delay="1500"
          :initial="{
            opacity: 0,
            y: 400
          }"
          :enter="{
            y: 0,
            opacity: 1
          }"
          class="absolute top-0 left-0 z-10 h-auto w-full object-cover"
          :style="buildLayerStyle(3)"
          src="/images/banner/tool.png"
          alt=""
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { CSSProperties } from 'vue'

const target = ref<HTMLDivElement>()
const parallax = reactive(useParallax(target))

const buildLayerStyle = (index: number): CSSProperties => {
  return {
    transform: `translateX(${parallax.tilt * 10 * index}px) translateY(${
      parallax.roll * 10 * index
    }px)`
  }
}
</script>

<style scoped></style>
