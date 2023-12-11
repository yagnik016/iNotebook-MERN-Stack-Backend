const express = require("express");
const router = express.Router();
const Notes = require("../models/Notes");
const Authentication = require("../MidddleWares/Authentication");

// get all Notes API Route

router.get("/getallnotes", Authentication, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

// Add new Note API Route
router.post("/addnote", Authentication, async (req, res) => {
  try {
    const newNote = await Notes.create({
      title: req.body.title,
      description: req.body.description,
      tag: req.body.tag,
      user: req.user.id,
    });

    return res.status(200).json(newNote);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

// Delete Note API Route
router.delete("/deletenote/:id", Authentication, async (req, res) => {
  try {
    const deletedNote = await Notes.findByIdAndDelete(req.params.id);
    if (!deletedNote) {
      return res.status(404).json({ message: "Note not found" });
    }
    return res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
  // eslint-disable-next-line
});

// Update Note API Route
router.put("/updatenote/:id", Authentication, async (req, res) => {
  try {
    // eslint-disable-next-line
    const updatedNote = await Notes.findByIdAndUpdate(req.params.id, {
      title: req.body.title,
      description: req.body.description,
      tag: req.body.tag,
    });
    if (!updatedNote) {
      return res.status(404).json({ message: "Note not found" });
    }
    return res.status(200).json({ message: "Note updated successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
});
module.exports = router;
