exports.up = function (knex) {
  return (
    // Tbl of Emails
    knex.schema.createTable("Emails", (tbl) => {
      tbl.increments();
      tbl.string("email").notNullable();
    })
  );
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("Emails");
};
