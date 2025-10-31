import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";

const Noteitem = (props) => {
  const { deleteNote } = useContext(noteContext);
  const { note, updateNote } = props;

  const getRandomColor = () => {
    const colors = ["#00b894", "#0984e3", "#6c5ce7", "#fdcb6e", "#e17055"];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <div className="col-lg-3 col-md-4 col-sm-6 mb-4">
      <div
        className="card border-0 shadow-sm h-100 rounded-4 hover-shadow"
        style={{
          transition: "transform 0.2s ease, box-shadow 0.3s ease",
        }}
      >
        <div className="card-body d-flex flex-column justify-content-between">
          <div>
            {/* Tag (if any) */}
            {note.tag && (
              <span
                className="badge mb-2"
                style={{
                  backgroundColor: getRandomColor(),
                  color: "white",
                  padding: "6px 12px",
                  borderRadius: "20px",
                  fontSize: "0.75rem",
                }}
              >
                {note.tag}
              </span>
            )}

            {/* Title */}
            <h5 className="card-title fw-bold text-success">{note.title}</h5>

            {/* Description */}
            <p
              className="card-text text-muted"
              style={{
                minHeight: "60px",
                fontSize: "0.9rem",
              }}
            >
              {note.description.length > 120
                ? note.description.substring(0, 120) + "..."
                : note.description}
            </p>
          </div>

          {/* Actions */}
          <div className="d-flex justify-content-end mt-3">
            <button
              className="btn btn-outline-danger btn-sm rounded-3 me-2"
              onClick={() => deleteNote(note._id)}
              title="Delete Note"
            >
              <i className="bi bi-trash"></i>
            </button>
            <button
              className="btn btn-outline-success btn-sm rounded-3"
              onClick={() => updateNote(note)}
              title="Edit Note"
            >
              <i className="bi bi-pencil-square"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Noteitem;
