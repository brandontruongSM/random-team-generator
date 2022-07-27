export type User = {
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

export type UserInput = Pick<User, "firstName" | "lastName" | "preferredName" | "email" | "department" | "location" | "tenure" | "isBackend" | "isDesigner" | "isFrontend" | "isJunior" | "isProduct" | "isSenior" | "teamID">
