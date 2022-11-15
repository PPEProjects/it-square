import {
  StudioCountProjectsFilter
} from '#apollo/__generated__/types'
import { WatchQueryFetchPolicy } from '@apollo/client'
import {
  CountProjects,
  CountProjectsVariables
} from '#apollo/queries/__generated__/CountProjects'
import { COUNT_PROJECTS } from '#apollo/queries/project.query'

interface Props {
  filter?: Partial<StudioCountProjectsFilter>
  fetchPolicy?: WatchQueryFetchPolicy
}

export const useProjectCounter = (props?: Props) => {
  const defaultFilter: StudioCountProjectsFilter = {
    name: '',
    active: []
  }

  const filter = reactive<StudioCountProjectsFilter>({
    ...defaultFilter,
    ...props?.filter
  })

  const _filter = computed<CountProjectsVariables>(() => ({
    filter: filter
  }))

  const { result, loading } = useQuery<CountProjects, CountProjectsVariables>(
    COUNT_PROJECTS,
    _filter,
    {
      debounce: 300,
      fetchPolicy: 'network-only'
    }
  )

  const count = computed(() => result.value?.studioProjectsCount || 0)

  return {
    filter,
    count,
    loading
  }
}
