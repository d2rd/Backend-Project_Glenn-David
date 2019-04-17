const express = require("express");
const router = express.Router(); // creates variable that brings in Express Router middleware

// Note Model
const Note = require("../../models/Note"); 
// ../../ jump out of api folder then out of routes folder to get to models

router.get("/", (req, res) => {
  Note.find() // mongoose find()
    // .sort({ date: -1 }) // mongoose function sorts by send date
    .then(notes => res.json(notes));
});

module.exports = router;