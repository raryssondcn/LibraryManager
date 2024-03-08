
exports.up = (knex) => {
    return knex.schema.createTable("books", (table) => {
        table.increments('id').primary()
        table.strings("title").notNullable()
        table.strings("author").notNullable()
        table.strings("category").notNullable()
        table.strings("pageNumber").notNullable()
        table.boolean("available").defaultTo(true)
    })
  
};


exports.down = (knex) => {
    return knex.schema.dropTableIfExist("books")
};
