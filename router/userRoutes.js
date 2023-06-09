const router = require("express").Router()
const {newUser, getUser, getAllUsers} = require("../controller/usersController")


router.post("/user/signup", newUser)
router.get("/user/:email", getUser)
router.get("/users", getAllUsers)
router.put("/user/update", updateUser)





module.exports = router