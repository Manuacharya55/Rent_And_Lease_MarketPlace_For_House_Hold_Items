import React from "react";
import { NavLink } from "react-router-dom";
import { Home, Package, Heart, PlusCircle, BarChart } from "lucide-react";

const NavBar = () => {
  return (
    <nav>
      <h1 id="logo">Logo</h1>

      <ul>
        <li>
          <NavLink to={"/"}>
            <Home />
            <div id="tooltip">home</div>
          </NavLink>
        </li>
        <li>
          <NavLink to={"/products"}>
            <Package />
            <div id="tooltip">Products</div>
          </NavLink>
        </li>
        <li>
          <NavLink to={"/wishlist"}>
            <Heart />
            <div id="tooltip">Wishlist</div>
          </NavLink>
        </li>
        <li>
          <NavLink to={"/addproduct"}>
            <PlusCircle />
            <div id="tooltip">Add Product</div>
          </NavLink>
        </li>
        <li>
          <NavLink to={"/dashboard"}>
            <BarChart />
            <div id="tooltip">Dashboard</div>
          </NavLink>
        </li>
      </ul>

      <NavLink to={"/profile"}>
        <div id="avatar">
          <img
            src="https://cloud.appwrite.io/v1/storage/buckets/67b7203b0016cae0edb1/files/67b73264001d650c3f7f/view?project=67b71ca900384deaad08&mode=admin"
            alt=""
          />
        </div>
      </NavLink>
    </nav>
  );
};

export default NavBar;
