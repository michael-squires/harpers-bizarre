exports.up = function (knex) {
  return knex.schema.createTable("comments", (commentsTable) => {
    commentsTable.increments("comment_id").primary();
    commentsTable.text("author").references("users.username");
    commentsTable.integer("article_id").references("articles.article_id").onDelete('SET NULL');
    commentsTable.integer("votes").default(0);
    commentsTable.timestamp("created_at");
    commentsTable.text("body").notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("comments");
};
