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
    isTeamLead: boolean
    isQualityAnalyst: boolean
    profilePic: string
}

export type UserInput = Pick<User, "firstName" | "lastName" | "preferredName" | "email" | "department" | "location" 
    | "tenure" | "isBackend" | "isDesigner" | "isFrontend" | "isTeamLead" | "isProduct" | "isSenior" | "isTeamLead"
    | "isQualityAnalyst" | "profilePic">

export type Team = {
    id: number
    name: string
    captainId: number
    users: User[]
}
