import React, { useState } from "react";
import { handleUpload } from "../utils/imageupload";
import toast from "react-hot-toast";
import axios from "axios";
import { useAuth } from "../context/Auth";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const category = [
    "Kitchen",
    "Bedroom",
    "Electronics",
    "Bathroom",
    "Furniture",
    "Kitchenware",
    "Clothing",
    "Laundry Care",
    "Decor",
  ];

  const [imageArray, setImageArray] = useState([]);

  const [form, setForm] = useState({
    productName: "",
    description: "",
    category: "",
    price: "",
    productImage: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    console.log(form);
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];

    if (!file) {
      toast.error("File Not Selected");
      return;
    }

    try {
      const uploadedAvatar = await toast.promise(handleUpload(file), {
        loading: "Uploading image...",
        success: "Image uploaded successfully!",
        error: "Failed to upload image.",
      });

      // ✅ Append new image to the array instead of resetting it
      setImageArray((prev) => [...prev, uploadedAvatar]);
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Something went wrong");
    }
  };

  const addProduct = async (e) => {
    e.preventDefault();
    console.log(imageArray);
    if (imageArray.length === 4) {
      const updatedForm = { ...form, productImage: imageArray };
      console.log(updatedForm);
      try {
        const response = await axios.post(
          "http://localhost:4000/api/v1/product/",
          updatedForm,
          {
            headers: {
              "Content-Type": "application/json",
              "auth-token": user.token,
            },
          }
        );

        if (response.data.success) {
          toast.success("Product added successfully");
          console.log(response.data.data);
          setForm((prev) => ({
            ...prev,
            productName: "",
            description: "",
            category: "",
            price: "",
          }));
        }
      } catch (error) {
        console.log(error);
        toast.error("Please upload image");
      }
    } else {
      toast.error("Please upload image");
    }
  };

  return (
    <form onSubmit={addProduct}>
      <input
        type="text"
        name="productName"
        placeholder="enter product name"
        value={form.productName}
        onChange={handleChange}
        required
      />
      <textarea
        name="description"
        id=""
        placeholder="enter product description"
        onChange={handleChange}
        value={form.description}
        required
      ></textarea>
      <input
        type="number"
        name="price"
        placeholder="enter product price"
        value={form.price}
        onChange={handleChange}
        required
      />
      <select
        name="category"
        onChange={handleChange}
        required
        value={form.category}
      >
        <option value="" disabled>
          Select a category
        </option>{" "}
        {/* Add this line */}
        {category.map((list, index) => (
          <option value={list} key={index}>
            {list}
          </option>
        ))}
      </select>

      <input type="file" onChange={handleFileUpload} />
      <input type="file" onChange={handleFileUpload} />
      <input type="file" onChange={handleFileUpload} />
      <input type="file" onChange={handleFileUpload} />
      <button type="submit">Add Product</button>
    </form>
  );
};

export default AddProduct;
