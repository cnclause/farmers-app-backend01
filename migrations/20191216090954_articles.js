
exports.up = function(knex) {
  return knex.schema.createTable('articles', (table) => {
      table.increments('id')
      table.string('title')
      table.string('blurb')
      table.string('link_to_article')
      table.string('image_url')
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('articles')
};
