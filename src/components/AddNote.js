import React, { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";

const AddNote = () => {
  const [note, setNote] = useState({ title: "", description: "", tag: "" });
  const [errors, setErrors] = useState([]);
  const context = useContext(noteContext);
  const { addNote } = context;
  const handleAddNote = async (e) => {
    e.preventDefault();
    const validationErrors = await addNote(
      note.title,
      note.description,
      note.tag
    );

    if (validationErrors) {
      setErrors(validationErrors);
    } else {
      setErrors([]);
    }

    setNote({ title: "", description: "", tag: "" });
  };
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  return (
    <div className="container my-3">
      <h2>Add a Note</h2>
      <form name="addnote-form">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            name="title"
            className="form-control"
            id="title"
            value={note.title}
            minLength="5"
            required
            onChange={onChange}
          />
          {errors.find((err) => err.param === "title") && (
            <p style={{ color: "red" }}>
              {errors.find((err) => err.param === "title").msg}
            </p>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            type="text"
            name="description"
            className="form-control"
            id="description"
            value={note.description}
            minLength="5"
            required
            onChange={onChange}
          />
          {errors.find((err) => err.param === "description") && (
            <p style={{ color: "red" }}>
              {errors.find((err) => err.param === "description").msg}
            </p>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">
            Tag
          </label>
          <input
            type="text"
            name="tag"
            className="form-control"
            id="tag"
            value={note.tag}
            minLength="5"
            required
            onChange={onChange}
          />
        </div>
        <button
          type="submit"
          className="btn btn-warning"
          onClick={handleAddNote}
        >
          Add Note
        </button>
      </form>
    </div>
  );
};

export default AddNote;
