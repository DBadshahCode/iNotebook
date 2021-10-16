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
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE1ZjA2MDBkMTI2MmU1MzVkYjBmOWZlIn0sImlhdCI6MTYzMzYxNzQwOH0.ChlgnJeFGYPVbBTUPowcGJh4611It8N9WNYIWDRPOT8",
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
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE1ZjA2MDBkMTI2MmU1MzVkYjBmOWZlIn0sImlhdCI6MTYzMzYxNzQwOH0.ChlgnJeFGYPVbBTUPowcGJh4611It8N9WNYIWDRPOT8",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = response.json();
    console.log("Adding a new note");
    const note = {
      _id: "61322f19553781a8ca8d0e13",
      user: "6131dc5e3e4037cd4734a066",
      title: title,
      description: description,
      tag: tag,
      date: "2021-09-03T14:20:09.668Z",
      __v: 0,
    };
    setNotes(notes.concat(note));
  };

  const deleteNote = async (id) => {
    const response = await fetch(
      `${host}/api/notes/deletenote/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE1ZjA2MDBkMTI2MmU1MzVkYjBmOWZlIn0sImlhdCI6MTYzMzYxNzQwOH0.ChlgnJeFGYPVbBTUPowcGJh4611It8N9WNYIWDRPOT8",
        },
      }
    );
    const json = response.json();
    console.log(json);
    const delNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(delNotes);
  };

  const editNote = async (id, title, description, tag) => {
    const response = await fetch(
      `${host}/api/notes/updatenote/${id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE1ZjA2MDBkMTI2MmU1MzVkYjBmOWZlIn0sImlhdCI6MTYzMzYxNzQwOH0.ChlgnJeFGYPVbBTUPowcGJh4611It8N9WNYIWDRPOT8",
        },
        body: JSON.stringify({ title, description, tag }),
      }
    );
    const json = response.json();

    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }
    }
  };

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNote }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
