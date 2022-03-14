import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const s1 = {
    name: "pawan",
    class: "dev",
  };

  const [state, setState] = useState(s1);
  const update = () => {
    setTimeout(() => {
      setState({
        name: "pankaj",
        class: "10th",
      });
    }, 2000);
  };

  // Get all notes
  const [notes, setnotes] = useState([]);
  const getNotes = async () => {
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('Token'),
      }
    });

    const json = await response.json();
    console.log(json);
    setnotes(json);
  };
  

  // Add a note

  const addNote = async (title, description, tag) => {
    // api call

    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('Token')
      },
      body: JSON.stringify({ title, description, tag }),
    });

    const json = await response.json();
    //console.log(json);
    setnotes(notes.concat(json));
  };

  // delete a note

  const deleteNote = async (id) => {

    // ApI call

    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('Token')
      },
    });
    const json = await response.json();
    console.log(json);

    console.log("Deleting the note with id " + id);
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setnotes(newNotes);
  };

  // edit a note

  const editNote = async (id, title, description, tag) => {
    // api call

    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('Token')
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();
    console.log(json);

    const newNote = JSON.parse(JSON.stringify(notes));

    for (let index = 0; index < newNote.length; index++) {
      const element = newNote[index];
      if (element._id === id) {
        newNote[index].title = title;
        newNote[index].description = description;
        newNote[index].tag = tag;
        break;
      }
      
    }
    setnotes(newNote);
  };

  return (
    <NoteContext.Provider
      value={{
        state,
        update,
        notes,
        setnotes,
        addNote,
        deleteNote,
        editNote,
        getNotes,
      }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
