import { useState } from "react";
import { handleUpload } from "../../utils/imageupload";
import toast from "react-hot-toast";
import axios from "axios";
import ProductForm from "../../Forms/ProductForm";
import { useAuth } from "../../context/Auth";


const AddProducts = () => {
  const [data, setData] = useState({
    productName: "",
    description: "",
    category: "",
    price: "",
    productImage: [],
  });

  const handleChange = (e) => {
    setData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
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

  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const imageArray = data.productImage || [];

    if (imageArray.length < 4 || imageArray.some((i) => !i)) {
      toast.error("Please upload 4 images");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/product/",
        data,
        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": user?.token,
          },
        },
      );

      if (response.data && response.data.success) {
        toast.success("Product added successfully");
        // reset form
        setData({
          productName: "",
          description: "",
          category: "",
          price: "",
          productImage: [],
        });
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
          data={data}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          handleFileUpload={handleFileUpload}
        />
      </div>
    </div>
  );
};

export default AddProducts;
