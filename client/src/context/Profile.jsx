import axios from "axios";
import { useContext, createContext, useState, useEffect } from "react";
import { useAuth } from "./Auth";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
   const [wishlist, setWishlist] = useState([]);
   const {user}=useAuth()
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phonenumber: "",
    avatar: "",
    address: "",
    location: "",
  });

  useEffect(()=>{
    const fetchProfile = async () => {

      if(!user) return

      const { data } = await axios.get("http://localhost:4000/api/v1/auth/myprofile", {
        headers: {
          "Content-Type": "application/json",
          "auth-token": user.token
        },
      });
      console.log(data)
      setProfile(data.data);
    };
    fetchProfile();
  },[user])
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
