const db = require("../../data/dbConfig");

module.exports = {
//   addAdmin,
//   findAdminById,
  findAdmin,
//   getAdmins,
};

// for Admin register
// function addAdmin(admin) {
//   return db("admin")
//     .insert(admin)
//     .returning('id')
//     .then((ids) => {
//       const [id] = ids;
//       return findAdminById(id);
//     });
// }

// for Admin register
// function findAdminById(id) {
//   return db("admin").where({ id }).first();
// }

// for Admin login
function findAdmin(filter) {
  return db("admin")
    .select("id", "username", "password")
    .where(filter);
}

// for listing admins for dev testing (excluding passwords)
// function getAdmins() {
//   return db("admin").select("id", "username");
// }
