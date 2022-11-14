<template>
  <div>
    <project-basic-form ref="projectRef" />

    <teleport-view to="#actions">
      <a-button type="primary" @click="newProject">
        <div class="flex items-center">
          <i-ic-baseline-check />
          <span class="ml-1">Submit</span>
        </div>
      </a-button>
    </teleport-view>
  </div>
</template>

<script lang="ts" setup>
import { CreateProjectInput } from '#apollo/__generated__/types'
import { CREATE_PROJECT } from '#apollo/mutations/project.mutate'
import {
  CreateProject,
  CreateProjectVariables
} from '#apollo/mutations/__generated__/CreateProject'

const projectRef = ref()

const { mutate: createProject } = useMutation<
  CreateProject,
  CreateProjectVariables
>(CREATE_PROJECT)

const router = useRouter()
const newProject = async () => {
  try {
    const input: CreateProjectInput = await projectRef.value?.submitForm()
    const res = await createProject({ input })
    if(res?.data?.createProject) {
      await router.push(`/projects/${res.data.createProject.id}`)
    }
  } catch (e) {
    //
  }
}
</script>

<style scoped></style>
