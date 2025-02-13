import React from 'react'

const LoginPage = () => {
  return (
    <div className="auth-container">
      <div className="image-section">
        <img src="https://img.freepik.com/free-photo/view-3d-personal-computer-with-workstation-office-items_23-2150714107.jpg?t=st=1739427528~exp=1739431128~hmac=733c67d6822c52539d685bfafe592adffb31d052550d09b27473528986687bed&w=740" alt="" />
      </div>
      <div className="form-section">
        <h1>Register Here</h1>
        <form action="" id="login-form">
          <input type="text" placeholder='enter your full name' name='name' required/>
          <input type="text" placeholder='enter your email' name='email'/>
          <input type="text" placeholder='enter your phone number' name='phonenumber'/>
          <input type="text" placeholder='enter your detailed address' name='address'/>
          <input type="text" placeholder='enter your geo location' name='location'/>
          <input type="text" placeholder='enter your password' name='password'/>

          <button type='submit'>Register</button>
        </form>
      </div>
    </div>
  )
}

export default LoginPage