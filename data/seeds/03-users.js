exports.seed = function (knex) {
  const seedDate = new Date().toString();
  return knex("Users").insert([
    {
      name: "Jeff",
      emails_id: 1,
      phones_id: 1,
      submitted: seedDate,
    },
    // {
    //   name: "Test_boi",
    //   emails_id: 2,
    //   phones_id: 1,
    //   submitted: seedDate,
    // },
    // {
    //   name: "Test_gurl",
    //   message: "Hiiiii",
    //   emails_id: 3,
    //   phones_id: 1,
    //   submitted: "Tue Oct 06 2020 13:43:40 GMT-0700 (Pacific Daylight Time)",
    // },
    // {
    //   name: "Test_gurl's bro",
    //   emails_id: 3,
    //   phones_id: 2,
    //   submitted: "Tue Oct 06 2020 13:44:43 GMT-0700 (Pacific Daylight Time)",
    // },
    // {
    //   name: "Test_boi's sis",
    //   message: "Contact me for a good offer",
    //   emails_id: 2,
    //   phones_id: 3,
    //   submitted: "Tue Oct 06 2020 13:41:02 GMT-0700 (Pacific Daylight Time)",
    // },
  ]);
};
