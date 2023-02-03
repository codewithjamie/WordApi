import React from "react";
import { Dictionary, Register, Login, Error, Favorites } from './pages/index'
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom'
import { Logout } from "./components/index"

function App() {
  const user = JSON.stringify(localStorage.getItem('user'))

  const LogoutUser = () => {
    localStorage.clear()
    window.location.reload()
  }

  return (
    <BrowserRouter>
      <nav className="py-2 bg-light border-bottom">
        <div className="container d-flex flex-wrap">
          <ul className="nav me-auto">
            <li className="nav-item">
              <Link to="/" className="nav-link link-dark px-2 active">Dictionary</Link>
            </li>
            <li className="nav-item">              
              <Link to="/favorites" className="nav-link link-dark px-2">Favorites</Link>  
            </li>
          </ul>
          <ul className="nav">
            {
              localStorage.getItem('user') ?
              <>
                <li className="nav-item">                  
                  <Link to="" onClick={LogoutUser} className="nav-link link-dark px-2">Logout</Link>  
                </li>
              </>
                :
              <>
                <li className="nav-item">
                  <Link to="/login" className="nav-link link-dark px-2">Login</Link>  
                </li>
                <li className="nav-item">
                  <Link to="/register" className="nav-link link-dark px-2">Signup</Link>  
                </li>
              </>
            }            
          </ul>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<div> <Dictionary /> </div>} />
        <Route path="/favorites" element={<div> <Favorites /> </div>} />
        <Route path="/login" element={<div> <Login /> </div>} />
        <Route path="/register" element={<div> <Register /> </div>} />
        <Route path="*" element={<h1> <Error /> </h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
