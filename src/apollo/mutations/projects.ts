import gql from 'graphql-tag'

export const CREATE_PROJECT = gql`
  mutation CreateProject($input: CreateProjectInput!) {
    createProject(input: $input) {
      id
      name
      slug
    }
  }
`

export const CREATE_STEPS = gql`
  mutation CreateSteps($input: CreateStepsInput!) {
    createSteps(input: $input) {
      id
      name
      status
      order
    }
  }
`

export const CHECK_STEP = gql`
  mutation CheckStep($input: CheckStepInput!) {
    checkStep(input: $input) {
      id
      name
      content
      status
    }
  }
`

export const SORT_STEPS = gql`
  mutation SortSteps($input: SortStepsInput!) {
    sortSteps(input: $input) {
      id
      name
      content
      order
    }
  }
`
