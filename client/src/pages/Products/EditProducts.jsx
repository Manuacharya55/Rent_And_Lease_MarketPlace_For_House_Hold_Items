import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../context/Auth";
import ProductForm from "../../Forms/ProductForm";
import axios from "axios";
import toast from "react-hot-toast";

const EditProducts = () => {
  const [isLoading, setIsLoading] = useState([]);
  const navigate = useNavigate();
  const { user } = useAuth();
  const { id } = useParams();

  const [form, setForm] = useState({
    productName: "",
    description: "",
    category: "",
    price: "",
    productImage: [],
  });

  const loadProduct = async () => {
    if (!user) return;

    try {
      const response = await axios.get(
        `http://localhost:4000/api/v1/product/${id}`,
        {
          headers: {
            "Content-type": "application/json",
            "auth-token": user.token,
          },
        },
      );

      if (response.data.success) {
        const { data } = response.data;
        console.log(data);
        setForm({
          productName: data.productName,
          description: data.description,
          category: data.category,
          price: data.price,
          productImage: data.productImage,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user.token) loadProduct();
  }, [user]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    
    try {
      const response = await axios.patch(
        `http://localhost:4000/api/v1/product/${id}`,
        form,
        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": user.token,
          },
        },
      );

      if (response.data.success) {
        toast.success("Product updated successfully");
        console.log(response.data.data);
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error);
      toast.error("Please upload image");
    }
  };

    const handleFileUpload = async (input, index) => {
      // Accept either a File (from Image component) or an Event (from input)
      if (index === undefined || index === null) {
        console.warn("handleFileUpload called without index", index);
        return;
      }
  
      let file;
      if (input && input.target && input.target.files)
        file = input.target.files[0];
      else file = input;
  
      if (!file) return;
  
      try {
        const url = await toast.promise(handleUpload(file), {
          loading: "Uploading image...",
          success: "Image uploaded successfully!",
          error: "Failed to upload image.",
        });
  
        setData((prev) => {
          const images = Array.isArray(prev.productImage)
            ? [...prev.productImage]
            : [];
          images[index] = url;
          return { ...prev, productImage: images };
        });
      } catch (error) {
        console.error("Upload error:", error);
        toast.error("Something went wrong");
      }
    };

  return (
    <div id="container">
      <div id="form-holder">
        <ProductForm
            data={form}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            handleFileUpload={handleFileUpload}
        />
      </div>
    </div>
  );
};

export default EditProducts;
