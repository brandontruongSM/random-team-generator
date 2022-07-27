import { User, UserInput, Team } from '../schema/types'
import _ from 'lodash'
import { getEmployee } from './bamboo/getEmployees'
import { getUserProfiles, createUserProfile } from '../libs/mysqlClient'

const criteria = {
  minimumNumberOfMembers: 5,
  numberOfBackendDev: 1,
  numberOfFrontendDev: 1,
  numberOfQA: 1,
  numberOfDesigner: 1,
  numberOfTeamLead: 1,
}

const Chance = require('chance');
const chance = new Chance()

const generatingTeams = (users: User[]): Team[] => {
  const teams: Team[] = []
  _.times(Math.floor(users.length / criteria.minimumNumberOfMembers), (i: number) => {
    const frontEndDevs: User[] = []
    _.times(criteria.numberOfFrontendDev, () => {
        const foundIndex =  _.findIndex(users, (user) => {
            return (user.isFrontend)
        }) 
        if (foundIndex >= 0) {
            frontEndDevs.push(users[foundIndex])
            users.splice(foundIndex,1)
        }
    }) 
    const backEndDevs: User[] = []
    _.times(criteria.numberOfBackendDev, () => {
        const foundIndex =  _.findIndex(users, (user) => {
            return (user.isBackend)
        }) 
        if (foundIndex >= 0) {
          backEndDevs.push(users[foundIndex])
          users.splice(foundIndex,1)
        }
    }) 
    const qaDevs: User[] = []
    _.times(criteria.numberOfQA, () => {
        const foundIndex =  _.findIndex(users, (user) => {
            return (user.isQualityAnalyst)
        }) 
        if (foundIndex >= 0) {
          qaDevs.push(users[foundIndex])
          users.splice(foundIndex,1)
        }
    }) 
    const designers: User[] = []
    _.times(criteria.numberOfDesigner, () => {
        const foundIndex =  _.findIndex(users, (user) => {
          return (user.isDesigner)
        }) 
        if (foundIndex >= 0) {
          designers.push(users[foundIndex])
          users.splice(foundIndex,1)
        }
    }) 
    const teamLeads: User[] = []
    _.times(criteria.numberOfTeamLead, () => {
        const foundIndex =  _.findIndex(users, (user) => {
            return (user.isTeamLead)
        }) 
        if (foundIndex >= 0) {
          teamLeads.push(users[foundIndex])
          users.splice(foundIndex,1)
        }
    }) 

    if (frontEndDevs.length + backEndDevs.length + qaDevs.length + designers.length + teamLeads.length >= criteria.minimumNumberOfMembers) {
      teams.push({
        id: i,
        name: chance.name(),
        users: [...frontEndDevs, ...backEndDevs, ...qaDevs, ...designers, ...teamLeads]
      })
    }
  })
  return teams
}


// const getUser = (args: { id: number }): User | undefined =>
//     users.find((u: User) => u.id === args.id)

const getUsers = async () => {
    return await getUserProfiles()
}

// const getTeam = (args: { id: number }): Team | undefined =>
//     teams.find((u: Team) => u.id === args.id)

const getTeams = async () => {
  const users = await getUserProfiles()
  return generatingTeams(users as User[])
} 

const createUser = async (args: { input: UserInput }) => {
    const id = await createUserProfile(args.input)

    return {
        ...args.input,
        id
    } as User
}

const verifyHacker = async (args: { email: string}) => {
    // @TODO CHECK FIRST IF USER ALREADY EXISTS ON DB
    const employee = await getEmployee(args.email)
    
    if (!employee) {
        throw Error('Hacker does not exists!!')
    }

    return employee
}

// const updateUser = (args: { user: User }): User => {
//     const index = users.findIndex((u: User) => u.id === args.user.id)
//     const targetUser = users[index]

//     if (targetUser) users[index] = args.user

//     return targetUser
// }

const root = {
    // getUser,
    getUsers,
    // getTeam,
    getTeams,
    createUser,
    // updateUser,
    verifyHacker,
}

export default root