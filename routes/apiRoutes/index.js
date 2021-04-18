const { notes } = require("../../db/db.json");
const { createNewNote, validateNote, deleteNote } = require("../../lib/notes");
const router = require("express").Router();
const fs = require("fs");
const { nextTick } = require("process");

// GET route
router.get("/notes", (req, res) => {
  let results = notes;
  res.json(results);
});

// POST route
router.post("/notes", (req, res) => {
  // set id based on what the next index of the array will be
  if (notes.length === 0) {
    req.body.id = "0";
  } else {
    req.body.id = notes.length.toString();
  }

  // if any data in req.body is incorrect, send 400 error back
  if (!validateNote(req.body)) {
    res
      .status(400)
      .send(
        "The note is not properly formatted. Make sure you complete both field (title and text)."
      );
  } else {
    // add note to json file and notes array in this function
    const note = createNewNote(req.body, notes);

    res.json(note);
  }
});

// Bonus delete route
router.delete("/notes/:id", (req, res) => {
  let note = deleteNote(req.params.id, notes);

  res.json(note);
});

module.exports = router;
