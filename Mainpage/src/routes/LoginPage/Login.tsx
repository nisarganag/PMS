import React from 'react'
import Login from './LoginData'
import './Login.css'

const LoginMain = () => {
  return (
    <div className='container-design'>
      <ul className="circles">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
      </ul>
      <div className='login-message'>
        <h1>  Hello there,  </h1>
        <h1> How you doing </h1>
      </div>
      <Login/>
    </div>
  )
}

export default LoginMain
