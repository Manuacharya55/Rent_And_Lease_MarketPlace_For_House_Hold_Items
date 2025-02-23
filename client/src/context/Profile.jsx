import { useContext, createContext, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [profile, setProfile] = useState({
    name:'',
    email:'',
    phonenumber:'',
    avatar:'',
    address:'',
    location:''
  });
  const [wishlist, setWishlist] = useState([]);


  return <UserContext.Provider value={{setProfile,profile}}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const user = useContext(UserContext);

  if (!user) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return user;
};
