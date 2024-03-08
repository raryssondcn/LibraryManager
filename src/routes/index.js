const {Router} = require ("express")
const userRoutes = require("./users.routes")
const bookRoutes = require("./books.routes")

const routes = Router()

routes.use("/", userRoutes)
routes.use("/", bookRoutes)

module.exports = routes