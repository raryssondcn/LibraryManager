const express = require('express')
const {v4: uuidv4} = require('uuid')

const app = express()

const users = []
const livros = []

function existUserAccount(req, res, next){
    const {name} = req.headers
    const user = users.find(user => user.name === name)

    if (!name){
        return res.status(400).json("Não existe nenhum cliente")
    }
    req.user = user

    next()
}

app.use(express.json())

app.post("/users", (req, res) => {
    
    const {name} = req.body
    const {email} = req.body
    const {tel} = req.body

    const user = {id: uuidv4(), name, email, tel, livrosEmprestados:[], quantidadeLimite:0}
    users.push(user)

    res.status(200).json(user)
})

app.get("/users", (req, res) => {
    res.status(200).json(users)
})

app.delete("/users/:id", existUserAccount, (req, res) => {
    const {id} = req.params

    const userIndex = users.findIndex(user => user.id === id)
    users.splice(userIndex, 1)

    return res.status(200).json("Usuario Deletado")
})

app.put("/users/:id", (req, res) => {
    const {id} = req.params
    const {name, email, tel} = req.body

    const user = users.find(user => user.id === id)

    user.name = name
    user.email = email
    user.tel = tel

    return res.status(200).json("Atualizado")

})

//Library

function existLivro(req, res, next){
    const {titulo} = req.headers
    const livro = livros.find(livro => livro.titulo === titulo)

    if (!livro){
        return res.status(400).json("Não existe nenhum livro")
    }
    req.livro = livro

    next()
}

app.post("/library", (req, res) => {
    const {titulo} = req.body
    const {autor} = req.body
    const {numeroPagina} = req.body
    const {categoria} = req.body

    const livro = {id: uuidv4(), titulo, autor, numeroPagina, categoria, disponibilidade: true}
    livros.push(livro)

    res.status(200).json(livros)
})

app.get("/library", (req, res) => {
    return res.status(201).json(livros)
})

app.delete("/library/:id", existLivro, (req, res) => {
    const {id} = req.params

    const livroIndex = livros.findIndex(livro => livro.id === id)

    livros.splice(livroIndex, 1)
    return res.status(201).json("Livro deletado")
})

app.patch("/library/:id/disponibilidade", existUserAccount, (req, res) => {
    const {id} = req.params
    const {user} = req

    const livro = livros.find(livro => livro.id === id)
    console.log(livro);
    

    //.find encontra o elemento
    //.findindex numera a posicao do elemento no array
    //Se der null, da um "console.log"
    //toda vez que tiver "if", faça primeiro a condição(if) para depois alterar o codigo

        if(user.quantidadeLimite > 2){
            return res.status(400).json("Limite atingido")
        }else if(livro.disponibilidade === false){
            return res.status(400).json("Já emprestado")
        }else{
            user.livrosEmprestados.push(livro)
                user.quantidadeLimite++
                livro.disponibilidade = false
                return res.status(200).json("LIvro emprestado")}
        
    })

app.patch("/devolucao/:id/disponibilidade", existUserAccount, (req, res) => {
    const {id} = req.params
    const {user} = req

    const livro = user.livrosEmprestados.find(livro => livro.id === id)

    user.livrosEmprestados.splice(livro)
    livro.disponibilidade = true
    user.quantidadeLimite--

    return res.status(400).json("Devolvido")
})

const PORT = 3333

app.listen(PORT, () => {
    console.log(`servidor rodando na porta: ${PORT}`);
})