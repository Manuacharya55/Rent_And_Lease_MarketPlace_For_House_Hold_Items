import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./index.css";

import Profile from "./pages/Profile/Profile";
// import AddProductPage from "./pages/AddProductPage";
import ViewProducts from "./pages/Products/ViewProducts";
import ViewSingleProduct from "./pages/Products/ViewSingleProduct";
import ProductsPage from "./pages/ProductsPage";
import ProtectedRoute from "./components/ProtectedRoute";
import ProtectedLayout from "./components/ProtectedLayout";
import HomePage from "./pages/Home/HomePage";
import Wishlist from "./pages/Profile/Wishlist";
import DashBoard from "./pages/DashBoard";
import ManageProducts from "./pages/Products/ManageProducts";
import EditProductPage from "./pages/EditProductPage";
import CheckOutPage from "./pages/CheckOutPage";
import LeasedProducts from "./pages/LeasedProducts";
import MyOrders from "./pages/MyOrders";
import AddProducts from "./pages/Products/AddProducts";
import EditProduct from "./components/EditProduct";
import EditProducts from "./pages/Products/EditProducts";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import AddAddress from "./pages/Address/AddAddress";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/test" element={<EditProduct/>} />
        <Route element={<ProtectedRoute />}>
            <Route path="/add-address" element={<AddAddress />} />
          <Route element={<ProtectedLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/myprofile" element={<Profile />} />
            <Route path="/wishlist" element={<Wishlist />} />

            <Route path="/products" element={<ViewProducts />} />
            <Route path="/product/:id" element={<ViewSingleProduct />} />
            <Route path="/add-product" element={<AddProducts />} />

            <Route path="/checkout/:id" element={<CheckOutPage />} />
            <Route path="/dashboard" element={<DashBoard />} />
            <Route path="/dashboard/insights" element={<DashBoard />} />
            <Route path="/dashboard/items" element={<ManageProducts />} />
            <Route path="/dashboard/leased" element={<LeasedProducts />} />
            <Route path="/dashboard/orders" element={<MyOrders />} />
            <Route path="/dashboard/insights" element={<DashBoard />} />
            <Route path="/dashboard/edit/:id" element={<EditProducts />} />
            
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
