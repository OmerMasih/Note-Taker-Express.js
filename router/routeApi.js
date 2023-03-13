// linking our routes to a series of "data" sources.
const apiRuter = require("express").Router();
const uidDepend = require("uuid");
const utilDepend = require("util");
const fs = require("fs");

const readFileAsync = utilDepend.promisify(fs.readFile);
const writeFileAsync = utilDepend.promisify(fs.writeFile);

const readFile = () => {
  return readFileAsync("./Develop/db/db.json", "utf8");
};
const writeFile = (data) => {
  return writeFileAsync("./Develop/db/db.json", JSON.stringify(data));
};

// ROUTING

// In each of the below cases when a user visits a link
// (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
apiRuter.get("/notes", (req, res) => {
  getNotes()
    .then((notes) => {
      return res.json(notes);
    })
    .catch((err) => res.status(500).json(err));
});

//Sitting a new note
apiRuter.post("/notes", (req, res) => {
  addNote(req.body)
    .then((note) => res.json(note))
    .catch((err) => res.status(500).json(err));
});

//Remove a note
apiRuter.delete("/notes/:id", (req, res) => {
  deleteNote(req.params.id)
    .then(() => res.json({ status: true }))
    .catch((err) => res.status(500).json(err));
});

//Return a list of notes
const getNotes = () => {
  return new Promise(function (resolve, reject) {
    readFile().then((notes) => {
      let notesArr = [];

      try {
        notesArr = [].concat(JSON.parse(notes));
      } catch (err) {
        notesArr = [];
      }

      resolve(notesArr);
    });
  });
};

// Tag the new note with a GUID
const addNote = (note) => {
  return new Promise(function (resolve, reject) {
    if (!note.title || !note.text) {
      throw new Error("You must enter in a Title and Text.");
    }

    const newNote = { id: uidDepend.v4(), title: note.title, text: note.text };

    getNotes()
      .then((notes) => [...notes, newNote])
      .then((updatedNotes) => {
        writeFile(updatedNotes);
        resolve(newNote);
      });
  });
};

//Delete a note: Using the GUID of the note to be deleted
function deleteNote(id) {
  return new Promise(function (resolve, reject) {
    getNotes()
      .then((notes) => notes.filter((note) => note.id !== id))
      .then((filteredNotes) => {
        writeFile(filteredNotes);
        resolve();
      });
  });
}

//Export the router object
module.exports = apiRuter;
