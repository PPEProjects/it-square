import gql from "graphql-tag";

export const GET_PLATFORMS = gql`
    query GetPlatforms {
        platforms {
            id
            content
            name
            slug
            children {
                id
                name
                slug
                content
            }
        }
    }
`
