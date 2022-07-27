import { UserInput } from "../schema/types";

const mysql = require('mysql');

const pool = mysql.createPool({
    host     : 'randomteamgendb.cfni24qvajia.us-west-2.rds.amazonaws.com',
    user     : 'admin',
    password : 'admin1234',
    database : 'RandomTeamGenDB'
  });


const getUserProfiles = () => {
  return new Promise((resolve, reject) => {
    pool.query(
        'select * from UserProfile',
        (err: any, response: any) => {   
          if(err) {
            reject(new Error("Error rows is undefined"));
          } else {
            const result = response.map((row: any) => {
              return {
                id: row.ID,
                firstName: row.FirstName,
                lastName: row.LastName,
                preferredName: row.PreferredName,
                email: row?.Email,
                department: row?.Department,
                location: row?.Location,
                tenure: row?.Tenure,
                isBackend: row?.isBackend,
                isFrontend: row?.isFrontend,
                isDesigner: row?.isDesigner,
                isProduct: row?.isProduct,
                isSenior: row?.isSenior,
                isTeamLead: row?.isTeamLead,
                isQualityAnalyst: row?.isQualityAnalyst,
                profilePic: row?.ProfilePic,
              }
            })
            resolve(result);
          }                                           
        }
    )}
  )
}

const createUserProfile = (user: UserInput) => {
  return new Promise((resolve, reject) => {
    const payload = {
      FirstName: user.firstName,
      LastName: user.lastName,
      Email: user.email,
      Department: user.department,
      Location: user.location,
      Tenure: user.tenure,
      PreferredName: user.preferredName,
      ProfilePic: user.profilePic,
      isFrontend: user.isFrontend,
      isBackend: user.isBackend,
      isProduct: user.isProduct,
      isDesigner: user.isDesigner,
      isSenior: user.isSenior,
      isTeamLead: user.isTeamLead,
      isQualityAnalyst: user.isQualityAnalyst,
    }
    pool.query('INSERT INTO UserProfile SET ?', payload, (err: any, response: any) => {
      if (err) {
        reject(new Error('Cannot insert User Profile'))
      }

      resolve(response.insertId)
    })
  })
}


export { getUserProfiles, createUserProfile }