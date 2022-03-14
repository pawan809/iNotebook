import React, {useState} from "react";
import { useNavigate } from "react-router-dom";

const Signup = (props) => {
    const [credentials, setCredentials] = useState({name:'' ,email:'', password: '',cpassword:''});
    const navigate = useNavigate();

    const {name,email,password} = credentials;

    const handleSubmit = async (e) =>{
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
         method: "POST",
         headers: {
           "Content-Type": "application/json",
         },
         body: JSON.stringify({ name,email,password }),
       });
       const json = await response.json();
       console.log(json);
       if(json.success)
       {
           // save the auth token and redirect
           localStorage.setItem('Token',json.authToken);
           navigate('/');
           props.showAlert('Account created successfully','success : ');
       }
       else{

        props.showAlert('Invalid credentails.','danger : ');
       }
       
    
       
     }


    const onChange = (e) =>{
        setCredentials({...credentials, [e.target.name]: e.target.value});
      }

  return (
    <>
    <div className="container mt-2">
     <h2 className="my-2">Create an account to use iNotebook</h2>
    <form action="" onSubmit={handleSubmit}>
    <div className="mb-3 mt-3">
    <label htmlFor="name" className="form-label">Name:</label>
    <input type="text" className="form-control" id="name" placeholder="Enter name"  name="name" onChange={onChange}/>
  </div>
  <div className="mb-3 mt-3">
    <label htmlFor="email" className="form-label">Email:</label>
    <input type="email" className="form-control" id="email" placeholder="Enter email" name="email" onChange={onChange}/>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password:</label>
    <input type="password" className="form-control" id="password" placeholder="Enter password" minLength={5} required name="password" onChange={onChange}/>
  </div>
  <div className="mb-3">
    <label htmlFor="cpassword" className="form-label">Confirm Password:</label>
    <input type="password" className="form-control" id="cpassword" placeholder="Enter confirm password" minLength={5} required name="cpassword" onChange={onChange}/>
  </div>
  
  <button type="submit" className="btn btn-primary">Submit</button>
</form></div></>
  )
}

export default Signup