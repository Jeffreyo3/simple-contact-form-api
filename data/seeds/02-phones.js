exports.seed = function (knex) {
  return knex("Phones").insert([
    {
      phone: "N/A",
    },
    // {
    //   phone: "555-555-5555",
    // },
    // {
    //   phone: "555-123-5555",
    // },
  ]);
};
