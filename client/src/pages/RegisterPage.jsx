import React from 'react'

const RegisterPage = () => {
  return (
    <div className="auth-container">

      <div className="image-section">
        <h1>Rent And Lease Market Place For House Hold Items</h1>
      </div>

      <div className="form-section">
        <form action="" id="register-form">
        <h1>Register Here</h1>
          <input
            type="text"
            placeholder="enter your full name"
            name="name"
            required
          />
          <input type="text" placeholder="enter your email" name="email" />
          <input
            type="text"
            placeholder="enter your phone number"
            name="phonenumber"
          />
          <input
            type="text"
            placeholder="enter your detailed address"
            name="address"
          />
          <input
            type="text"
            placeholder="enter your geo location"
            name="location"
          />
          <input
            type="text"
            placeholder="enter your password"
            name="password"
          />

          <button type="submit">Register</button>

          <a href="/login">Already Have Account ?</a>
        </form>
      </div>
    </div>
  )
}

export default RegisterPage