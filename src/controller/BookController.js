const knex = require("../database/knex")

class BookController{
    async createBook(req, res){
        const {title, author, category, pageNumber} = req.body

        const book = {
            title,
            author,
            category,
            pageNumber,
            available: true    
        }
        await knex("books").insert(title, author, category, pageNumber)
        res.status(201).json(book)
    }
    async listBooks(req, res){
        const books = await knex("books")
        res.status(200).json(books)
    }
    async updateBook(req, res){
        const {id} = req.params
        const {title, author, category, pageNumber} = req.body

        await knex("books").where({id}).update(title, author, category, pageNumber)

        res.status(200).json("Livro Atualizado")
    }
    async deleteBook(req, res){
        const {id} = req.params
        
        await knex("books").where({id}).delete()

        res.status(200).json("Livro deletado")
    }


}

module.exports = BookController