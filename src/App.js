import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import NoteState from "./context/notes/NoteState";
import Alert from "./components/Alert";
import Login from "./components/Login";
import Signup from "./components/Signup";
import React, { useState } from 'react';

function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message,type) => {
    setAlert({
      msg: message,
      type: type
    });

    setTimeout(() => {
      setAlert(null);
    }, 2000);
}
  return (
    <>
    <NoteState>
      <Router>
        <Navbar />
        <Alert alert={alert} showAlert = {showAlert}/>
        <div className="container">
        <Routes>
          <Route path="/" exact element={<Home showAlert = {showAlert} />} />
        </Routes>
        <Routes>
          <Route path="/about" exact element={<About />} />
        </Routes>
        <Routes>
          <Route path="/login" exact element={<Login  showAlert = {showAlert} />} />
        </Routes>
        <Routes>
          <Route path="/signup" exact element={<Signup showAlert = {showAlert} />} />
        </Routes>
        </div>
      </Router>
      </NoteState>
    </>
  );
}

export default App;
