const express = require("express")
const dbConnection = require("./config/db")
const userRouter = require("./router/userRoutes")
const bodyParser = require("body-parser")

const app = express()
const PORT = 3310

app.use(bodyParser.json())
app.use("/api/realtor", userRouter)
// app.use("/api/realtor", userRouter)

dbConnection.connect((err)=>{
    if(err) {
        console.log("err", err)
    }
    console.log("db connection is established")
    app.listen(PORT, ()=> {
        console.log("api server is up...")
    })
})
