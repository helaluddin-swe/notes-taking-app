const Notes = require("../models/note.js");

// GET ALL NOTES
async function getAllNotes(req, res) {
  try {
    const notes = await Notes.find().sort({ createdAt: -1 });
    return res.status(200).json(notes);
  } catch (error) {
    console.error("Error fetching notes:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}


// CREATE NOTE
async function createNotes(req, res) {
  try {
    const { title, content } = req.body;

    const newNotes = await Notes.create({ title, content });
    const savedNote= await newNotes.save()

    res.status(201).json(savedNote);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

// UPDATE NOTE
async function updateNote(req, res) {
  try {
    const { title, content } = req.body;

    const updated = await Notes.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true }
    );

    if (!updated)
      return res.status(404).json({ message: "Note not found" });

    res.json(updated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

// DELETE NOTE
async function deleteNote(req, res) {
  try {
    const deleted = await Notes.findByIdAndDelete(req.params.id);

    if (!deleted)
      return res.status(404).json({ message: "Note not found" });

    res.json({ message: "Note deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

// GET NOTE BY ID
async function getNoteByID(req, res) {
  try {
    const note = await Notes.findById(req.params.id);

    if (!note)
      return res.status(404).json({ message: "Note not found" });

    res.json(note);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = {
  createNotes,
  getAllNotes,
  deleteNote,
  updateNote,
  getNoteByID,
};
