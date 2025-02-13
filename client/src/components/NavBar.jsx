import React from "react";
import { Home, Package, Heart, PlusCircle, BarChart } from "lucide-react";

const NavBar = () => {
  return (
    <nav className="navbar">
      {/* Logo */}
      <h1 id="logo">Logo</h1>

      {/* Navigation Links */}
      <ul className="nav-list">
        <li className="nav-item">
          <a href="#">
            <Home size={25} />
          </a>
        </li>
        <li className="nav-item">
          <a href="#">
            <Package size={25} />
          </a>
        </li>
        <li className="nav-item">
          <a href="#">
            <Heart size={25} />
          </a>
        </li>
        <li className="nav-item">
          <a href="#">
            <PlusCircle size={25} />
          </a>
        </li>
        <li className="nav-item">
          <a href="#">
            <BarChart size={25} />
          </a>
        </li>
      </ul>

      {/* Profile Section */}
      <div id="profile">
        <img
          src="https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D"
          alt="User Profile"
        />
      </div>
    </nav>
  );
};

export default NavBar;
