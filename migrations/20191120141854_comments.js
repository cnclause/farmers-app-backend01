
exports.up = function(knex) {
  return knex.schema.createTable('comments', (table) => {
    table.increments('id')
    table.text('description')
    table.datetime('created_at').defaultTo(knex.fn.now())
    table.datetime('updated_at').defaultTo(knex.fn.now())
    table.integer('user_id').unsigned().references('id').inTable('users')
    table.integer('topic_id').unsigned().references('id').inTable('topics')

  })
};

exports.down = function(knex) {
    return knex.schema.dropTable('comments')
  
};
