import axios from "axios";
import { useContext, createContext, useLayoutEffect, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [wishlist, setWishlist ] = useState([]);
  const [isLoggedin,setIsLoggedIn] = useState(false)
  
  const setToken = (token, id) => {
    localStorage.setItem("token", token);
    localStorage.setItem("id", id);
    setUser({ token, id });
    setIsLoggedIn(true);
  };

  const getToken = () => {
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("id");
    if(token&&id){
      setUser({ token, id });
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
  
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    setUser(null);
    setIsLoggedIn(false);
  };

  return <AuthContext.Provider value={{setToken,getToken,user,isLoggedin,wishlist, setWishlist, logout}}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
