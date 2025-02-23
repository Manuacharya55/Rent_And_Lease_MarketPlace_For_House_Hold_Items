import { Heart } from "lucide-react";
import React from "react";

const ProductCard = ({ props }) => {
  const { productName, category, price, productImage } = props;

  return (
    <div id="prod-card">
      <div
        id="prod-img"
        style={{
          backgroundImage: `url("${productImage[0]}")`,
        }}
      >
      </div>
      <div id="prod-detail">
        <h2>{productName}</h2>
        <p id="category">{category}</p>
        <p id="prod-price">{price}rs</p>
      </div>
    </div>
  );
};

export default ProductCard;
