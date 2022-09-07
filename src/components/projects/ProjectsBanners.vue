<template>
  <div class="relative bg-gray-100 rounded-xl overflow-hidden w-full h-[280px] cutsom-shadow">

    <div class="absolute z-10 bottom-5 right-5">

      <div class="bg-white flex p-2 rounded-lg cutsom-shadow">
        <button
            v-for="(image, index) in images"
            :key="index"
            class="w-9 h-9 overflow-hidden ml-2 first:ml-0 rounded-lg relative"
            @click="changeIndex(index)"
        >
          <img
              alt=""
              :src="image"
              class="w-full h-full object-cover absolute z-0 top-0 left-0 filter transition"
              :class="{
                  'brightness-75': index === activeIndex,
              }"
          />

          <span class="absolute z-20 text-white top-1/2 left-1/2">
            <i-ic-outline-check
                class="transform transition -translate-x-1/2 -translate-y-1/2"
                :class="{
                  'opacity-0': index !== activeIndex,
                }"
            />
          </span>

        </button>
      </div>

    </div>



    <!-- Image -->

    <div class="w-full h-full absolute">
      <img
          v-for="(image, index) in images"
          :key="index"
          class="absolute inset-0 w-full h-full object-cover transition transform duration-500 ease-in-out z-0"
          :class="{
            'opacity-0 scale-110': index !== activeIndex,
        }"
          :src="image"
          alt=""
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import {rand} from "@vueuse/core";

const images = ref<string[]>(Array(4).fill('1').map((value, index) => `/images/projects/project-${index+1}.jpg`))

const activeIndex = ref(0)

const { pause, resume, isActive } = useIntervalFn(() => {
  activeIndex.value = rand(0, images.value.length - 1)
}, 3000)

const changeIndex = (index: number) => {
  pause()
  activeIndex.value = index
  resume()
}
</script>

<style scoped>

</style>
