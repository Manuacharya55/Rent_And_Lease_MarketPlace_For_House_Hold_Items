import React from "react";

const DashboardProductCard = ({ props }) => {
  const { productName, category, price, productImage, isWishlist } = props;
  return (
    <div id="prod-card">
      <div
        id="prod-img"
        style={{
          backgroundImage: `url("${productImage[0]}")`,
        }}
      ></div>
      <div id="prod-detail">
        <h2>{productName}</h2>
        <div id="btn-holder">
          <button id="edit">Edit</button>
          <button id="delete"> Delete</button>
        </div>
      </div>
    </div>
  );
};

export default DashboardProductCard;
