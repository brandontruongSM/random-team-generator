import gql from 'graphql-tag'

//@TODO CREATE FRAGMENT FOR THE USER PROFILE
export const GET_USERS_QUERY = gql`
query getUsers {
  getUsers {
    id,
    department,
    location
  }
}
`