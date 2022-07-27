import gql from 'graphql-tag'

//@TODO CREATE FRAGMENT FOR THE USER PROFILE
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
    isQualityAnalyst,
    profilePic
  }
}
`

export const CREATE_USER_PROFILE_MUTATION = gql `mutation createUserProfile($input: UserInput!) {
  createUser(input: $input) {
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
    profilePic
  }
}`
