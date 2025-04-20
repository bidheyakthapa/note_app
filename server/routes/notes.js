const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Note = require("../models/notes.js");

//new
router.post("/add", async (req, res) => {
  try {
    const newNote = new Note(req.body);
    const savedNote = await newNote.save();
    res.status(201).json(savedNote);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//get
router.get("/notes", async (req, res) => {
  try {
    const notes = await Note.find();
    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//update
router.patch("/note/:id", async (req, res) => {
  try {
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: Date.now() },
      { new: true }
    );

    res.json(updatedNote);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//delete
router.delete("/note/:id", async (req, res) => {
  try {
    await Note.findByIdAndDelete(req.params.id);

    res.json({ message: "Note deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
