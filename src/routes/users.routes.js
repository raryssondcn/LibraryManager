const {Router} = require ("express")
const UserController = require("../controller/UserController")

const userRoutes = Router()

const userController = new UserController

userRoutes.post("/users", userController.createUser)
userRoutes.get("/users", userController.listUsers)
userRoutes.get("/users/:id", userController.listUsersById)
userRoutes.put("/users/:id", userController.updateUser)
userRoutes.delete("/users/:id", userController.deleteUser)

module.exports = userController