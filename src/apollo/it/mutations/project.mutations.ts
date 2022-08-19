import gql from 'graphql-tag'

export const UPSERT_PROJECT = gql`
    mutation Upsert_project($input: UpsertProject!) {
        upsert_project(input: $input) {
            id
            name
        }
    }
`
