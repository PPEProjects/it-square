import { GetMyProjectsFilter } from '#apollo/__generated__/types'
import {
  GetProjects,
  GetProjectsVariables
} from '#apollo/queries/__generated__/GetProjects'
import { GET_PROJECTS } from '#apollo/queries/project.query'
import { WatchQueryFetchPolicy } from '@apollo/client'

export interface UseProjectProps {
  filter?: Partial<GetMyProjectsFilter>
  fetchPolicy?: WatchQueryFetchPolicy
}

export const useProjects = (props?: UseProjectProps) => {
  const defaultFilter: GetMyProjectsFilter = {
    name: '',
    limit: 7,
    offset: 0,
    sort: 'createdAt',
    active: []
  }

  const filter = reactive<GetMyProjectsFilter>({
    ...defaultFilter,
    ...props?.filter
  })

  const _filter = computed<GetProjectsVariables>(() => ({
    filter: filter
  }))

  const { result: projectsResult, loading } = useQuery<
    GetProjects,
    GetProjectsVariables
  >(GET_PROJECTS, _filter, {
    debounce: 300,
    fetchPolicy: props?.fetchPolicy
  })

  const projects = computed(() => projectsResult.value?.studioProjects || [])

  return {
    filter,
    projects,
    loading
  }
}
