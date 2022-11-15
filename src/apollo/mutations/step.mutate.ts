import gql from 'graphql-tag'

export const CREATE_STEP = gql`
  mutation CreateStep($input: CreateStepInput!) {
    createStep(input: $input) {
      id
      name
      content
      status
    }
  }
`
