import { useState } from "react";
import { handleUpload } from "../../utils/imageupload";
import toast from "react-hot-toast";
import axios from "axios";
import ProductForm from "../../Forms/ProductForm";
import { useAuth } from "../../context/Auth";
import { postData } from "../../API/axios";

const AddProducts = () => {
  const [productImages, setProductImages] = useState([]);
  const { user } = useAuth();

  const handleFileUpload = async (input, index) => {
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
    const imageArray = productImages;

    if (imageArray.length < 4 || imageArray.some((i) => !i)) {
      toast.error("Please upload 4 images");
      return;
    }

    const payload = {
      ...formData,
      images: imageArray,
    };

    try {
      const response = await postData(
        "product/",
        payload,
        user?.token
      );

      if (response.success) {
        toast.success("Product added successfully");
        // setProductImages([]);
        console.log(response.data)
        Navigate("/manage-products")
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to add product");
    }
  };

  return (
    <div id="container">
      <div id="form-holder">
        <ProductForm
          onSubmit={handleSubmit}
          images={productImages}
          handleFileUpload={handleFileUpload}
        />
      </div>
    </div>
  );
};

export default AddProducts;
