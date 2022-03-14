import React,{useContext} from "react";
import noteContext from "../context/notes/noteContext";

const Noteitem = (props) => {
  const { note, updateNote } = props;
  const context = useContext(noteContext);
  const { deleteNote } = context;

  return (
    <div className="col-md-3">
      <div className="card my-3">
        <div className="card-body">
            <div className="d-flex align-items-center">
                <i className="far fa-trash-alt mx-2" onClick={()=>{deleteNote(note._id); props.showAlert('Deleted successfully','success : ')}}>trash</i>
                <i className="far fa-edit mx-2" onClick={()=>{ updateNote(note);}}>edit</i>
                </div>
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text"> {note.description}</p>
          
        </div>
      </div>
    </div>
  );
};

export default Noteitem;
