<template>
  <a-spin :spinning="loading">
    <div class="h-full">
      <h3
        class="mb-0 flex items-center border-b border-gray-100 pb-2 text-[26px] font-semibold"
      >
        <button class="mr-2 text-[15px] text-gray-400">
          <i-material-symbols-arrow-back />
        </button>
        {{ projectData?.name || '--' }}
        <a-button
          type="primary"
          class="ml-auto flex items-center"
          @click="$emit('next')"
        >
          <span>Bước Tiếp Theo</span>
        </a-button>
      </h3>

      <div class="mt-5 flex">
        <div class="w-1/2 pr-3">
          <custom-project-step
            :value="projectData?.steps"
            :project="project.id"
          />
        </div>

        <div class="w-1/2 border-l border-gray-100 pl-5">
          <custom-project-roles />
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

defineEmits<{
  (e: 'next'): void
}>()
</script>
