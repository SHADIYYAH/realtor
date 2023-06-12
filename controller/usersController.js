const dbConnection = require("../config/db")
const userValidation = require("../validation/usersValidation")
const {getUserFromDB, getAllUsersFromDB, updateUserInDB} = require("../model/userModel")
const {v4:uuidv4}= require("uuid")

const newUser = async(req, res)=> {
    const { username, password, email, phone} = req.body
    
    const { error, value } = userValidation(req.body)
    if(error !== undefined) {
         res.status(400).json({
            status: "false",
            msg: error.details[0].message 

        })
        return
    }

    //check if user exists
    const chckIfUserAlreadyExists = await getUserFromDB(email)
    if(chckIfUserAlreadyExists.length !==0) {
       return  res.status(400).json({
            status: "false",
            msg: "User already exists"
        })
    }
    // insert user into DB
    const user_id = uuidv4()
    dbConnection.query({
        sql: `insert into users (user_id, username, email, password, phone) values(?,?,?,?,?)`,
        values: [user_id, username, email, password, phone]

    },(err, result, fields)=>{
        if(err) {
            return res.status(500).json({
                status: "false",
                msg: err.message || "Something went wrong..."
            })
        }

        res.status(201).json({
            status: "true",
            msg: "User added successfully..."
        })
    })
}

const getUser = async(req, res)=> {
    try{
        const { email } = req.params
        const userFromDB = await getUserFromDB(email)
         res.status(200).json({
            status: "true",
            msg: "User fetched successfully",
            data: userFromDB
         })
    }catch (err){
        res.status(500).json({
            status: "false",
            msg: err.message || "Something went wrong",
            
         })
    }
    
}


const getAllUsers = async (req, res)=> {    
    try {
        const allUsers = await getAllUsersFromDB()
        res.status(200).json({
            status: "true",
            msg: "users successfully fetched",
            data: allUsers
        })
    }catch(err) {
        res.status(500).json({
            status: "false",
            msg: "Something went wrong"
            
        })
    }
    
    //index <-> route <-> controller <-> model -> db

}


const updateUser = async(req, res) => {

        const { email } = req.params
    try{
        //const {username, password, phone}= req.body
        //update users set username = "afeez" where email = "afeez@xmail"
        const keys = Object.keys(req.body)
        const data = keys.map(item => {
            return `${item} = "${req.body[item]}"`
        })

         const updateRes = await updateUserInDB(data, email)
         res.status(200).json({
            status: "true",
            msg: "user updated successfully",   
            // data: updateRes
         })

    } catch (err) {
        res.status(500).json({
            status: "false",
            msg: err.message || "something went wrong"
        })
    }      
        

        
}



module.exports  = {newUser, getUser, getAllUsers, updateUser}
