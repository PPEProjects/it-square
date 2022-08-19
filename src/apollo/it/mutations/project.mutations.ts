import gql from 'graphql-tag'

/**
 * mutation/query {name} sẽ tạo ra interface tương ứng
 * => interface chỉ nên sử dụng "camelCase", "PascalCase" không nên sử dụng "underscore"
 * eslint @typescript-eslint/naming-convention
 * Upsert_project => UpsertProject (trùng tên input) => UpsertProjectMutation
 */
export const UPSERT_PROJECT = gql`
    mutation UpsertProjectMutation($input: UpsertProject!) {
        upsert_project(input: $input) {
            id
            name
        }
    }
`
