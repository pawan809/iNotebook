import React, { useContext,useEffect, useRef, useState} from "react";
import noteContext from "../context/notes/noteContext";
import { AddNote } from "./AddNote";
import Noteitem from "./Noteitem";
import { useNavigate } from "react-router-dom";

const Notes = (props) => {
  const context = useContext(noteContext);
  const { notes, getNotes, editNote } = context;
  const [note, setNote] = useState({id: "", etitle: "", edescription: "",etag: ""});
 const navigate = useNavigate();
  useEffect(() => {
    if(localStorage.getItem('Token'))
    {
      getNotes();
    }
    else
    {
      navigate('/login');
    }
    
  }, [getNotes])
 
  const updateNote = (currentNote) =>{
    ref.current.click();
    setNote({id: currentNote._id, etitle:currentNote.title, edescription: currentNote.description, etag:currentNote.tag});
    
  }


  const handleClick = (e) =>{
    e.preventDefault();
   // console.log('Updating new note...', note);
    editNote(note.id, note.etitle, note.edescription, note.etag);
    refClose.current.click();
    props.showAlert('Updated successfully','success : ');
 
}

const onChange = (e) =>{
  setNote({...note, [e.target.name]: e.target.value});
}

 const ref = useRef(null);
 const refClose = useRef(null);

  return (
      <>
      <AddNote showAlert = {props.showAlert}/>

  
<button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#myModal">
  Open modal
</button>


<div className="modal" id="myModal" >
  <div className="modal-dialog">
    <div className="modal-content">

     
      <div className="modal-header">
        <h4 className="modal-title">Edit Note</h4>
        <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
      </div>

      
      <div className="modal-body">
      <form action="">
          <div className="form-group">
            <label htmlFor="title">Title:</label>
            <input type="text" className="form-control" id="etitle" minLength={5} required name="etitle" value={note.etitle} onChange={onChange} />
          </div>
          <div className="form-group">
            <label htmlFor="desc">Description:</label>
            <input type="text" className="form-control" id="edescription" minLength={5} required  name="edescription" value={note.edescription} onChange={onChange} />
          </div>
          <div className="form-group">
            <label htmlFor="tag">Tag:</label>
            <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange} />
          </div>
        </form>
      </div>

      <div className="modal-footer">
        <button ref={refClose} type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
        <button disabled={note.etitle.length<5 || note.edescription.length<5} type="button" className="btn btn-primary" onClick={handleClick}>Update Note</button>
      </div>

    </div>
  </div>
</div>

    <div className="row my-3">
      <h1>Your Notes</h1>
      <div className="container mx-2">
      {notes.length===0 && 'No notes to display.'}
      </div>
      {notes.map((note) => {
        return <Noteitem key={note._id} updateNote={updateNote} note={note} showAlert = {props.showAlert} />;
      })}
    </div>
    </>
  );
};

export default Notes;
