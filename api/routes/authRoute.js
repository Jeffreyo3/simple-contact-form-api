const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// root directory needs a .env file with a key of SECRET for this function to work.
const secret = process.env.SECRET;

const Admin = require('../models/authModel');

router.get("/", (req, res) => {
  res.send(`<h2>Auth Route is alive.</h2>`);
});

// router.get("/dev", (req, res) => {
//     Admin.getAdmins()
//     .then((list) => {
//       res.status(200).json(list);
//     })
//     .catch((err) => {
//       res.status(500).json({ error: `Error attempting login: ${err.message}` });
//     });
// });

router.post("/register", (req, res) => {
  if (!req.body || !req.body.password || !req.body.username ) {
    res.status(400).json({ message: "Username, and password are required." });
  } else {
    let newAdmin = req.body;
    const hash = bcrypt.hashSync(newAdmin.password, 11);
    newAdmin.password = hash;

    Admin.addAdmin(newAdmin)
      .then((saved) => {
        const token = getToken(saved);
        res.status(201).json({
            Admin: {
            id: saved.id,
            username: saved.username,
          },
          token: token,
        });
      })
      .catch((err) => {
        if (err.message.includes("UNIQUE constraint failed")) {
          res.status(500).json({ error: `Username already registered` });
        } else {
          res
            .status(500)
            .json({ error: `Error adding new Admin: ${err.message}` });
        }
      });
  }
});

router.post("/login", (req, res) => {
  if (!req.body || !req.body.password || !req.body.username) {
    res.status(400).json({ message: "Username and password are required." });
  } else {
    let { username, password } = req.body;

    Admin.findAdmin({ username })
      .first()
      .then((user) => {
        if (user && bcrypt.compareSync(password, user.password)) {
          const token = getToken(user);
          res.status(200).json({
            user: {
              id: user.id,
              username: user.username,
            },
            token: token,
          });
        } else {
          res.status(401).json({ message: "Invalid login credentials" });
        }
      })
      .catch((err) => {
        res
          .status(500)
          .json({ error: `Error attempting login: ${err.message}` });
      });
  }
});

// function to create token with a secret
function getToken(user) {
  const tokenPayload = {
    userid: user.id,
    username: user.name,
    role: ["Admin"],
    author: "Created by Jeffrey Orndorff",
  };
  const options = { expiresIn: "1h" };

  const token = jwt.sign(tokenPayload, secret, options);

  return token;
}

module.exports = router;
