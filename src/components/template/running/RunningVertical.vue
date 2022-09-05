<template>
  <div
    ref='elRef'
    class="h-full w-full px-6 py-5 text-white running-item relative cutsom-shadow"
  >

    <div class='sprite' :style='spriteStyle'></div>

    <div class='w-full h-full flex flex-col relative'>
      <div class="flex items-center justify-between">
        <button
          class="bg-badge flex h-11 w-11 items-center justify-center overflow-hidden rounded-full text-[22px]"
        >
          <i-ic-twotone-fiber-smart-record />
        </button>

        <button
          class="bg-badge flex items-center justify-center overflow-hidden rounded-lg px-2 py-1"
        >
          <i-ph-fire-simple-duotone class="text-[14px]" />
          <span class="ml-1 text-[13px]">Hight</span>
        </button>
      </div>

      <div class="relative mt-7 h-[35px]">
        <button
          v-for="index in 3"
          :key="index"
          class="absolute top-0 left-0 h-full w-[35px] overflow-hidden rounded-full border-2 border-white"
          :style="{
          transform: 'translateX(' + (index - 1) * 20 + 'px)',
          zIndex: 3 - index
        }"
        >
          <img
            class="h-full w-full transform object-cover transition hover:scale-105"
            src="/images/avatar.jpeg"
            alt=""
          />
        </button>
      </div>

      <h4 class="mt-5 mb-0 text-[22px] font-bold text-white">Talent Ui Design</h4>

      <div>Web & Responsive</div>

      <div class="mt-5 flex items-center text-[13px] opacity-80">
        <span>2 Comments</span>
        <i-radix-icons-dot-filled />
        <span>1 File</span>
      </div>

      <div class="mt-4">
        <div class="bg-badge relative h-[5px] w-full rounded-full overflow-hidden">
          <div
            class="absolute h-full w-full bg-sky-300"
            :style="{
            maxWidth: '60%'
          }"
          ></div>
        </div>

        <div class='mt-4 text-[13px]'>
          <span class='opacity-80'>In Progress</span>
          <span class='font-bold ml-1'>60%</span>
        </div>

      </div>

      <div class='mt-auto flex items-center justify-between'>

        <button class='w-7 h-7 bg-badge2 rounded-full overflow-hidden flex justify-center items-center'>
          <i-ph-push-pin-fill class='text-[13px]' />
        </button>

        <button class='flex items-center'>
          <i-ep-flag class='text-[13px]' />
          <span class='ml-2'>Jan 14</span>
        </button>

      </div>

    </div>

  </div>
</template>

<script lang='ts' setup>
import type { CSSProperties } from 'vue'
const { colorFactory, sparkFactory } = useTheme()

const bg = computed(() => colorFactory())


const elRef = ref<HTMLDivElement>()
const { width, height } = useElementSize(elRef)

const spriteStyle = computed<CSSProperties>(() => {

  if(!width || !height) {
    return {}
  }

  const icon = sparkFactory()

  // random position
  const posion = {
    width: Math.floor(Math.random() * (width.value - icon.width)),
    height: Math.floor(Math.random() * (height.value - icon.height)),
  }

  return {
    background: `url('/images/sparkling/stars-map.png') no-repeat ${icon.position[0]}px ${icon.position[1]}px`,
    width: `${icon.width}px`,
    height: `${icon.height}px`,
    top: `${posion.height}px`,
    left: `${posion.width}px`,
  }
})

</script>

<style scoped lang='scss'>

.running-item {
  background-color: v-bind(bg);
  .bg-badge {
    @apply bg-[#00000033];
  }
  .bg-badge2 {
    @apply bg-[#ffffff33];
  }
  p,
  h4 {
    margin-bottom: 0;
  }


  .sprite {
    @apply absolute opacity-10 scale-[0.4];
  }
}
</style>
