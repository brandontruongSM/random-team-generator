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
    tenure
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

export const UPDATE_USER_PROFILE_MUTATION = gql `mutation updateUserProfile($id: Int!, $input: UserInput!) {
  updateUser(id: $id, input: $input) {
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

