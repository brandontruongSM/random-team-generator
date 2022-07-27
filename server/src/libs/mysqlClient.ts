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


export { getUserProfiles }