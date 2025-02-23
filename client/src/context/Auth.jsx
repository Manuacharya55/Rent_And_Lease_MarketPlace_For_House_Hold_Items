import { useContext, createContext, useLayoutEffect, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedin,setIsLoggedIn] = useState(false)
  const setToken = (token, role) => {
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
  };

  const getToken = () => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    setUser({ token, role });
    if(token&&role){
      setIsLoggedIn(true)
    }
  };

  useEffect(()=>{
    getToken()
  },[])
  return <AuthContext.Provider value={{setToken,getToken,user,isLoggedin}}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
