import gql from 'graphql-tag'

export const CREATE_CATEGORIES = gql`
    mutation CreateCategory($input: CreateCategoryInput!) {
        createCategory(input: $input) {
            id
            content
            avatar
            name
            primary
        }
    }
`
