import gql from 'graphql-tag'

export const GET_PROJECTS = gql`
  query GetProjects($filter: GetMyProjectsFilter!) {
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

export const VERIFY_PROJECT = gql`
  query VerifyProject($filter: GetProjectFilter!) {
    studioProject(filter: $filter) {
      id
      logo
      name
      active
    }
  }
`

export const GET_PROJECT_INFO = gql`
  query GetProjectInfo($filter: GetProjectFilter!) {
    studioProject(filter: $filter) {
      id
      category {
        id
      }
      logo
      content
      cover
      estimate
      name
      technologies {
        id
        name
      }
      files
    }
  }
`

export const COUNT_PROJECTS = gql`
  query CountProjects($filter: StudioCountProjectsFilter!) {
    studioProjectsCount(filter: $filter)
  }
`
