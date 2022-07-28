import gql from 'graphql-tag'
export const GET_Teams_QUERY = gql`
query getTeams($refresh: Boolean!) {
    getTeams(refresh: $refresh) {
     name
      captainId
      users
      {
        id
        firstName
        email
        lastName
        profilePic
        isTeamLead
        isBackend
        isFrontend
        isDesigner
        isProduct
        isSenior
        isQualityAnalyst
      }
    }
  }
`