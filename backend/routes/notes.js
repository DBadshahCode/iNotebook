const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Note = require("../models/Note");
const { body, validationResult } = require("express-validator");

const INTERNAL_ERROR_MESSAGE = "Something went wrong!";
const AUTHORIZATION_ERROR_MESSAGE =
  "You are not authorized to modify or access this note.";
const NOTE_NOT_FOUND = "Note not found.";

router.get("/fetchallnotes", fetchuser, async (req, res) => {
  const userId = req.user.id;
  try {
    const notes = await Note.find({ user: userId });

    if (!notes) {
      return res.status(404).json({ msg: "No notes found" });
    }

    return res.json(notes);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json(INTERNAL_ERROR_MESSAGE);
  }
});

router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body(
      "description",
      "Description must be atleast 5 characters more"
    ).isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      const userId = req.user.id;

      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const note = new Note({
        title,
        description,
        tag,
        user: userId,
      });

      const savedNote = await note.save();
      return res.json(savedNote);
    } catch (error) {
      console.error(error.message);
      return res.status(500).json(INTERNAL_ERROR_MESSAGE);
    }
  }
);

router.put(
  "/updatenote/:id",
  fetchuser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Description must be at least 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    const { title, description, tag } = req.body;

    try {
      const newNote = {};

      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      if (title) {
        newNote.title = title;
      }
      if (description) {
        newNote.description = description;
      }
      if (tag) {
        newNote.tag = tag;
      }

      const note = await Note.findByIdAndUpdate(
        req.params.id,
        { $set: newNote },
        { new: true }
      );

      if (!note) {
        return res.status(404).json(NOTE_NOT_FOUND);
      }

      if (note.user.toString() !== req.user.id) {
        return res.status(401).json(AUTHORIZATION_ERROR_MESSAGE);
      }

      return res.json(note);
    } catch (error) {
      console.error(error.message);
      return res.status(500).json(INTERNAL_ERROR_MESSAGE);
    }
  }
);

router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  try {
    let note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json(NOTE_NOT_FOUND);
    }

    if (note.user.toString() !== req.user.id) {
      return res.status(401).json(AUTHORIZATION_ERROR_MESSAGE);
    }

    await note.deleteOne();

    return res.json({ success: "Note has been Deleted", note });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json(INTERNAL_ERROR_MESSAGE);
  }
});

module.exports = router;
