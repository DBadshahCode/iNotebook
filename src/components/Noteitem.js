import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";

const Noteitem = (props) => {
  const context = useContext(noteContext);
  const { deleteNote } = context;
  const { note, updateNote } = props;

  const getRandomColor = () => {
    const colors = ["#ff5733", "#33ff57", "#3357ff", "#ff33a1", "#ffcc33"];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <div className="col-md-3">
      <div className="card my-3">
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">{note.description}</p>
          {note.tag && (
            <span
              className="badge"
              style={{
                backgroundColor: getRandomColor(),
                color: "white",
                padding: "5px 10px",
                borderRadius: "15px",
                fontSize: "0.8rem",
                display: "inline-block",
                marginBottom: "10px",
              }}
            >
              {note.tag}
            </span>
          )}
          <i
            className="bi bi-trash mx-1"
            role="button"
            onClick={() => {
              deleteNote(note._id);
            }}
          ></i>
          <i
            className="bi bi-pencil-square mx-1"
            role="button"
            onClick={() => {
              updateNote(note);
            }}
          ></i>
        </div>
      </div>
    </div>
  );
};

export default Noteitem;
