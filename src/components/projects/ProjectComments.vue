<template>
  <div>
    <h3 class="text-[20px] font-semibold text-gray-700 mb-0">
      Đánh Giá
      <span class="text-[14px] text-gray-500">(250)</span>
    </h3>

    <div class="flex mt-4">
      <div class="w-2/3 pr-7">
        <ul>
          <li
            v-for="comment in poits"
            :key="comment.key"
            class="mb-4 last:mb-0"
          >
            <div class="flex justify-between items-center">
              <h5 class="mb-0 font-semibold text-gray-600">{{ comment.name }}</h5>

              <ul class="flex">
                <li
                    v-for="index in 5"
                    :key="index"
                    class="text-[13px] ml-2 first:ml-0"
                >
                  <i-bi-star-fill v-if="index <= comment.score" class="text-orange-500" />
                  <i-bi-star-fill v-else class="text-gray-300" />
                </li>
              </ul>

            </div>
          </li>
        </ul>
      </div>
      <div class="w-1/3">
        <div class="w-full h-full justify-center items-center">
          <button class="flex items-center mr-6 bg-gradient-to-r from-primary-500 to-primary-700 text-white px-3 py-2 rounded-full shadow-lg shadow-primary-200">
            <span class="text-xs font-semibold mr-1">Đánh Giá</span>
            <i-material-symbols-add-circle />
          </button>
        </div>
      </div>
    </div>

  </div>
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
