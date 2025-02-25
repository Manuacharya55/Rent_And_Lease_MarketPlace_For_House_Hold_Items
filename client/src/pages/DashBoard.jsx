import React from "react";
import DashBoardNavBar from "../components/DashBoardNavBar";

const DashBoard = () => {
  return (
    <div id="dashboard-container">
      <DashBoardNavBar />

      <div id="count-holder">
        <div id="count">
          <h1>10</h1>
          <p>Products</p>
        </div>
        <div id="count">
          <h1>10</h1>
          <p>Rented</p>
        </div>
        <div id="count">
          <h1>10</h1>
          <p>Free</p>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
