const express = require ("express")
const routes = require ("./routes")
const swaggerUi = require("swagger-ui-express")
const swaggerDocument = require("../swagger.json")

const app = express()

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.use(express.json())
app.use(routes)

const PORT = 3333

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send("Algo deu errado")

    next()
})

app.listen(PORT, () => {
    console.log(`servidor rodando na porta ${PORT}`);
})