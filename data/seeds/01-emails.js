exports.seed = function (knex) {
  return knex("Emails").insert([
    {
      email: "N/A",
    },
    // {
    //   email: "test@test.com",
    // },
    // {
    //   email: "test2@test.com",
    // },
  ]);
};
