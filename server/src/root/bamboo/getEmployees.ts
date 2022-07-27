import axios from 'axios'
import _ from 'lodash'
import { User } from '../../schema/types'

const bambooApiUrl = 'https://api.bamboohr.com/api/gateway.php/siteminder/v1'

export const getEmployees = async () => {
  // @TODO CREATE THE TYPE FOR THE RESPONSE
  const res = await axios.get(`${bambooApiUrl}/employees/directory`, {
    // @TODO store AUTHORIZATION value in .env or something similar
    headers: {
      'Authorization': 'Basic N2NjNWQyMmJhMTg4YTA2YmQwMDMyNDQ1NDI2Y2ZkNWEwZmY1ZDRjNjo=',
      'subdomain': 'siteminder',
      'Accept': 'application/json'
    }
  })

  return res?.data.employees || [];
}

export const getEmployee = async (email: string) => {
  const employees = await getEmployees()

  const employee = _.find(employees, ['workEmail', email])

  if (!employee) {
    return null
  }

  // build the user to match our types
  return {
    id: employee.id,
    firstName: employee.firstName,
    lastName: employee.lastName,
    preferredName: employee.preferredName || '',
    department: employee.department, 
    location: '',
    email: employee.workEmail,
    tenure: 0,
    isBackend:  false,
    isFrontend:  false,
    isDesigner:  false,
    isProduct: false,
    isSenior:  false,
    isJunior: false,
    isTeamLead: false,
    teamID: 0,
  } as User
}