const express = require("express");

// Complete your server here!
// Do NOT `server.listen()` inside this file!
const projectRouter = require("./projects/projects-router");
const actionRouter = require("./actions/actions-router");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.status(200).json({ message: "server is up" });
});

server.use("/api/projects/", projectRouter);
server.use("/api/actions/", actionRouter);

module.exports = server;
