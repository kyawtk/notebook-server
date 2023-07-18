// routes/notes.js

const { Router } = require("express");
const noteController = require("../controllers/noteController");

const router = Router();

router.get("/", noteController.getAllNotes);
router.post("/", noteController.addNote);
router.put("/:id", noteController.updateNote);
router.delete("/:id", noteController.deleteNote);

module.exports = router;
