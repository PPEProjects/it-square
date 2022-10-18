<template>
  <h4 class="mb-0 text-[18px] font-semibold text-gray-600 flex items-center">
    Phân quyền dự án

    <a-tooltip>
      <template #title> Mô tả về một số quyền cơ bản </template>
      <i-material-symbols-info class="text-[14px] ml-2" @click="visible = true" />
    </a-tooltip>
  </h4>

  <div style="width: 250px; height: 200px" class="mx-auto">
    <vue-lottie-player
      width="250px"
      height="200px"
      loop
      path="https://assets8.lottiefiles.com/packages/lf20_7jnffdxl.json"
    />
  </div>

  <div>
    <div class="flex items-center justify-center">
      <a-button type="primary"> Thêm Tiến Độ </a-button>

      <a-button type="danger" class="ml-3">
        <i-ph-magic-wand-bold />
      </a-button>
    </div>
    <p class="mt-2 text-center text-[12px] text-gray-400">
      Việc thiết lập đầy đủ các bước sẽ hỗ trợ bạn rất nhiều cho việc quản lý dự
      án.
      <br />
      Nếu bạn thấy khó khăn có thể sử dụng các mẫu của chúng tôi.
    </p>
  </div>

  <a-modal v-model:visible="visible" title="Giới Thiệu">
    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae debitis deserunt est libero qui voluptatum? Delectus natus praesentium rem sequi? Commodi delectus dignissimos enim impedit iusto non quo tempore veritatis.
  </a-modal>
</template>

<script lang="ts" setup>
const visible = ref(false)
</script>

<style scoped></style>
