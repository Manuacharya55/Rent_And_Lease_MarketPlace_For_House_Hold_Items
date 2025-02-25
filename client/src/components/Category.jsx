import { Armchair } from "lucide-react";
import React from "react";

const Category = () => {
  return (
    <div id="category">
      <div id="category-icon">
        <Armchair size={80}/>
      </div>
      <div id="category-name">
        <p>Furniture</p>
      </div>
    </div>
  );
};

export default Category;
