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
    if (response?.success) {
      setToken(response?.data?.token, response?.data?.user?._id);
      navigate(`/add-address/`);
    }
    setIsProcessing(false);
  };

  return (
    <div className="auth-container">
      <div className="auth-image-holder">
        <img src="https://img.freepik.com/free-photo/hand-presenting-model-house-home-loan-campaign_53876-104970.jpg?t=st=1740200000~exp=1740203600~hmac=d8c9735626359286699252062562477382498262624558256" alt="Register" />
      </div>
      <div className="auth-form-holder">
        <h2 style={{ marginBottom: "20px" }}>Create Account</h2>
        <RegisterForm handleSubmit={handleRegister} isProcessing={isProcessing} />
      </div>
    </div>
  );
};

export default Register;

