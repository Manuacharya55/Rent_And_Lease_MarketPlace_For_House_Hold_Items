import React from "react";

const Category = ({ image, category }) => {
  return (
    <div id="category">
      <div id="category-icon">
        <img src={image} alt={category} />
      </div>
      <div id="category-name">
        <p>{category}</p>
      </div>
    </div>
  );
};

export default Category;

