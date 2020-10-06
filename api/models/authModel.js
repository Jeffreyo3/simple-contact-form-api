const db = require("../../data/dbConfig");

module.exports = {
  addUser,
  findUserById,
  findUser,
  getUsers,
};

// for User register
function addUser(user) {
  return db("admin")
    .insert(user)
    .returning('id')
    .then((ids) => {
      const [id] = ids;
      return findUserById(id);
    });
}
// for User register
function findUserById(id) {
  return db("admin").where({ id }).first();
}
// for User login
function findUser(filter) {
  return db("admin")
    .select("id", "username", "password")
    .where(filter);
}

// for listing users for dev testing (excluding passwords)
function getUsers() {
  return db("admin").select("id", "username");
}
