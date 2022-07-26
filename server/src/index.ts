import { buildSchema } from "graphql"
import express from "express"
import { graphqlHTTP } from "express-graphql"
import _ from 'lodash'

const Chance = require('chance');
const chance = new Chance()

const users =  _.times(20, (i: number) => ({
    id: i,
    firstName: chance.name(),
    lastName: chance.name(),
    preferredName: chance.name(),
    email: chance.email(),
    department: chance.pickone(['Engineering', 'Marketing']),
    location: chance.pickone(['Sydney', 'Brisbane', 'Manila']),
    tenure: chance.integer(),
    isBackend:  chance.bool(),
    isFrontend:  chance.bool(),
    isDesigner:  chance.bool(),
    isProduct: chance.bool(),
    isSenior:  chance.bool(),
    isJunior: chance.bool(),
    teamID: i,
}))

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
    }
`)

type User = {
    id: number
    firstName: string
    lastName: string
    preferredName: string
    email: string
    department: string
    location: string
    tenure: number
    isBackend: boolean
    isFrontend: boolean
    isDesigner: boolean
    isProduct: boolean
    isSenior: boolean
    isJunior: boolean
    teamID: number

}

type UserInput = Pick<User, "firstName" | "lastName" | "preferredName" | "email" | "department" | "location" | "tenure" | "isBackend" | "isDesigner" | "isFrontend" | "isJunior" | "isProduct" | "isSenior" | "teamID">

const getUser = (args: { id: number }): User | undefined =>
    users.find((u: User) => u.id === args.id)

const getUsers = (): User[] => users

const createUser = (args: { input: UserInput }): User => {
    const user = {
        id: users.length + 1,
        ...args.input,
    }
    users.push(user)

    return user
}

const updateUser = (args: { user: User }): User => {
    const index = users.findIndex((u: User) => u.id === args.user.id)
    const targetUser = users[index]

    if (targetUser) users[index] = args.user

    return targetUser
}

const root = {
    getUser,
    getUsers,
    createUser,
    updateUser,
}


const app = express()

app.use(
    "/graphql",
    graphqlHTTP({
        schema: schema,
        rootValue: root,
        graphiql: true,
    })
)

const PORT = 8000

app.listen(PORT)

console.log(`Running a GraphQL API server at http://localhost:${PORT}/graphql`)
