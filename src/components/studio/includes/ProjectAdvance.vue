<template>
  <div class="h-full">
    <h3 class="text-[26px] font-semibold mb-0">
      {{ project.name }}
    </h3>

    <div class="flex mt-4">
      <div class="w-1/2">
        <h4 class="text-gray-600 text-[18px] font-semibold mb-0">Tiến độ dự án</h4>

        <div style="width: 250px; height: 200px" class="mx-auto">
          <vue-lottie-player
              width="250px"
              height="200px"
              loop
              path="https://assets4.lottiefiles.com/packages/lf20_k8heoy5g.json"
          />
        </div>

        <div>
          <div class="flex items-center justify-center">
            <a-button type="primary">
              Thêm Tiến Độ
            </a-button>

            <a-button type="danger" class="ml-3">
              <i-ph-magic-wand-bold />
            </a-button>

          </div>
          <p class="text-gray-400 text-[12px] mt-2 text-center">
            Việc thiết lập đầy đủ các bước sẽ hỗ trợ bạn rất nhiều cho việc quản lý dự án.
            <br />
            Nếu bạn thấy khó khăn có thể sử dụng các mẫu của chúng tôi.
          </p>
        </div>

      </div>

      <div class="w-1/2 border-l border-gray-100 pl-5">
        <h4 class="text-gray-600 text-[18px] font-semibold mb-0">Phân quyền dự án</h4>

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
            <a-button type="primary">
              Thêm Tiến Độ
            </a-button>

            <a-button type="danger" class="ml-3">
              <i-ph-magic-wand-bold />
            </a-button>

          </div>
          <p class="text-gray-400 text-[12px] mt-2 text-center">
            Việc thiết lập đầy đủ các bước sẽ hỗ trợ bạn rất nhiều cho việc quản lý dự án.
            <br />
            Nếu bạn thấy khó khăn có thể sử dụng các mẫu của chúng tôi.
          </p>
        </div>

      </div>

    </div>
  </div>
</template>

<script lang="ts" setup>
import { CreateProject_createProject } from '#apollo/mutations/__generated__/CreateProject'

const props = defineProps<{
  project: Omit<CreateProject_createProject, '__typename'>
}>()
</script>
