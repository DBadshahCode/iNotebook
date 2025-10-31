import React, { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";

const AddNote = () => {
  const [note, setNote] = useState({ title: "", description: "", tag: "" });
  const [errors, setErrors] = useState([]);
  const { addNote } = useContext(noteContext);

  const handleAddNote = async (e) => {
    e.preventDefault();
    const validationErrors = await addNote(note.title, note.description, note.tag);

    if (validationErrors) {
      setErrors(validationErrors);
    } else {
      setErrors([]);
      setNote({ title: "", description: "", tag: "" });
    }
  };

  const onChange = (e) => setNote({ ...note, [e.target.name]: e.target.value });

  return (
    <div className="container my-4" style={{ maxWidth: "600px" }}>
      <div className="card border-0 shadow-lg rounded-4 p-4">
        <h2 className="text-center text-success fw-bold mb-4">Add a New Note</h2>
        <form onSubmit={handleAddNote}>
          {/* Title */}
          <div className="form-floating mb-3">
            <input
              type="text"
              name="title"
              className={`form-control rounded-3 ${
                errors.find((err) => err.param === "title") ? "is-invalid" : ""
              }`}
              id="title"
              placeholder="Note Title"
              value={note.title}
              minLength={5}
              required
              onChange={onChange}
            />
            <label htmlFor="title">Title</label>
            {errors.find((err) => err.param === "title") && (
              <div className="invalid-feedback">
                {errors.find((err) => err.param === "title").msg}
              </div>
            )}
          </div>

          {/* Description */}
          <div className="form-floating mb-3">
            <textarea
              name="description"
              className={`form-control rounded-3 ${
                errors.find((err) => err.param === "description") ? "is-invalid" : ""
              }`}
              id="description"
              placeholder="Note Description"
              style={{ height: "120px" }}
              value={note.description}
              minLength={5}
              required
              onChange={onChange}
            ></textarea>
            <label htmlFor="description">Description</label>
            {errors.find((err) => err.param === "description") && (
              <div className="invalid-feedback">
                {errors.find((err) => err.param === "description").msg}
              </div>
            )}
          </div>

          {/* Tag */}
          <div className="form-floating mb-4">
            <input
              type="text"
              name="tag"
              className="form-control rounded-3"
              id="tag"
              placeholder="Tag (optional)"
              value={note.tag}
              minLength={3}
              onChange={onChange}
            />
            <label htmlFor="tag">Tag</label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="btn btn-success w-100 py-2 rounded-3 fw-semibold"
          >
            Add Note
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNote;
