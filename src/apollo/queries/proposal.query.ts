import gql from 'graphql-tag'

export const GET_PROPOSALS = gql`
  query GetProposals($filter: GetProposalsFilter!) {
    proposals(filter: $filter) {
      id
      letter
      note
      resume
      role {
        id
        name
        permissions
      }
      status
      updatedAt
      user {
        id
        name
        avatar
      }
    }
  }
`
