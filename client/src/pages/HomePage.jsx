import React from "react";
import Banner from "../components/Banner";
import Category from "../components/Category";
import ProductCard from "../components/ProductCard";

const kitchenSetImage = "../Assets/kitchen-set.png";

const HomePage = () => {
  return (
    <div id="homepage">
      <Banner />

      <h1 id="heading">Product Categories</h1>
      <div id="category-holder">
        <Category
          image="https://img.icons8.com/?size=100&id=1621&format=png&color=000000"
          category="Kitchen"
        />
        <Category
          image="https://img.icons8.com/?size=100&id=7546&format=png&color=000000"
          category="Bedroom"
        />
        <Category
          image="https://img.icons8.com/?size=100&id=9593&format=png&color=000000"
          category="Living Room"
        />
        <Category
          image="https://img.icons8.com/?size=100&id=y2GWL3nrlTBH&format=png&color=000000"
          category="Furniture"
        />
        <Category
          image="https://img.icons8.com/?size=100&id=25825&format=png&color=000000"
          category="Kitchenware"
        />
        <Category
          image="https://img.icons8.com/?size=100&id=22694&format=png&color=000000"
          category="Clothing"
        />
        <Category
          image="https://img.icons8.com/?size=100&id=14137&format=png&color=000000"
          category="Laundry Care"
        />
        <Category
          image="https://img.icons8.com/?size=100&id=W0zj8lF3hWRM&format=png&color=000000"
          category="Decor"
        />
        
      </div>
    </div>
  );
};

export default HomePage;
