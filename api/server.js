// Dependency Imports
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();

// Routes Imports
const contactRouter = require("./routes/contactRoute");

// Middleware Imports
// const authenticate = require("./middleware/auth-middleware");

const server = express();

server.use(helmet());
server.use(cors());
server.use(morgan("dev"));
server.use(express.json());

server.use("/api/submissions", contactRouter);

// Alive messages
server.get("/", (req, res) => {
  res.send(`<h2>CONTACT server is alive</h2>`);
});
server.get("/api", (req, res) => {
  res.send(`<h2>Use an /api/endpoint...</h2>`);
});

module.exports = server;
