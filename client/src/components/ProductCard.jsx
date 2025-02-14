import React from "react";
import { Heart } from "lucide-react";
const ProductCard = ({props}) => {
  console.log(props)
  return (
    <div
      className="card"
      style={{
        backgroundImage: `url(${props.productImage[0]})`,
      }}
      key={props._id}
    >
      <Heart size={25} />

      <div className="prod-details">
        <h2>{props.productName}</h2>
        <a href={`/product/${props._id}`}>read more</a>
      </div>
    </div>
  );
};

export default ProductCard;
