exports.up = function (knex) {
  return (
    // Tbl of Phones
    knex.schema.createTable("Phones", (tbl) => {
      tbl.increments();
      tbl.string("phone").notNullable();
    })
  );
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("Phones");
};
