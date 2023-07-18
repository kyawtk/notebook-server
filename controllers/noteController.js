// controllers/noteController.js

const Note = require("../models/note");
const User = require('../models/user')
// Function to get all notes
exports.getAllNotes = async (req, res) => {
  const userName   = req.data.user.userName
  console.log(req.data)
  try {
    const notes = await Note.find({createdBy: userName});
    
   
    res.json({ notes });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch notes" });
  }
};

// Function to add a new note
exports.addNote = (req, res) => {
  const note = req.body.note;
  if (!note) {
    return res.status(400).json({ error: "Please provide a note" });
  }

  const newNote = new Note(note);

  newNote
    .save()
    .then((savedNote) => res.json(savedNote))
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Failed to add note" });
    });
};

// Function to update a note
exports.updateNote = async (req, res) => {
  const id = req.params.id;
  const text = req.body.text;
  try {
    const updatedNote = await Note.findByIdAndUpdate(id, { text }, { new: true });
    
    res.json(updatedNote);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update note" });
  }
};

// Function to delete a note
exports.deleteNote = async (req, res) => {
  const id = req.params.id;
  try {
    const deletedNote = await Note.findByIdAndDelete(id);
    res.json(deletedNote);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete note" });
  }
};
