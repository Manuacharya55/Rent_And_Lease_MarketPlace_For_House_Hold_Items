import React from "react";
import Banner from "../components/Banner";
import Category from "../components/Category";
import ProductCard from "../components/ProductCard";
const HomePage = () => {
  return (
    <div id="homepage">
      <Banner />

      <h1 id="heading">Product Categories</h1>
      <div id="category-holder">
        <Category />
        <Category />
        <Category />
        <Category />
        <Category />
        <Category />
        <Category />
        <Category />
        <Category />
      </div>

      <h1 id="heading">Trending Products</h1>
      <div id="trending">
        <ProductCard
          props={{
            productName: "Shoes",
            category: "Fashion",
            price: 200,
            productImage:
              ["https://cloud.appwrite.io/v1/storage/buckets/67b7203b0016cae0edb1/files/67b9737600219d9cd967/preview?project=67b71ca900384deaad08",]
          }}
        />
        <ProductCard
          props={{
            productName: "Shoes",
            category: "Fashion",
            price: 200,
            productImage:
              ["https://cloud.appwrite.io/v1/storage/buckets/67b7203b0016cae0edb1/files/67b9737600219d9cd967/preview?project=67b71ca900384deaad08",]
          }}
        />
        <ProductCard
          props={{
            productName: "Shoes",
            category: "Fashion",
            price: 200,
            productImage:
              ["https://cloud.appwrite.io/v1/storage/buckets/67b7203b0016cae0edb1/files/67b9737600219d9cd967/preview?project=67b71ca900384deaad08",]
          }}
        />
        <ProductCard
          props={{
            productName: "Shoes",
            category: "Fashion",
            price: 200,
            productImage:
              ["https://cloud.appwrite.io/v1/storage/buckets/67b7203b0016cae0edb1/files/67b9737600219d9cd967/preview?project=67b71ca900384deaad08",]
          }}
        />
        <ProductCard
          props={{
            productName: "Shoes",
            category: "Fashion",
            price: 200,
            productImage:
              ["https://cloud.appwrite.io/v1/storage/buckets/67b7203b0016cae0edb1/files/67b9737600219d9cd967/preview?project=67b71ca900384deaad08",]
          }}
        />
      </div>
    </div>
  );
};

export default HomePage;
