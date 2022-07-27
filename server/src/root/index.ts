import { User, UserInput} from '../schema/types'
import _ from 'lodash'
import { getEmployee } from './bamboo/getEmployees'

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

const verifyHacker = async (args: { email: string}) => {
    const employee = await getEmployee(args.email)
    
    if (!employee) {
        throw Error('Hacker does not exists!!')
    }

    return employee
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
    verifyHacker,
}

export default root