import React from "react";
import { Heart } from "lucide-react";
const ProductCard = () => {
  return (
    <div
      className="card"
      style={{
        backgroundImage: `url('https://agileequipment.com.au/wp-content/uploads/2023/09/ddf485z-brushless-drill.jpg')`,
      }}
    >
      <Heart size={25} />

      <div className="prod-details">
        <h2>Product Name</h2>
        <a href="">read more</a>
      </div>
    </div>
  );
};

export default ProductCard;
