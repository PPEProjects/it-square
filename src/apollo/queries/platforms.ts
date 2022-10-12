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


export const GET_TECHNOLOGIES = gql`
    query GetTechnologies {
        technologies {
            id
            name
            slug
        }
    }
`
