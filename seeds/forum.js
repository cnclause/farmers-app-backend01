const topics = require("../forum-seeds01")

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('topics')
    .then(function () {
      // Inserts seed entries
      return knex('topics').insert(topics);
    });
};
