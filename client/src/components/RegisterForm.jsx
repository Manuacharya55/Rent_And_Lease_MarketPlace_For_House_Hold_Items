import React, { useState, useEffect } from "react";
import { handleUpload } from "../utils/imageupload";
import toast from "react-hot-toast";
import axios from "axios";
import {useNavigate} from "react-router-dom"
const RegisterForm = ({ location }) => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phonenumber: "",
    password: "",
    address: "",
    latitude: location?.lat || "",
    longitude: location?.lng || "",
    country: location?.country || "",
    state: location?.state || "",
    district: location?.district || "",
    avatar: null,
  });

  // Update formData when location changes
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      latitude: location?.lat || "",
      longitude: location?.lng || "",
      country: location?.country || "",
      state: location?.state || "",
      district: location?.district || "",
    }));
  }, [location]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle file upload
  const handleFileChange = async (e) => {
    const file = e.target.files[0];

    if (!file) {
      toast.error("No file selected");
      return;
    }

    try {
      const uploadedAvatar = await toast.promise(handleUpload(file), {
        loading: "Uploading image...",
        success: "Image uploaded successfully!",
        error: "Failed to upload image.",
      });

      setFormData((prev) => ({ ...prev, avatar: uploadedAvatar }));
      console.log(uploadedAvatar)
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Something went wrong");
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const userObject = {
      name: formData.name,
      email: formData.email,
      phonenumber: formData.phonenumber,
      password: formData.password,
      address: formData.address,
      location: {
        type: "Point",
        coordinates: [Number(formData.longitude), Number(formData.latitude)], // Convert to numbers
        country: formData.country,
        state: formData.state,
        district: formData.district,
      },
      avatar: formData.avatar,
    };

    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/auth/register",
        userObject,
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.data.success) {
        toast.success("User registered successfully");
        console.log(response.data);
        navigate("/")
      } else {
        toast.error("Cannot register");
      }
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("Something went wrong during registration");
    }
  };

  return (
    <form onSubmit={handleSubmit} id="register-form">
      <h1>Register Here</h1>

      <input
        type="text"
        placeholder="Full Name"
        name="name"
        required
        value={formData.name}
        onChange={handleChange}
      />
      <input
        type="email"
        placeholder="Email"
        name="email"
        required
        value={formData.email}
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="Phone Number"
        name="phonenumber"
        required
        value={formData.phonenumber}
        onChange={handleChange}
      />
      <input
        type="password"
        placeholder="Password"
        name="password"
        required
        value={formData.password}
        onChange={handleChange}
      />
      <textarea
        placeholder="Address"
        name="address"
        required
        value={formData.address}
        onChange={handleChange}
      />

      {/* Automatically updated values from locationFetcher */}
      <input
        type="text"
        placeholder="Latitude"
        name="latitude"
        required
        value={formData.latitude}
        readOnly
      />
      <input
        type="text"
        placeholder="Longitude"
        name="longitude"
        required
        value={formData.longitude}
        readOnly
      />
      <input
        type="text"
        placeholder="Country"
        name="country"
        value={formData.country}
        readOnly
      />
      <input
        type="text"
        placeholder="State"
        name="state"
        value={formData.state}
        readOnly
      />
      <input
        type="text"
        placeholder="District"
        name="district"
        value={formData.district}
        readOnly
      />

      <input
        type="file"
        placeholder="Upload your avatar"
        required
        onChange={handleFileChange}
      />

      <button type="submit">Register</button>
    </form>
  );
};

export default RegisterForm;
