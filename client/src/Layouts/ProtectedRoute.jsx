
import { useNavigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/Auth";

const ProtectedRoute = () => {
  const { isLoggedin } = useAuth();
  const navigate = useNavigate();
  return isLoggedin ? <Outlet /> : navigate("/login");
};

export default ProtectedRoute;
