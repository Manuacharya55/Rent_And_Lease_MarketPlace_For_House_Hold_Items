import React from "react";
import Image from "../components/ui/Image";

const ProductForm = ({ data, handleChange, handleSubmit, categories, handleFileUpload }) => {
  const defaultCategories =
    categories ||
    [
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

  return (
    <form onSubmit={handleSubmit} id="form-grid">
      <input
        type="text"
        name="productName"
        placeholder="enter product name"
        value={data?.productName}
        onChange={handleChange}
        required
      />

      <input
        type="number"
        name="price"
        placeholder="enter product price"
        value={data.price}
        onChange={handleChange}
        required
      />

      <select
        name="category"
        onChange={handleChange}
        required
        value={data.category}
      >
        <option value="" disabled>
          Select a category
        </option>
        {defaultCategories.map((list, index) => (
          <option value={list} key={index}>
            {list}
          </option>
        ))}
      </select>

      <textarea
        name="description"
        placeholder="enter product description"
        onChange={handleChange}
        value={data.description}
        required
      ></textarea>

      {Array.from({ length: 4 }).map((_, index) => (
        <Image
          index={index}
          url={data?.productImage?.[index] || ""}
          handleImageChange={(e, i) => handleFileUpload(e, i)}
          key={`image-${index}`}
        />
      ))}

      <button type="submit">Add Product</button>
    </form>
  );
};

export default ProductForm;
