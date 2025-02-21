import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);

  const getNote = async () => {
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    console.log(json);
    setNotes(json);
  };

  const addNote = async (title, description, tag) => {
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    
    const json = await response.json();

    if (!response.ok) {
      return json.errors;
    }

    setNotes(notes.concat(json));
  };

  const deleteNote = async (id) => {
    let confirm = window.confirm("Are you sure");
    if (confirm === true) {
      const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });
      const json = await response.json();
      console.log(json);
      const delNotes = notes.filter((note) => {
        return note._id !== id;
      });
      setNotes(delNotes);
    }
  };

  const editNote = async (id, title, description, tag) => {
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag }),
    });

    const json = await response.json();

    if (!response.ok) {
      return json.errors;
    }
    
    let updateNotes = JSON.parse(JSON.stringify(notes));
    for (let index = 0; index < updateNotes.length; index++) {
      const element = updateNotes[index];
      if (element._id === id) {
        updateNotes[index].title = title;
        updateNotes[index].description = description;
        updateNotes[index].tag = tag;
        break;
      }
    }
    setNotes(updateNotes);
  };

  return (
    <NoteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, getNote }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
