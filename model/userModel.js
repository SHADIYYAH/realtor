const dbConnection = require("../config/db")

const getUserFromDB = (email)=>{
    return new Promise((resolve, reject)=> {
        dbConnection.query({
            sql: `select * from users where email = ?`,
            values: [email]
        }, (err, result)=> {
            if(err) {
             return   reject (err)
            }
            resolve (result)

        })
    })
}

const getAllUsersFromDB = ()=> {
    return new Promise((resolve, reject)=> {
        dbConnection.query({
            sql: `SELECT * FROM users`
        }, (err, result)=>{
            if(err){
                reject (err)
            }
            resolve (result)
        })
    })
}

module.exports = { getUserFromDB, getAllUsersFromDB }


