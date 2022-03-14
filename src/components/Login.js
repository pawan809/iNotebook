import React, {useState} from "react";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
    const [credentials, setCredentials] = useState({email:'', password: ''});
   const navigate = useNavigate();

    const handleSubmit = async (e) =>{
       e.preventDefault();
       const response = await fetch(`http://localhost:5000/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email:credentials.email, password: credentials.password }),
      });
      const json = await response.json();
      console.log(json);
      if(json.success)
      {
          // save the auth token and redirect
          localStorage.setItem('Token',json.authToken);
          props.showAlert('Logged in successfully','success : ');
          navigate('/');
          
      }
      else
      {
        props.showAlert('Invalid credentails.','danger : ');
          
      }
    }
    const onChange = (e) =>{
        setCredentials({...credentials, [e.target.name]: e.target.value});
      }

  return (
    <>
    <div className="mt-3">
    <h2>Login to continue to iNotebook</h2>
    <form action="" onSubmit={handleSubmit}>
      <div className="mb-3 mt-3">
        <label htmlFor="email" className="form-label">
          Email:
        </label>
        <input
          type="email"
          className="form-control"
          id="email"
          placeholder="Enter email"
          name="email" onChange={onChange}
          value={credentials.email}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">
          Password:
        </label>
        <input
          type="password"
          className="form-control"
          id="password"
          placeholder="Enter password"
          name="password" onChange={onChange}
          value={credentials.password}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form></div>
    </>
  );
};

export default Login;
