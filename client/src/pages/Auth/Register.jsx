import React, { useState } from "react";
import RegisterForm from "../../Forms/RegisterForm";
import { postData } from "../../API/axios";
import { useAuth } from "../../context/Auth";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const { setToken } = useAuth();
  const navigate = useNavigate();
  
  const handleRegister = async (data) => {
    setIsProcessing(true);
    const response = await postData("/auth/register", data);
    if(response?.success){
      console.log(response?.data?.user?._id,"id")
      console.log(response?.data?.token,"token")
      setToken(response?.data?.token, response?.data?.user?._id);
      navigate(`/add-address/`);
    }
    setIsProcessing(false);
  };

  return (
    <div id="container">
      <div id="image-holder">
       <img src="https://img.freepik.com/premium-photo/house-with-black-roof-black-door-that-says-welcome-front_1261459-3805.jpg?ga=GA1.1.264547320.1740062602&semt=ais_hybrid" alt="Register" />
      </div>
      <div id="form-holder">
        <h2>Create Account</h2>
        <RegisterForm handleSubmit={handleRegister} isProcessing={isProcessing} />
      </div>
    </div>
  );
};

export default Register;

