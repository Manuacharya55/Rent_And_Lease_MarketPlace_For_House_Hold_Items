import React from "react";

const LoginPage = () => {
  return (
    <div className="auth-container">

      <div className="image-section">
        <h1>Rent And Lease Market Place For House Hold Items</h1>
      </div>

      <div className="form-section">
        <form action="" id="login-form">
        <h1>Login Here</h1>
          
          <input type="text" placeholder="enter your email" name="email" />
          <input
            type="text"
            placeholder="enter your password"
            name="password"
          />

          <button type="submit">Login</button>

          <a href="/login">Don't Have Account ?</a>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
