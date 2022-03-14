import React,{ useContext,useState } from 'react';
import noteContext from "../context/notes/noteContext";

export const AddNote = (props) => {

    const context = useContext(noteContext);
  const { addNote } = context;

  const [note, setNote] = useState({title: "", description: "",tag: ""});

  const handleClick = (e) =>{
      e.preventDefault();
    addNote(note.title, note.description,note.tag);
    setNote({title: "", description: "",tag: ""});
    props.showAlert('Added successfully', 'success : ');
  }

  const onChange = (e) =>{
    setNote({...note, [e.target.name]: e.target.value});
  }

  return (
    <div className="container my-3">
        <h1>Add a Note</h1>
        <form action="">
          <div className="form-group">
            <label htmlFor="title">Title:</label>
            <input type="text" className="form-control" id="title" value={note.title} minLength={5} required name="title" onChange={onChange} />
          </div>
          <div className="form-group">
            <label htmlFor="desc">Description:</label>
            <input type="text" className="form-control" id="description" value={note.description} minLength={5} required name="description" onChange={onChange} />
          </div>
          <div className="form-group">
            <label htmlFor="tag">Tag:</label>
            <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={onChange} />
          </div>

          <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary my-3" onClick={handleClick}>
            Add Note
          </button>
        </form>
      </div>
  )
}
