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
        isJunior: Boolean!
        teamID: Int!
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
        isJunior: Boolean!
        teamID: Int!
    }

    type Mutation {
        createUser(input: UserInput): User
        updateUser(id: Int!, input: UserInput): User
    }

    type Query {
        getUser(id: String): User
        getUsers: [User]
        verifyHacker(email: String): User
    }
`)

export default schema