import React, { useState } from "react";

const ProductDescriptionPage = () => {
  const arrayimg = [
    "https://www.nilkamalsleep.com/cdn/shop/products/1_1d1a083a-da76-42de-bb7f-736734daf46a.jpg?v=1667222419",
    "https://thesleepcompany.in/cdn/shop/files/Adjustable_Plush_Pillow_01_73819371-924c-48af-abe9-38a21dc0d586.jpg?v=1739167981&width=1445",
    "https://m.media-amazon.com/images/I/61uWAPZJbcL._AC_UF894,1000_QL80_.jpg",
    "https://www.nilkamalsleep.com/cdn/shop/products/4_fcf9c223-3480-449b-bad5-0190083d0dcc_650x.jpg?v=1667222422",
  ];

  const prod = {
    _id: "67ade26e7a2c9df6b02507d6",
    productName: "Wooden Chair compartment",
    description:
      "Elegant wooden chair with cushioned seat, perfect for home and office.",
    category: "Furniture",
    price: 1200,
    isActive: true,
    isRented: false,
    reviewId: [],
    productImage: [
      "https://m.media-amazon.com/images/I/71q2gVy8zEL.jpg",
      "https://m.media-amazon.com/images/I/71q2gVy8zEL.jpg",
    ],
    userId: {
      _id: "67ade26e7a2c9df6b02507d6",
      name: "Manu",
      email: "manu@gmail.com",
      phonenumber: 9876543210,
      address: "pesitm shivamogga",
      avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ718nztPNJfCbDJjZG8fOkejBnBAeQw5eAUA&s",
    },
    createdAt: "2025-02-14T09:30:00.000Z",
    updatedAt: "2025-02-14T09:30:00.000Z",
    __v: 0,
  };

  const [image, setImage] = useState(arrayimg[0]);

  return (
    <div className="product-container">
      <div className="product-image-holder">
        <div className="main-image">
          <img src={image} alt="" />
        </div>
        <div className="all-img">
          <div className="sml-img" onClick={() => setImage(arrayimg[0])}>
            <img src={arrayimg[0]} alt="" />
          </div>
          <div className="sml-img" onClick={() => setImage(arrayimg[1])}>
            <img src={arrayimg[1]} alt="" />
          </div>
          <div className="sml-img" onClick={() => setImage(arrayimg[2])}>
            <img src={arrayimg[2]} alt="" />
          </div>
          <div className="sml-img" onClick={() => setImage(arrayimg[3])}>
            <img src={arrayimg[3]} alt="" />
          </div>
        </div>
      </div>
      <div className="product-desc-holder">
        <h1 id="prod-name">{prod.productName}</h1>
        <h3 id="prod-category">{prod.category}</h3>
        <p id="prod-desc">{prod.description}</p>
        <h1 id="prod-price">{prod.price} Rs</h1>

        <h3>Owner Details</h3>
        <div className="profile">
          <img src={prod.userId.avatar} alt="" id="avatar" />
          <h3>{prod.userId.name}</h3>
          <p>{prod.userId.address}</p>
          <p>{prod.userId.phonenumber}</p>
        </div>
        <div className="btn-holder">
          <button id="wishlist">add to wishlist</button>
          <button id="rent">Take Rent</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDescriptionPage;
