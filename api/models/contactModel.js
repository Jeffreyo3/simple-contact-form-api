const db = require("../../data/dbConfig");

module.exports = {
  getSubmissions,
  findEmailByEmail,
  findPhoneByPhone,
  findEmailByID,
  findPhoneByID,
  addSubmission
};

function getSubmissions() {
  return db("Users")
    .join("Emails", "Users.emails_id", "Emails.id")
    .join("Phones", "Users.phones_id", "Phones.id");
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
  return db("Users").insert(submission)
}
