import { User, UserInput, Team } from '../schema/types'
import _ from 'lodash'
import { getEmployee } from './bamboo/getEmployees'
import { getUserProfiles, createUserProfile, getUserProfile, updateUserProfile } from '../libs/mysqlClient'

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

let generatedTeams: Team[] = []

const generatingTeams = (users: User[]): Team[] => {
  const specialTeam: Team = {
    id: 0,
    name: 'Siteminder',
    users: [],
    captainId: 0
  } 
  const sankarIndex =  users.findIndex(user => user.email === 'sankar.narayan@siteminder.com')
  specialTeam.users.push(users[sankarIndex])
  specialTeam.captainId = users[sankarIndex].id
  users.splice(sankarIndex, 1)

  const mikeIndex = users.findIndex(user => user.email === 'mike.rogers@siteminder.com') 
  specialTeam.users.push(users[mikeIndex])
  users.splice(mikeIndex, 1)

  const mattIndex = users.findIndex(user => user.email === 'matt.hyne@siteminder.com') 
  specialTeam.users.push(users[mattIndex])
  users.splice(mattIndex, 1)

  const simonIndex = users.findIndex(user => user.email === 'simon.martin@siteminder.com') 
  specialTeam.users.push(users[simonIndex])
  users.splice(simonIndex, 1)

  const johnnyIndex = users.findIndex(user => user.email === 'johnny.estilles@siteminder.com') 
  specialTeam.users.push(users[johnnyIndex])
  users.splice(johnnyIndex, 1)
 
  const teams: Team[] = [specialTeam]
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
      const users = [...frontEndDevs, ...backEndDevs, ...qaDevs, ...designers, ...teamLeads]
      teams.push({
        id: i,
        name: chance.animal(),
        captainId: _.shuffle(users).find(user => user.isTeamLead)!.id,
        users: users
      })
    }
  })

  generatedTeams = teams
  return teams
}


// const getUser = (args: { id: number }): User | undefined =>
//     users.find((u: User) => u.id === args.id)

const getUsers = async () => {
    return await getUserProfiles()
}

// const getTeam = (args: { id: number }): Team | undefined =>
//     teams.find((u: Team) => u.id === args.id)

const getTeams = async (args: { refresh: boolean }) => {

  if (args.refresh || generatedTeams.length === 0) {
    const users = await getUserProfiles()
    return generatingTeams(_.shuffle(users as User[]))
  }

  return generatedTeams
} 

const createUser = async (args: { input: UserInput }) => {
    const id = await createUserProfile(args.input)

    return {
        ...args.input,
        id
    } as User
}

const verifyHacker = async (args: { email: string}) => {
    let userProfile = null
    userProfile = await getUserProfile(args.email)
    if (!userProfile) {
        userProfile = await getEmployee(args.email)
    }

    if (!userProfile) {
        throw Error('Hacker does not exists!!')
    }

    return userProfile
}

const updateUser = async (args: { id: number, input: UserInput }) => {
    await updateUserProfile(args.id, args.input)

    return {
        id: args.id,
        ...args.input,
    } as User
}

const root = {
    // getUser,
    getUsers,
    // getTeam,
    getTeams,
    createUser,
    updateUser,
    verifyHacker,
}

export default root