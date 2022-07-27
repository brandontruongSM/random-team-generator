import gql from 'graphql-tag'
export const GET_Teams_QUERY = gql`
query getTeams {
    getTeams {
      name
      users {
        firstName
        email
        lastName
        teamID
      }
    }
  }
`