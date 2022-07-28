import express from "express"
import { graphqlHTTP } from "express-graphql"

import root from './root'
import schema from './schema'

const cors = require('cors');
const app = express()
app.use(cors());
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
