import React, { useState } from "react";
import { handleUpload } from "../utils/imageupload";
import toast from "react-hot-toast";
import axios from "axios";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phonenumber: "",
    password: "",
    address: "",
    latitude: "",
    longitude: "",
    avatar: null,
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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

      setFormData({ ...formData, avatar: uploadedAvatar });
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
        coordinates: [formData.longitude, formData.latitude],
      },
      avatar: formData.avatar,
    };

    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/auth/register",
        userObject,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        toast.success("User registered successfully");
        console.log(response.data);
      } else {
        toast.error("Cannot register");
      }
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("Something went wrong during registration");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter your fullname"
        name="name"
        required
        value={formData.name}
        onChange={handleChange}
      />
      <input
        type="email"
        placeholder="Enter your email"
        name="email"
        required
        value={formData.email}
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="Enter your phone number"
        name="phonenumber"
        required
        value={formData.phonenumber}
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
      <textarea
        placeholder="Enter your address"
        name="address"
        required
        value={formData.address}
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="Enter your latitude"
        name="latitude"
        required
        value={formData.latitude}
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="Enter your longitude"
        name="longitude"
        required
        value={formData.longitude}
        onChange={handleChange}
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

export default Register;
