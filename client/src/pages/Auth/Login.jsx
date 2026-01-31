import React, { useState } from 'react';
import LoginForm from '../../Forms/LoginForm';
import { postData } from '../../API/axios';
import { useNavigate } from 'react-router-dom'; // Assuming react-router-dom is used
import toast from 'react-hot-toast'; // Assuming toast is used based on axios.js

const Login = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  // const navigate = useNavigate(); // initialize if routing is needed

  const handleLogin = async (data) => {
    setIsProcessing(true);
    try {
      const response = await postData('/auth/login', data);
      if (response.success) {
        // Handle success, e.g., store token, navigate
        // localStorage.setItem('token', response.token);
        // navigate('/');
      }
    } catch (error) {
      console.error("Login failed", error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div id="container">
        <div id="image-holder">
            <img src="https://img.freepik.com/premium-photo/house-with-black-roof-black-door-that-says-welcome-front_1261459-3805.jpg?ga=GA1.1.264547320.1740062602&semt=ais_hybrid" alt="Welcome Home" />
        </div>
        <div id="form-holder">
            <h2>Welcome Back</h2>
            <LoginForm handleSubmit={handleLogin} isProcessing={isProcessing} />
        </div>
    </div>
  );
};

export default Login;
