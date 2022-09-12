<template>
  <base-modal event="addCommentModal" title="Đánh Giá Dự Án" :visible="true" :max-width="600">
    <div class="pt-2">
      <ul class="mb-0">
        <li
            v-for="comment in poits"
            :key="comment.key"
            class="mb-3 last:mb-0"
        >
          <div class="flex justify-between items-center">
            <h5 class="mb-0 font-semibold text-gray-600">{{ comment.name }}</h5>

            <ul class="flex">
              <li
                  v-for="index in 5"
                  :key="index"
                  class="text-[12px] ml-2 first:ml-0"
              >
                <i-bi-star-fill v-if="index <= comment.score" class="text-orange-500" />
                <i-bi-star-fill v-else class="text-gray-300" />
              </li>
            </ul>

          </div>
        </li>
      </ul>

      <div class="flex items-center justify-between mt-4 mb-3">
        <div class="font-semibold text-gray-600">Điểm Tổng:</div>

        <div class="flex items-center bg-gray-100 px-3 py-1 rounded-lg">
          <span class="mr-1 text-[13px]">4</span>
          <i-bi-star-fill class="text-orange-500 text-[12px] relative -mt-1 font-semibold" />
        </div>

      </div>

      <review-magic-input />

    </div>

    <template #bottom>
      <div class="flex justify-end">
        <button
            type="submit"
            class="flex items-center rounded-full bg-gradient-to-r from-primary-500 to-primary-700 px-3 py-2 text-white"
        >
          <i-ph-paper-plane-tilt-bold />
          <span class="ml-2 text-xs font-semibold"> Bình Luận </span>
        </button>
      </div>
    </template>

  </base-modal>
</template>

<script lang="ts" setup>

interface SratingScore {
  score: number
  name: string
  key: string
}

const poits = ref<SratingScore[]>([
  {
    score: 5,
    name: 'Thiết Kế Ưa Nhìn',
    key: 'design',
  },
  {
    score: 4,
    name: 'Tốc Độ Phát Triển',
    key: 'good',
  },
  {
    score: 4,
    name: 'Tài Liệu Hướng Dẫn',
    key: 'document',
  },
  {
    score: 2,
    name: 'Tầm Nhìn Dự Án',
    key: 'vision',
  }
])
</script>

<style scoped>

</style>
