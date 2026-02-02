import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../context/Auth";
import ProductForm from "../../Forms/ProductForm";
import { handleUpload } from "../../utils/imageupload";
import { getData, patchData } from "../../API/axios";
import { useProducts } from "../../Hooks/useProducts";
import { useImageUpload } from "../../Hooks/useImage";
import { useEffect, useState } from "react";

const EditProducts = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { fetchMyProductById, update, product, loading, error } = useProducts();
  const [defaultValues, setDefaultValues] = useState(null);
  const { images, setImages, uploadAtIndex } = useImageUpload([]);

  useEffect(() => {
    fetchMyProductById(id);
  }, [id]);

  useEffect(() => {
    if (!product) return;

    setDefaultValues({
      name: product.name,
      description: product.description,
      category: product.category,
      price: product.price,
    });
    setImages(product.images || []);
  }, [product]);



  const handleSubmit = async (formData) => {
    const response = await update(id, { ...formData, images });

    if (response.success) {
      navigate("/dashboard/items");
    }

  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div id="container">
      <div id="form-holder">
        {defaultValues && (
          <ProductForm
            defaultValues={defaultValues}
            images={images}
            onSubmit={handleSubmit}
            handleFileUpload={uploadAtIndex}
          />
        )}
      </div>
    </div>
  );
};

export default EditProducts;
