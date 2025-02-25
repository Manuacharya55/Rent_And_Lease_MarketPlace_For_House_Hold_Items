import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./style/form.css";
import "./style/NavBar.css";
import "./style/profile.css";
import "./style/productdescription.css";
import "./style/card.css";
import "./style/dashboard.css";
import "./style/homepage.css";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfileCard from "./components/ProfileCard";
import AddProductPage from "./pages/AddProductPage";
import ProductDescriptionPage from "./pages/ProductDescriptionPage";
import ProductsPage from "./pages/ProductsPage";
import ProtectedRoute from "./components/ProtectedRoute";
import ProtectedLayout from "./components/ProtectedLayout";
import HomePage from "./pages/HomePage";
import WishlistPage from "./pages/WishlistPage";
import DashBoard from "./pages/DashBoard";
import DashBoardProductPage from "./pages/DashBoardProductPage";
import EditProduct from "./components/EditProduct";
import EditProductPage from "./pages/EditProductPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route element={<ProtectedRoute />}>
          <Route element={<ProtectedLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/profile" element={<ProfileCard />} />
            <Route path="/wishlist" element={<WishlistPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/product/:id" element={<ProductDescriptionPage />} />
            <Route path="/addProduct" element={<AddProductPage />} />
            <Route path="/dashboard" element={<DashBoard />} />
            <Route path="/dashboard/insights" element={<DashBoard />} />
            <Route path="/dashboard/items" element={<DashBoardProductPage />} />
            <Route path="/dashboard/insights" element={<DashBoard />} />
            <Route path="/dashboard/edit/:id" element={<EditProductPage />} />
            
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
