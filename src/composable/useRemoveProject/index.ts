import {
  RemoveProject,
  RemoveProjectVariables
} from '#apollo/mutations/__generated__/RemoveProject'
import { REMOVE_PROJECT } from '#apollo/mutations/project.mutate'

export const useRemoveProject = () => {
  const apollo = useApollo()
  // Xoá dự án
  const {
    mutate,
    loading,
    onDone: afterDelete
  } = useMutation<RemoveProject, RemoveProjectVariables>(REMOVE_PROJECT)

  afterDelete((val) => {
    if (val.data?.removeProject) {
      apollo.cache.evict({
        id: `Project:${val.data.removeProject.id}`
      })
    }
  })

  const handle = async (id: string) => mutate({ input: { id } })

  return {
    loading,
    handle
  }
}
