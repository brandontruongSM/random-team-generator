import { buildSchema } from "graphql"

const schema = buildSchema(`
    input UserInput {
        id: ID!
        firstName: String!
        lastName: String!
        preferredName: String!
        email: String!
        department: String!
        location: String!
        tenure: Int!
        isBackend: Boolean!
        isFrontend: Boolean!
        isDesigner: Boolean!
        isProduct: Boolean!
        isSenior: Boolean!
        isTeamLead: Boolean!
        isQualityAnalyst: Boolean!
        profilePic: String
    }

    type User {
        id: ID!
        firstName: String!
        lastName: String!
        preferredName: String!
        email: String!
        department: String!
        location: String!
        tenure: Int!
        isBackend: Boolean!
        isFrontend: Boolean!
        isDesigner: Boolean!
        isProduct: Boolean!
        isSenior: Boolean!
        isTeamLead: Boolean!
        isQualityAnalyst: Boolean!
        profilePic: String
    }

    type Team {
        name: String!
        users: [User]
    }

    type Mutation {
        createUser(input: UserInput): User
        updateUser(id: Int!, input: UserInput): User
    }

    type Query {
        getUser(id: String): User
        getUsers: [User]
        verifyHacker(email: String): User
        getTeam(id: String): Team
        getTeams: [Team]
    }
`)

export default schema