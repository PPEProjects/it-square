import gql from "graphql-tag";

export const GET_PROJECT_ADVANCE = gql`
    query GetProjectAdvance($project: String!) {
        project(project: $project) {
            id
            name
            steps {
                id
                name
                status
                order
                content
            }
            roles {
                id
                name
                permissions
            }
        }
    }
`
