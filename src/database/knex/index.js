const config = require("../../../knexfile")

const knex = ("knex")

const connection = knex(config.development)

module.exports = connection