<template>
  <div
    ref='elRef'
    class="h-full w-full px-6 py-5 text-white running-item relative"
  >

    <div class='sprite' :style='spriteStyle'></div>

    <div class='w-full h-full flex flex-col relative'>
      <div class="flex items-center">
        <button
          class="bg-badge flex h-11 w-11 items-center justify-center overflow-hidden rounded-full text-[22px]"
        >
          <i-ic-twotone-fiber-smart-record />
        </button>

        <span class='mr-auto ml-5'>40/100</span>

        <button
          class="bg-badge flex items-center justify-center overflow-hidden rounded-lg px-2 py-1"
        >
          <i-ph-fire-simple-duotone class="text-[14px]" />
          <span class="ml-1 text-[13px]">Hight</span>
        </button>
      </div>

      <h4 class="mt-4 mb-0 text-[22px] font-bold text-white">Talent Ui Design</h4>

      <div>Web & Responsive</div>

      <div class='mt-auto flex items-end justify-between'>
        <button class='flex items-center'>
          <i-ep-flag class='text-[13px]' />
          <span class='ml-2'>Jan 14</span>
        </button>


        <div
          class="relative h-[35px] bottom-2"
          :style='{
            width: `${3 * 20}px`,
          }'
        >
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
