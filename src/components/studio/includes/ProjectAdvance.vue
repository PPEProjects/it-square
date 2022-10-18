<template>
  <a-spin :spinning="loading">
    <div class="h-full">
      <h3 class="mb-0 text-[26px] font-semibold">
        {{ projectData?.name || '--' }}
      </h3>

      <div class="mt-4 flex">
        <div class="w-1/2 pr-3">
          <custom-project-step
            :value="projectData?.steps"
            :project="project.id"
          />
        </div>

        <div class="w-1/2 border-l border-gray-100 pl-5">
          <h4 class="mb-0 text-[18px] font-semibold text-gray-600">
            Phân quyền dự án
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
              Việc thiết lập đầy đủ các bước sẽ hỗ trợ bạn rất nhiều cho việc
              quản lý dự án.
              <br />
              Nếu bạn thấy khó khăn có thể sử dụng các mẫu của chúng tôi.
            </p>
          </div>
        </div>
      </div>
    </div>
  </a-spin>
</template>

<script lang="ts" setup>
import { CreateProject_createProject } from '#apollo/mutations/__generated__/CreateProject'
import { GET_PROJECT_ADVANCE } from '#apollo/queries/projects'
import {
  GetProjectAdvance,
  GetProjectAdvanceVariables
} from '#apollo/queries/__generated__/GetProjectAdvance'

const props = defineProps<{
  project: Omit<CreateProject_createProject, '__typename'>
}>()

const { result, loading } = useQuery<
  GetProjectAdvance,
  GetProjectAdvanceVariables
>(GET_PROJECT_ADVANCE, {
  project: props.project.slug
})

const projectData = computed(() => result?.value?.project)
</script>
