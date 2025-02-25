import React, { useEffect, useState } from "react";
import { handleUpload } from "../utils/imageupload";
import toast from "react-hot-toast";
import axios from "axios";
import { useAuth } from "../context/Auth";
import { useNavigate, useParams } from "react-router-dom";

const EditProduct = () => {
  const [isLoading, setIsLoading] = useState([]);
  const navigate = useNavigate();
  const { user } = useAuth();
  const category = [
    "Kitchen",
    "Bedroom",
    "Living Room",
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

  const { id } = useParams();
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
        }
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
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const editProduct = async (e) => {
    e.preventDefault();

      const updatedForm = { ...form, productImage: imageArray };
      try {
        const response = await axios.patch(
          `http://localhost:4000/api/v1/product/${id}`,
          updatedForm,
          {
            headers: {
              "Content-Type": "application/json",
              "auth-token": user.token,
            },
          }
        );

        if (response.data.success) {
          toast.success("Product updated successfully");
          console.log(response.data.data);
          navigate("/dashboard")
        }
      } catch (error) {
        console.log(error);
        toast.error("Please upload image");
      }
  };

  return (
    <form onSubmit={editProduct}>
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
        id=""
        onChange={handleChange}
        required
        value={form.category}
      >
        {category.map((list, index) => (
          <option value={list} key={index}>
            {list}
          </option>
        ))}
      </select>
      <div id="edit-image-holder">
        <img src={form.productImage[0]} alt="" />
        <img src={form.productImage[1]} alt="" />
        <img src={form.productImage[2]} alt="" />
        <img src={form.productImage[3]} alt="" />
      </div>
      <button type="submit">Edit Product</button>
    </form>
  );
};

export default EditProduct;
