import gql from 'graphql-tag'

export const CREATE_PROJECT = gql`
  mutation CreateProject($input: CreateProjectInput!) {
    createProject(input: $input) {
      id
      slug
    }
  }
`

export const UPDATE_PROJECT_INFO = gql`
  mutation UpdateProjectInfo($input: UpdateProjectInput!) {
    updateProject(input: $input) {
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

export const CREATE_ROLE = gql`
  mutation CreateRole($input: CreateRoleInput!) {
    createRole(input: $input) {
      id
      name
      permissions
      createdAt
      user {
        id
        name
        avatar
      }
    }
  }
`

export const UPDATE_ROLE = gql`
  mutation UpdateRole($input: UpdateRoleInput!) {
    updateRole(input: $input) {
      id
      name
      permissions
      user {
        id
        name
        avatar
      }
    }
  }
`

export const REMOVE_ROLE = gql`
  mutation RemoveRole($input: RemoveRoleInput!) {
    removeRole(input: $input) {
      id
    }
  }
`

export const REMOVE_PROJECT = gql`
  mutation RemoveProject($input: RemoveProjectInput!) {
    removeProject(input: $input) {
      id
    }
  }
`
