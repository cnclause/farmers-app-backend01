
exports.up = function(knex) {
  return knex.schema.createTable('topics', (table) => {
      table.increments('id')
      table.string('title')
      table.text('description')
      table.datetime('created_at').defaultTo(knex.fn.now())
      table.datetime('updated_at').defaultTo(knex.fn.now())
      table.integer('user_id').unsigned().references('id').inTable('users')
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('topics')
};
