
exports.up = function(knex) {
    return knex.schema.table('comments', (table) => {
        table.integer('parent_id').unsigned().references('id').inTable('comments')
  
    })
};

exports.down = function(knex) {
    return knex.schema.table('comments', (table) => {
        table.dropColumn('parent_id')
    })
};
