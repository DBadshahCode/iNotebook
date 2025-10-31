import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../context/notes/noteContext";
import Noteitem from "./Noteitem";
import AddNote from "./AddNote";
import { useNavigate } from "react-router-dom";

const Notes = () => {
  const [errors, setErrors] = useState([]);
  const context = useContext(noteContext);
  const { notes, getNote, editNote } = context;
  const navigate = useNavigate();

  const ref = useRef(null);
  const refClose = useRef(null);

  const [note, setNote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "",
  });

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getNote();
    } else {
      navigate("/login");
    }
    // eslint-disable-next-line
  }, []);

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    });
  };

  const handleUpdateNote = async (e) => {
    e.preventDefault();
    const validationErrors = await editNote(
      note.id,
      note.etitle,
      note.edescription,
      note.etag
    );

    if (validationErrors) {
      setErrors(validationErrors);
    } else {
      setErrors([]);
      refClose.current.click();
    }
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <>
      {/* Add Note Section */}
      <div className="container my-4">
        <div className="p-4 rounded-4 mb-4">
          <AddNote />
        </div>

        {/* Hidden Modal Trigger */}
        <button
          ref={ref}
          type="button"
          className="btn btn-primary d-none"
          data-bs-toggle="modal"
          data-bs-target="#updateNote"
        >
          Launch edit note modal
        </button>

        {/* Edit Note Modal */}
        <div
          className="modal fade"
          id="updateNote"
          tabIndex="-1"
          aria-labelledby="updateNoteLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 shadow rounded-4">
              <div className="modal-header border-0 bg-success bg-opacity-10">
                <h5 className="modal-title fw-bold text-success" id="updateNoteLabel">
                  ✏️ Edit Your Note
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>

              <div className="modal-body px-4">
                <form>
                  <div className="mb-3">
                    <label htmlFor="etitle" className="form-label fw-semibold">
                      Title
                    </label>
                    <input
                      type="text"
                      name="etitle"
                      className="form-control"
                      id="etitle"
                      placeholder="Enter note title"
                      minLength="5"
                      required
                      onChange={onChange}
                      value={note.etitle}
                    />
                    {errors.find((err) => err.param === "title") && (
                      <small className="text-danger">
                        {errors.find((err) => err.param === "title").msg}
                      </small>
                    )}
                  </div>

                  <div className="mb-3">
                    <label htmlFor="edescription" className="form-label fw-semibold">
                      Description
                    </label>
                    <textarea
                      name="edescription"
                      className="form-control"
                      id="edescription"
                      rows="3"
                      placeholder="Enter description"
                      minLength="5"
                      required
                      onChange={onChange}
                      value={note.edescription}
                    ></textarea>
                    {errors.find((err) => err.param === "description") && (
                      <small className="text-danger">
                        {errors.find((err) => err.param === "description").msg}
                      </small>
                    )}
                  </div>

                  <div className="mb-3">
                    <label htmlFor="etag" className="form-label fw-semibold">
                      Tag
                    </label>
                    <input
                      type="text"
                      name="etag"
                      className="form-control"
                      id="etag"
                      placeholder="Optional tag"
                      minLength="3"
                      onChange={onChange}
                      value={note.etag}
                    />
                  </div>
                </form>
              </div>

              <div className="modal-footer border-0 px-4 pb-4">
                <button
                  type="button"
                  ref={refClose}
                  className="btn btn-outline-secondary rounded-3"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-success rounded-3"
                  onClick={handleUpdateNote}
                >
                  Update Note
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Notes Section */}
        <div className="my-4">
          <h3 className="fw-semibold text-success mb-3">🗒️ Your Notes</h3>
          <div className="row">
            {notes.length === 0 ? (
              <p className="text-muted">No notes to display. Add one above!</p>
            ) : (
              notes.map((note) => (
                <Noteitem key={note._id} updateNote={updateNote} note={note} />
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Notes;
