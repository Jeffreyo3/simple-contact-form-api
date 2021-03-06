exports.up = function (knex) {
  return (
    // Tbl of users
    knex.schema.createTable("admin", (tbl) => {
      tbl.increments();
      tbl.string("username").notNullable().unique();
      tbl.string("password").notNullable();
    })
  );
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("users");
};
