import express from "express"
import { graphqlHTTP } from "express-graphql"

import root from './root'
import schema from './schema'

// const mysql = require('mysql');
// const pool = mysql.createPool({
//     host     : 'randomteamgendb.cfni24qvajia.us-west-2.rds.amazonaws.com',
//     user     : 'admin',
//     password : 'admin1234',
//     database : 'RandomTeamGenDB'
//   });

// pool.getConnection((err: any, connection: any) => {
//     if(err) throw err;
//     console.log('connected as id ' + connection.threadId);
//     connection.query('select * from UserProfile', (err: any, rows: any) => {
//         connection.release(); // return the connection to pool
//         if(err) throw err;
//         console.log('The data from users table are: \n', rows);
//     });
// });

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
