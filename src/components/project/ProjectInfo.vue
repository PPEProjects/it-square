<template>
  <a-spin :spinning="loading">
    <project-basic-form ref="formRef"></project-basic-form>
  </a-spin>
</template>

<script lang="ts" setup>
import { ProjectFormInstance } from '@utils/types'
import { GET_PROJECT_INFO } from '#apollo/queries/project.query'
import {
  GetProjectInfo,
  GetProjectInfoVariables
} from '#apollo/queries/__generated__/GetProjectInfo'
import { CreateProjectInput } from '#apollo/__generated__/types'

const formRef = ref<ProjectFormInstance>()

const router = useRouter()
const { loading, onResult } = useQuery<GetProjectInfo, GetProjectInfoVariables>(
  GET_PROJECT_INFO,
  {
    filter: {
      id: router.currentRoute.value.params.id as string
    }
  }
)
onResult((result) => {
  const _clone = JSON.parse(JSON.stringify(result.data.studioProject))
  delete _clone.__typename
  delete _clone.id
  const _form: CreateProjectInput = {
    ..._clone,
    category: _clone.category.id,
    technologies: _clone.technologies.map((item: any) => item.id)
  }
  formRef.value?.setTechs(
    _clone.technologies.map((item: any) => ({ value: item.id, label: item.name }))
  )
  formRef.value?.setForm(_form)
})
</script>

<style scoped></style>
