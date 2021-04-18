const { notes } = require("../../db/db.json");
const { createNewNote, validateNote } = require("../../lib/notes");
const router = require("express").Router();
const fs = require("fs");

// GET route
router.get("/notes", (req, res) => {
  res.json(notes);
});

// POST route
router.post("/notes", (req, res) => {
  // set id based on what the next index of the array will be
  req.body.id = notes.length.toString();
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
router.delete("/notes/:id", (req, res, next) => {
  // set id to be deleted to a variable
  let deleteId = req.params.id;
  // read all notes from the db.json file
  fs.readFile("./db/db.json", "utf8", (error, data) => {
    if (error) throw error;
    // parse current notes
    const currentNotes = JSON.parse(data);
    // remove the note with the given id property and set to new variable
    const updatedNotes = currentNotes.filter((note) => note.id != deleteId);
    // rewrite the notes to the db.json file
    fs.writeFile(
      "./db/db.json",
      JSON.stringify(updatedNotes, null, 2),
      (error) => {
        if (error) throw error;
        res.json(note);
        console.log("Successfully removed note!");
      }
    );
  });
});

module.exports = router;
