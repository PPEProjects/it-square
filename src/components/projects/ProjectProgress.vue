<template>
  <div>
    <h3 class="text-[20px] font-semibold text-gray-700 mb-0">
      Tiến Độ
    </h3>


    <div class="mt-3 text-gray-500">
      <div class="flex items-center justify-between">
        <button class='flex items-center'>
          <i-ep-flag class='text-[13px]' />
          <span class='ml-2 text-[14px]'>14 Tháng 2</span>
        </button>

        <button class='flex items-center'>
          <i-material-symbols-check-circle class='text-[13px]' />
          <span class='ml-2 text-[14px]'>30 Tháng 8</span>
        </button>

      </div>

      <div class="flex items-center justify-between mt-4 relative">

        <div
            v-for="(step, index) in steps"
            :key="step.key"
            class="relative z-10"
        >
          <div
              class="w-16 h-16 rounded-full object-cover border-[3px] cutsom-shadow bg-white flex items-center justify-center"
              :class="{
                'border-primary-500': index <= currentIndex,
                'border-gray-300': index > currentIndex,
              }"
          >
            <i-ic-baseline-check v-if="currentIndex > index" class="text-[22px] text-primary-500" />
            <i-eos-icons-loading v-else-if="currentIndex === index" class="text-[22px] text-primary-500" />
            <i-mdi-clock-time-eight-outline v-else class="text-[22px] text-gray-300" />
          </div>
        </div>

        <div class="absolute h-[4px] top-1/2 left-3 right-3 transform z-0">
          <div class="w-full h-full bg-gray-100 relative">
            <div class="bg-primary-500 h-full" style="width: 33%"></div>
          </div>
        </div>

      </div>

      <div class="flex items-center justify-between mt-2.5 relative">

        <div
            v-for="step in steps"
            :key="step.key"
            class="w-16 text-center"
        >
          <span class="mt-3 font-semibold text-gray-500">{{ step.title }}</span>
        </div>
      </div>

    </div>

    <div class="mt-4">Dự án hiện vẫn đang welcome thành viên mới. <a class="underline" href="javascript:void(0)">Đăng ký ngay</a></div>

  </div>
</template>

<script lang="ts" setup>

interface Step {
  key: string
  title: string
}

const steps = ref<Step[]>([
  {
    key: 'Design',
    title: 'Design'
  },
  {
    key: 'Development',
    title: 'Dev'
  },
  {
    key: 'Testing',
    title: 'Testing'
  },
  {
    key: 'Delivery',
    title: 'Delivery'
  }
])

const current = ref('Development')

const currentIndex = computed(() => {
  return steps.value.findIndex(step => step.key === current.value)
})
</script>
