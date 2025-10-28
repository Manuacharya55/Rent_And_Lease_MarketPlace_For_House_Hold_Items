import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../context/Auth";
import { useUser } from "../context/Profile";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate()
  const { setToken } = useAuth();
  const { setProfile } = useUser();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/auth/login",
        formData
      );
      if (response.data.success) {
        const { name, email, phonenumber, avatar, address, location } =
          response.data.data;
          console.log(response.data);
        toast.success("Login successful");
        setToken(response.data.token, response.data.data.role);
        navigate("/")
        setProfile({ name, email, phonenumber, avatar, address, location });
      }
    } catch (error) {
      toast.error("Login unsuccessful");
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <h1>Login</h1>
      <input
        type="email"
        placeholder="Enter your email"
        name="email"
        required
        value={formData.email}
        onChange={handleChange}
      />

      <input
        type="password"
        placeholder="Enter your password"
        name="password"
        required
        value={formData.password}
        onChange={handleChange}
      />
      <button type="submit">Login</button>
      <a href="/register">Dont have a account</a>
    </form>
  );
};

export default Login;
