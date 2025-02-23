import React from 'react'
import Login from '../components/Login'

const LoginPage = () => {
  return (
    <div id="container">
        <div id="image-holder">
            <img src="https://img.freepik.com/premium-photo/house-with-black-roof-black-door-that-says-welcome-front_1261459-3805.jpg?ga=GA1.1.264547320.1740062602&semt=ais_hybrid" alt="" />
        </div>
        <div id="form-holder">
            <Login/>
        </div>
    </div>
  )
}

export default LoginPage