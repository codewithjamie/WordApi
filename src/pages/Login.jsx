import React, { useState, useEffect } from 'react'
import "./assets/Signin.css"
import { useNavigate } from 'react-router-dom'
import './assets/Signin.css'

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate();

  const url = 'http://localhost:8000/api/';

  useEffect(() => {
    if( localStorage.getItem('user'))
    {
      navigate('/')
    }
  })

  const handleSignin = async (e) => {
    e.preventDefault();
    const formData = { email, password}

    // console.log(formData)

    let result = await fetch(`${url}login`, {
      method: "post",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },      
      body: JSON.stringify(formData),      
    })
    result = await result.json()
    localStorage.setItem('user', JSON.stringify(result))
    window.location.reload()
  }
  
  return (
    <div className='container'>
      <main className="form-signin w-100 m-auto">
        <form onSubmit={handleSignin}>
          <h1 className="h3 mb-3 fw-normal">Sign in</h1>
          <div className="form-floating">
            <input 
              type="email" 
              className="form-control" 
              name="email" 
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              />
            <label for="email">Email address</label>
          </div>
          <div className="form-floating pt-2 mt-2">
            <input 
              type="password" 
              className="form-control" 
              name="password" 
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <label for="password">Password</label>
          </div>
         
          <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
        </form>
      </main>
    </div>
  )
}

export default Login
