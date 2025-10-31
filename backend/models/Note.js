const mongoose = require("mongoose");

const NotesSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    tag: {
      type: String,
      default: "General",
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Note", NotesSchema);
