import { User, UserInput } from "../schema/types";

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
            return
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

const getUserProfile = (email: string) => {
  return new Promise((resolve, reject) => {
    pool.query(
        'select * from UserProfile WHERE email = ?', email,
        (err: any, response: any) => {   
          if(err) {
            reject(new Error("Error rows is undefined"));
          } else {
            if (response.length ===  0) {
              resolve(null)
              return
            }

            const userProfile = response[0]
            const result = {
              id: userProfile?.UserID,
              firstName: userProfile.FirstName,
              lastName: userProfile.LastName,
              preferredName: userProfile.PreferredName,
              email: userProfile?.Email,
              department: userProfile?.Department,
              location: userProfile?.Location,
              tenure: userProfile?.Tenure,
              isBackend: userProfile?.isBackend,
              isFrontend: userProfile?.isFrontend,
              isDesigner: userProfile?.isDesigner,
              isProduct: userProfile?.isProduct,
              isSenior: userProfile?.isSenior,
              isTeamLead: userProfile?.isTeamLead,
              isQualityAnalyst: userProfile?.isQualityAnalyst,
              profilePic: userProfile?.ProfilePic,
            }

            console.log(result, 'result')
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

const updateUserProfile = (id: number, user: UserInput) => {
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
    pool.query('UPDATE UserProfile SET ? WHERE UserID = ?', [payload, id], (err: any, response: any) => {
      if (err) {
        reject(new Error('Cannot update User Profile'))

        return
      }

      resolve(payload)
    })
  })
}


export { getUserProfiles, createUserProfile, updateUserProfile, getUserProfile }