import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../context/Auth";
import ProductForm from "../../Forms/ProductForm";
import axios from "axios";
import toast from "react-hot-toast";
import { handleUpload } from "../../utils/imageupload";
import { getData, patchData } from "../../API/axios";

const EditProducts = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { id } = useParams();

  const [defaultValues, setDefaultValues] = useState(null);
  const [productImages, setProductImages] = useState([]);

  const loadProduct = async () => {
    if (!user || !id) return;

    try {
      const response = await getData(
        `product/${id}`,{},user?.token
      );

      if (response.success) {
        const { data } = response;
        console.log(data)
        setDefaultValues({
          name: data.name,
          description: data.description,
          category: data.category,
          price: data.price,
        });
        setProductImages(data.images || []);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user?.token) loadProduct();
  }, [user, id]);

  const handleFileUpload = async (input, index) => {
    if (index === undefined || index === null) {
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

      setProductImages((prev) => {
        const images = [...prev];
        images[index] = url;
        return images;
      });
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Something went wrong");
    }
  };


  const handleSubmit = async (formData) => {
    const payload = {
      ...formData,
      productImage: productImages,
    };

      const response = await patchData(
        `product/${id}`,
        payload,
        user?.token
      );

      if (response.success) {
        navigate("/dashboard/items");
      }

  };

  return (
    <div id="container">
      <div id="form-holder">
        {defaultValues && (
          <ProductForm
            defaultValues={defaultValues}
            images={productImages}
            onSubmit={handleSubmit}
            handleFileUpload={handleFileUpload}
          />
        )}
      </div>
    </div>
  );
};

export default EditProducts;
