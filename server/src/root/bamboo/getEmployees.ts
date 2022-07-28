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
    id: 0,
    firstName: employee.firstName,
    lastName: employee.lastName,
    preferredName: employee.displayName ?? '',
    department: employee.department, 
    location: '',
    profilePic: employee.photoUrl,
    email: employee.workEmail,
    tenure: 0,
    //@TODO MAKE IT AS A FUNCTION
    isBackend:  employee?.jobTitle?.includes('Software Engineer'),
    isFrontend:  employee?.jobTitle?.includes('Front End') || employee?.jobTitle?.includes('Software Engineer'),
    isDesigner:  employee?.jobTitle?.includes('Designer'),
    isProduct: employee?.jobTitle?.includes('Product'),
    isSenior:  employee.jobTitle.includes('Senior'),
    isTeamLead: employee?.jobTitle?.includes('Technical Lead'),
    isQualityAnalyst: employee?.jobTitle?.includes('Quality Engineer'),
  } as User
}