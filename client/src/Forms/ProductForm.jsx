import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProductSchema } from "../schema/Product.Schema";
import Image from "../components/ui/Image";
import "../style/form.css";

const ProductForm = ({
  onSubmit, // Function to handle form submission
  defaultValues, // Initial values for editing
  images = [], // Array of image URLs
  handleFileUpload, // Function to handle image upload: (e, index) => void
  categories, // Optional list of categories
}) => {
  const defaultCategories = categories || [
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

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      name: "",
      price: "",
      category: "",
      description: "",
      ...defaultValues,
    },
  });

  // Sync defaultValues when they change (e.g. data loaded in EditProducts)
  useEffect(() => {
    if (defaultValues) {
      reset({
        name: "",
        price: "",
        category: "",
        description: "",
        ...defaultValues,
      });
    }
  }, [defaultValues, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} id="form-grid">
      <div className="auth-input-group">
        <label>Product Name</label>
        <input
          type="text"
          placeholder="Enter product name"
          {...register("name")}
          className={errors.name ? "error" : ""}
        />
        {errors.name && (
          <span className="error-text">{errors.name.message}</span>
        )}
      </div>

      <div className="auth-input-group">
        <label>Price</label>
        <input
          type="number"
          placeholder="Enter product price"
          {...register("price", { valueAsNumber: true })}
          className={errors.price ? "error" : ""}
        />
        {errors.price && (
          <span className="error-text">{errors.price.message}</span>
        )}
      </div>

      <div className="auth-input-group span-2">
        <label>Category</label>
        <select
          {...register("category")}
          className={errors.category ? "error" : ""}
        >
          <option value="" disabled>
            Select a category
          </option>
          {defaultCategories.map((cat, index) => (
            <option value={cat} key={index}>
              {cat}
            </option>
          ))}
        </select>
        {errors.category && (
          <span className="error-text">{errors.category.message}</span>
        )}
      </div>

      <div className="auth-input-group span-2">
        <label>Description</label>
        <textarea
          placeholder="Enter product description"
          {...register("description")}
          className={errors.description ? "error" : ""}
        ></textarea>
        {errors.description && (
          <span className="error-text">{errors.description.message}</span>
        )}
      </div>

      <div className="auth-input-group span-2 image-grid-container">
        <label>Product Images (4 required)</label>
        <div id="edit-image-holder">
          {Array.from({ length: 4 }).map((_, index) => (
            <Image
              key={`image-${index}`}
              index={index}
              url={images[index] || ""}
              handleImageChange={(e) => handleFileUpload(e, index)}
            />
          ))}
        </div>
      </div>

      <button type="submit" className="submit-btn span-2">
        {defaultValues?.name ? "Update Product" : "Add Product"}
      </button>
    </form>
  );
};

export default ProductForm;
