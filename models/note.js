const { model, Schema, default: mongoose } = require("mongoose");
const ObjectId = require("mongodb").ObjectId;
const NoteSchema = new Schema({
  text: String,
  date: { type: Date, required: true , default: Date.now()},
  createdBy: String
});

const Note = model("Note", NoteSchema);

module.exports = Note;
