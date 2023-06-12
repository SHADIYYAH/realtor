const router = require("express").Router()
const {newUser, getUser, getAllUsers, updateUser} = require("../controller/usersController")


router.post("/user/signup", newUser)
router.get("/user/:email", getUser)
router.get("/users", getAllUsers)
router.put("/user/update/:email", updateUser)





module.exports = router