const dbConnection = require('../config/db')

const getAllListingsFromDB = () => {
  return new Promise((resolve, reject) => {
    dbConnection.query({
        sql: `select * from listings`
    },(err, result) => {
        if(err){
            reject(err)
        }
        resolve(result)

    })
  })
}

  const updateListingsInDB = (data,type ) => {
     return new Promise ((resolve, reject) => {
       dbConnection.query({
        sql: `update users set ${data}, modified_at = current_timestamp where type = ?`,
        values: [type]
       }, (err, result)=> {
       if(err){
        return reject(err)
       }
       resolve(result)
       })
     })
  }



module.exports = {getAllListingsFromDB, updateListingsInDB }