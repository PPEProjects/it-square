import gql from 'graphql-tag'

export const GET_TECHNOLOGY = gql`
  query GetTechnologies($filter: GetTechnologiesFilter!) {
    technologies(filter: $filter) {
      id
      name
    }
  }
`
