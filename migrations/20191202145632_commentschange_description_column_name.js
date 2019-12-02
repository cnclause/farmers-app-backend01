
exports.up = function(knex) {
    return knex.schema.table('comments', (table) => {
        table.renameColumn('description', 'response')
    })
};

exports.down = function(knex) {
    return knex.schema.table('comments', (table) => {
        table.dropColumn('response')
    })
};
