<template>
  <a-spin :spinning="loading">
    <project-basic-form ref="formRef"></project-basic-form>
  </a-spin>

  <teleport-view to="#actions">
    <a-button type="danger">
      <div class="flex items-center">
        <i-material-symbols-delete-rounded />
        <span class="ml-1">Xoá</span>
      </div>
    </a-button>

    <a-button
      type="primary"
      class="ml-4"
      :loading="loadingUpdate"
      @click="updateInfo"
    >
      <template #icon>
        <i-ic-baseline-check />
      </template>
      <span class="ml-1">Cập Nhật</span>
    </a-button>
  </teleport-view>
</template>

<script lang="ts" setup>
import { ProjectFormInstance } from '@utils/types'
import { GET_PROJECT_INFO } from '#apollo/queries/project.query'
import {
  GetProjectInfo,
  GetProjectInfoVariables
} from '#apollo/queries/__generated__/GetProjectInfo'
import { CreateProjectInput } from '#apollo/__generated__/types'
import {
  UpdateProjectInfo,
  UpdateProjectInfoVariables
} from '#apollo/mutations/__generated__/UpdateProjectInfo'
import { UPDATE_PROJECT_INFO } from '#apollo/mutations/project.mutate'

const formRef = ref<ProjectFormInstance>()

const router = useRouter()
const { loading, result } = useQuery<GetProjectInfo, GetProjectInfoVariables>(
  GET_PROJECT_INFO,
  {
    filter: {
      id: router.currentRoute.value.params.id as string
    }
  }
)
watch(
  result,
  () => {
    if (result.value?.studioProject) {
      const _clone = JSON.parse(JSON.stringify(result.value.studioProject))
      delete _clone.__typename
      delete _clone.id
      const _form: CreateProjectInput = {
        ..._clone,
        category: _clone.category.id,
        technologies: _clone.technologies.map((item: any) => item.id)
      }
      nextTick(() => {
        formRef.value?.setTechs(
          _clone.technologies.map((item: any) => ({
            value: item.id,
            label: item.name
          }))
        )
        formRef.value?.setForm(_form)
      })
    }
  },
  { immediate: true }
)

// update info
const loadingUpdate = ref(false)
const { mutate: updateInfoMutaion } = useMutation<
  UpdateProjectInfo,
  UpdateProjectInfoVariables
>(UPDATE_PROJECT_INFO)
const updateInfo = async () => {
  loadingUpdate.value = true
  try {
    const input: CreateProjectInput = await formRef.value!.submitForm()
    await updateInfoMutaion({
      input: {
        ...input,
        id: router.currentRoute.value.params.id as string
      }
    })
  } catch (e) {
    console.log(e)
    //
  }
  loadingUpdate.value = false
}
</script>

<style scoped></style>
