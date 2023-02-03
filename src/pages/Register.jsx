import React, { useEffect, useState } from 'react'
import './assets/Signin.css'
import axios from 'axios'
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const url = 'http://localhost:8000/api/';

  useEffect(() => {
    if (localStorage.getItem('user-data')) {
      navigate('/')
    }
  })
  
  // Handling the form submission
  const handleSubmit = async (e) => {    
    e.preventDefault();   

    if (name == " " || email == " " || password == " ")
    {
      alert("Fields must not be empty");
      return;
    }
    try {
      await fetch(`${url}register`, {
        method: "POST",
        mode:'cors',
        body: JSON.stringify({
          name,
          email,
          password,
        }),
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error_message) {
            alert(data.error_message);
          } 
          else if(data.status == false)
          {
            console.log(data)
            alert(data.message);
            setName("") 
            setEmail("")
            setPassword("")
          }
          else {
            console.log(data)
            alert("Account created successfully!");
            localStorage.setItem("user-data", JSON.stringify(data))
            window.location.reload()
          }
        })
        .catch((err) => console.error(err));
    }
    catch (error)
    {
      console.log(error)
    }
  }

  const gotoLoginPage = () => navigate("/login");

  return (
    <div className='container'>
      <main className="form-signin w-100 m-auto">        
        <form onSubmit={handleSubmit}>
          <h1 className="h3 mb-3 fw-normal">Signup</h1>

          <div className="form-floating">
            <input 
              type="text" 
              onChange={(e) => setName(e.target.value)}
              value={name} 
              required 
              className="form-control" 
              name="name"  
            />
            <label for="name">Name</label>
          </div>
          <div className="form-floating pt-2 mt-2">
            <input 
              type="email" 
              onChange={(e) => setEmail(e.target.value)} 
              value={email} 
              required
              className="form-control" 
              name="email" 
            />
            <label for="email">Email address</label>
          </div>
          <div className="form-floating pt-2 mt-2">
            <input 
              type="password" 
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required 
              className="form-control" 
              name="password" 
            />
            <label for="password">Password</label>
          </div>
         
          <button className="w-100 btn btn-lg btn-primary" type="submit">Register</button>
          <p>
            Already have an account?{" "}
            <span className='link' onClick={gotoLoginPage}>
              Login
            </span>
          </p>
        </form>
      </main>
    </div>
  )
}

export default Register