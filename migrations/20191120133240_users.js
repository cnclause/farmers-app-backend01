
exports.up = function(knex) {
  return knex.schema.createTable('users', (table) => {
      table.increments('id')
      table.string('display_name').unique()
      table.string('first_name')
      table.string('last_name')
      table.string('password')
      table.string('email').unique()
      table.string('image_url')
      table.text('google_id')
      table.boolean('bannded').default(false)
      table.string('status')
      table.float('latitude')
      table.float('longitude')
      table.text('about_me')
      
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('users')
};
