import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./index.css";

import Profile from "./pages/Profile/Profile";
import ViewProducts from "./pages/Products/ViewProducts";
import ViewSingleProduct from "./pages/Products/ViewSingleProduct";

import HomePage from "./pages/Home/HomePage";
import Wishlist from "./pages/Profile/Wishlist";
import ManageProducts from "./pages/Products/ManageProducts";

import AddProducts from "./pages/Products/AddProducts";
import EditProducts from "./pages/Products/EditProducts";

import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import AddAddress from "./pages/Address/AddAddress";
import Checkout from "./pages/Orders/Checkout";
import OrderPlaced from "./pages/Orders/OrderPlaced";
import ProtectedRoute from "./Layouts/ProtectedRoute";
import ProtectedLayout from "./Layouts/ProtectedLayout";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/test" element={<EditProducts/>} />
        <Route element={<ProtectedRoute />}>
            <Route path="/add-address" element={<AddAddress />} />
          <Route element={<ProtectedLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/myprofile" element={<Profile />} />
            <Route path="/wishlist" element={<Wishlist />} />

            <Route path="/products" element={<ViewProducts />} />
            <Route path="/product/:id" element={<ViewSingleProduct />} />
            <Route path="/add-product" element={<AddProducts />} />
            <Route path="/edit-product/:id" element={<EditProducts />} />

            <Route path="/checkout/:id" element={<Checkout />} />
            <Route path="/order-placed" element={<OrderPlaced />} />

            <Route path="/dashboard/items" element={<ManageProducts />} />
            <Route path="/dashboard/edit/:id" element={<EditProducts />} />
            
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
