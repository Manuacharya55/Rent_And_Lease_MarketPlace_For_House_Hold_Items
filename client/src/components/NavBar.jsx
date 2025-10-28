import React from "react";
import { NavLink } from "react-router-dom";
import { Home, Package, Heart, PlusCircle, BarChart } from "lucide-react";
import { useUser } from "../context/Profile";

const NavBar = () => {
  const {profile} = useUser()
  return (
    <nav>
      <img src="https://images.scalebranding.com/stylish-r-logo-41e0dd9d-0f70-4060-bc2f-43da1ae11ffd.jpg" alt="" id="logo" />

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

      <NavLink to={"/myprofile"}>
        <div id="avatar">
          <img
            src={profile.avatar}
            alt=""
          />
        </div>
      </NavLink>
    </nav>
  );
};

export default NavBar;
