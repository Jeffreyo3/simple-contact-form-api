exports.up = function (knex) {
  return (
    // tbl of Users
    knex.schema.createTable("Users", (tbl) => {
      tbl.increments();
      tbl.string("name").notNullable();
      tbl.string("message", 510);
      tbl.string("submitted").notNullable()
      tbl.integer("emails_id").notNullable().references("id").inTable("Emails");
      tbl.integer("phones_id").notNullable().references("id").inTable("Phones");
    })
  );
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("Users");
};
