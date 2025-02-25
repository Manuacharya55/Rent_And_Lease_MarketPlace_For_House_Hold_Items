import axios from "axios";
import { useContext, createContext, useLayoutEffect, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [wishlist, setWishlist ] = useState([]);
  const [isLoggedin,setIsLoggedIn] = useState(false)
  
  const setToken = (token, role) => {
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
    setUser({ token, role });
    setIsLoggedIn(true);
  };

  const getToken = () => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if(token&&role){
      setUser({ token, role });
      setIsLoggedIn(true)
    }
  };

  const loadWishlist = async () => {
    if (!user?.token) return;

    try {
      const response = await axios.get(
        "http://localhost:4000/api/v1/wishlist/",
        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": user.token,
          },
        }
      );

      if (response.data.success) {
        // console.log(response.data.data);
        setWishlist(response.data.data);
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  useLayoutEffect(() => {
    getToken();
  }, []);

  useEffect(() => {
    if (user?.token) {
      loadWishlist();
    }
  }, [user]);
  
  return <AuthContext.Provider value={{setToken,getToken,user,isLoggedin,wishlist, setWishlist}}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
