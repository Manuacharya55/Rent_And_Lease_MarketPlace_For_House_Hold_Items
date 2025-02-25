import axios from "axios";
import { useContext, createContext, useState, useEffect } from "react";
import { useAuth } from "./Auth";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
   const [wishlist, setWishlist] = useState([]);
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phonenumber: "",
    avatar: "",
    address: "",
    location: "",
  });

  return (
    <UserContext.Provider
      value={{ setProfile, profile, wishlist, setWishlist }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const user = useContext(UserContext);

  if (!user) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return user;
};
