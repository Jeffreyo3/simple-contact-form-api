const db = require("../../data/dbConfig");

module.exports = {
  getSubmissions,
  findEmailByEmail,
  findPhoneByPhone,
  findEmailByID,
  findPhoneByID,
  addSubmission,
  addEmail,
  addPhone,
};

function getSubmissions() {
  return db("Users")
    .join("Emails", "Users.emails_id", "Emails.id")
    .join("Phones", "Users.phones_id", "Phones.id")
    .orderBy("submitted", "desc")
    .select("name", "email", "phone", "message", "submitted");
}

function findEmailByEmail(email) {
  return db("Emails").where({ email }).first();
}

function findPhoneByPhone(phone) {
  return db("Phones").where({ phone }).first();
}

function findEmailByID(id) {
  return db("Emails").where({ id }).first();
}

function findPhoneByID(id) {
  return db("Phones").where({ id }).first();
}

function addSubmission(submission) {
  return db("Users").insert(submission);
}

function addEmail(email) {
  return db("Emails")
    .insert({ email })
    .returning("id")
    .then((ids) => {
      const [id] = ids;
      return id;
    });
}

function addPhone(phone) {
  return db("Phones")
    .insert({ phone })
    .returning("id")
    .then((ids) => {
      const [id] = ids;
      return id;
    });
}
