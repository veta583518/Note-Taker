const fs = require("fs");
const path = require("path");

// function to create new note, push to notesArray
function createNewNote(body, notesArray) {
  // let notesArray = [];
  const note = body;
  notesArray.push(note);

  // write to note.json file in data subdirectoty
  fs.writeFileSync(
    // use path.join() to join the value of the directory of the file we will execute the code in with the path to the json file
    path.join(__dirname, "../db/db.json"),

    // save the js array as JSON, (non-edited and with whitespace)
    JSON.stringify({ notes: notesArray }, null, 2)
  );
  // return finished code to post route for response
  return note;
}

// add validation to make sure new note's data exists and is the correct format
function validateNote(note) {
  if (!note.title || typeof note.title !== "string") {
    return false;
  }
  if (!note.text || typeof note.text !== "string") {
    return false;
  }
  if (!note.id || typeof note.id !== "string") {
    return false;
  }
  return true;
}

function deleteNote(id, notesArray) {
  const result = notesArray.filter((note) => note.id === id)[0];
  //console.log(result);
  // fs.readFile("./db/db.json", "utf8", (err, result) => {
  //   if (err) {
  //     throw err;
  //   }

  if (!result) {
    return result;
  } else {
    let delId = parseInt(id);
    let delIndex = notesArray.findIndex((x) => {
      return x.id === delId;
    });
    //console.log(delId);
    //console.log(delIndex);
    notesArray.splice(delIndex, 1);
    console.log(notesArray);
  }
  console.log(notesArray.splice("3", 1));

  fs.writeFileSync(
    path.join(__dirname, "../db/db.json"),
    JSON.stringify({ notes: notesArray }, null, 2)
  );
  // });
  return notesArray;
}

module.exports = { createNewNote, validateNote, deleteNote };
