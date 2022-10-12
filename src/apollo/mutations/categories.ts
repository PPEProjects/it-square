import gql from 'graphql-tag'

export const CREATE_CATEGORIES = gql`
    mutation CreateCategory($input: CreateCategoryInput!) {
        createCategory(input: $input) {
            id
            content
            slug
            avatar
            name
            primary
        }
    }
`

export const UPDATE_CATEGORY = gql`
    mutation UpdateCategory($input: UpdateCategoryInput!) {
        updateCategory(input: $input) {
            id
            content
            avatar
            name
            primary
        }
    }
`

export const DELETE_CATEGORY = gql`
    mutation RemoveCategory($input: DeleteCategoryInput!) {
        removeCategory(input: $input) {
            id
            slug
        }
    }
`
