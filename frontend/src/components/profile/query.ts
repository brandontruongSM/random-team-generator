import gql from 'graphql-tag'

export const VERIFY_HACKER_QUERY = gql`
query verifyHacker($email: String) {
  verifyHacker(email: $email) {
    id
    email
    firstName
    lastName
    department,
    location,
    preferredName,
    isFrontend,
    isBackend,
    isDesigner,
    isProduct,
    isSenior,
    isTeamLead,
  }
}
`
