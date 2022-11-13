import gql from 'graphql-tag'

export const GET_PROJECTS = gql`
  query GetProjects($filter: GetProjectsFilter!) {
    studioProjects(filter: $filter) {
      id
      name
      active
      status
      createdAt
      slug
      category {
        id
        name
        slug
      }
      roles {
        id
        name
        permissions
        user {
          id
          name
          slug
        }
      }
    }
  }
`

export const COUNT_PROJECTS = gql`
  query CountProjects($filter: CountProjectsFilter!) {
    studioProjectsCount(filter: $filter)
  }
`
