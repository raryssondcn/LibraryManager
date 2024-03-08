const {Router} = require("express")
const BookController = require("../controller/BookController")

const bookRoutes = Router()

const bookController = new BookController

bookRoutes.post("/book", bookController.createBook)
bookRoutes.get("/books", bookController.listBooks)
bookRoutes.put("/books/:id", bookController.updateBook)
bookRoutes.delete("/books/:id", bookController.deleteBook)

module.exports = bookRoutes