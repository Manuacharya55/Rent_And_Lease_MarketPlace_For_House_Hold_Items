import toast from "react-hot-toast";
import ProductForm from "../../Forms/ProductForm";

import { useImageUpload } from "../../Hooks/useImage";
import { useNavigate } from "react-router-dom";
import { useProducts } from "../../Hooks/useProducts";

const AddProducts = () => {
  const navigate = useNavigate();
  const { images, uploadAtIndex } = useImageUpload()
  const { create } = useProducts()

  const handleSubmit = async (formData) => {

    if (images.length < 4 || images.some((i) => !i)) {
      toast.error("Please upload 4 images");
      return;
    }
    try {
      const response = await create({ ...formData, images: images })

      if (response.success) {
        navigate("/dashboard/items")
      }
    } catch (error) {
      toast.error("Failed to add product");
    }
  };

  return (
    <div id="container">
      <div id="form-holder">
        <ProductForm
          onSubmit={handleSubmit}
          images={images}
          handleFileUpload={uploadAtIndex}
        />
      </div>
    </div>
  );
};

export default AddProducts;
