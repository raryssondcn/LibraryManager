exports.up = (knex) => {
  return knex.schema.createTable("users", (table) => {
    table.increments('id').primary()
    table.string("name").notNullable()
    table.string("email").notNullable()
    table.string("fone").notNullable()
    table.int("livrosEmprestados").defaulTo(0)
  })
};


exports.down = (knex) => {
    return knex.schema.dropTableIfExist("users")
};
