const { createNewNote, validateNote, deleteNote } = require("../lib/notes");
const { notes } = require("../db/db.json");
const fs = require("fs");
const { hasUncaughtExceptionCaptureCallback } = require("process");

test("creates new note ", () => {
  const note = createNewNote(
    { title: "Homework", text: "Complete Module 11", id: "4" },
    notes
  );
  expect(note.title).toBe("Homework");
  expect(note.text).toBe("Complete Module 11");
  expect(note.id).toBe("4");
});

test("validates note ", () => {
  const note = {
    title: "Homework",
    text: "Complete Module 11",
    id: "4",
  };
  const invalidNote = {
    title: "Homework",
    text: "Complete Module 11",
  };

  const result1 = validateNote(note);
  const result2 = validateNote(invalidNote);

  expect(result1).toBe(true);
  expect(result2).toBe(false);
});

test("deletes note ", () => {
  const startingNotes = [
    {
      title: "Test1",
      text: "Test",
      id: "5",
    },
    {
      title: "Test2",
      text: "Test Test",
      id: "6",
    },
  ];
  const result = deleteNote("6", startingNotes);
  expect(startingNotes.length).toEqual(1);
});
