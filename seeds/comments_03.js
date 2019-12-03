const comments = require("../comments-seeds03")

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('comments')
    .then(function () {
      // Inserts seed entries
      return knex('comments').insert(comments);
    });
};