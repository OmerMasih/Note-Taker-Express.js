// File path for our html
const express = require("express").Router();
const path = require("path");

// Below the user is shown an HTML page of content

express.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "../Develop/public/notes.html"));
});

// If no matching route is found default to home
express.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../Develop/public/index.html"));
});

//export the express object
module.exports = express;
