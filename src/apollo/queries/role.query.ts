import gql from 'graphql-tag'

export const GET_ROLES = gql`
  query GetRoles($filter: GetRolesInput!) {
    roles(filter: $filter) {
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
