import { ApproveProjectInput, ProjectActive } from '#apollo/__generated__/types'
import {
  ApproveProject,
  ApproveProjectVariables
} from '#apollo/mutations/__generated__/ApproveProject'
import { APPROVE_PROJECT } from '#apollo/mutations/project.mutate'

export const useApprove = () => {

  const route = useRoute()
  const apollo = useApollo()
  // Đổi trạng thái dự án
  const show = ref(false)

  const options = ref([
    {
      value: ProjectActive.ACTIVE,
      label: 'Hoạt Động'
    },
    {
      value: ProjectActive.DRAFT,
      label: 'Bản Nháp'
    },
    {
      value: ProjectActive.DISABLED,
      label: 'Bị Khóa'
    }
  ])

  const form = ref<ApproveProjectInput>({
    id: '',
    active: ProjectActive.ACTIVE
  })

  const open = (project: ApproveProjectInput) => {
    form.value = JSON.parse(JSON.stringify(project))
    show.value = true
  }

  const { mutate, loading, onDone } = useMutation<
      ApproveProject,
      ApproveProjectVariables
      >(APPROVE_PROJECT)

  onDone(() => {
    const tab = String(route.query.tab || '')
    if(tab.toUpperCase() !== form.value.active) {
      apollo.cache.evict({
        id: `Project:${form.value.id}`
      })
    }
  })

  const handle = async () => {
    show.value = false
    mutate({
      input: {
        id: form.value.id,
        active: form.value.active
      }
    })
  }

  return {
    open,
    show,
    options,
    form,
    handle,
    loading
  }
}
