import gql from 'graphql-tag'

export const SIGN_IN = gql`
    mutation SignIn($input: LogInInput) {
        log_in(input: $input) {
            user {
                id
                name
                email
            }
            token
        }
    }
`

export const SIGN_UP = gql`
    mutation SignUp($input: SignUpInput) {
        sign_up(input: $input) {
            token
            user {
                id
                name
                email
            }
        }
    }
`
