<template>

  <h3 class="mb-0 flex items-center text-[26px] font-semibold">
    {{ project?.name || '--' }}
  </h3>

  <div class="flex">
    <div class="w-1/2 pt-4">
      <h4 class="text-[17px]">Dự án của bạn đang được chúng tôi kiểm duyệt.</h4>

      <div class="text-[13px] text-gray-500">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. A ab aliquam aliquid animi architecto, aut dolore doloremque dolores doloribus, expedita natus neque non nulla omnis quidem quisquam quo reiciendis veniam.
      </div>

      <div class="text-[13px] text-gray-500 mt-2">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. A ab aliquam aliquid animi architecto, aut dolore doloremque dolores doloribus, expedita natus neque non nulla omnis quidem quisquam quo reiciendis veniam.
      </div>

      <div class="text-[13px] text-gray-500 mt-3">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. A ab aliquam aliquid animi architecto, aut dolore doloremque dolores doloribus, expedita natus neque non nulla omnis quidem quisquam quo reiciendis veniam.
      </div>

      <div class="mt-4">
        <a-button type="primary">
          <span>Hoàn Tất</span>
        </a-button>
      </div>

    </div>
    <div class="w-1/2">
      <div class="w-full flex items-center flex-col">
        <vue-lottie-player
          width="300px"
          height="300px"
          loop
          path="https://assets6.lottiefiles.com/packages/lf20_ivtaxtzm.json"
        />
        <p class="mb-0 text-[12px] text-gray-500">Chúng tôi đánh giá cao sự kiên nhẫn của bạn</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {CreateProject_createProject} from "#apollo/mutations/__generated__/CreateProject";

const props = defineProps<{
  project: Omit<CreateProject_createProject, '__typename'>
}>()
</script>

<style scoped></style>
