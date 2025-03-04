import React from "react";
import { useUser } from "../context/Profile";
import { NavLink } from "react-router-dom";

const ProfileCard = () => {
  const { profile } = useUser();
  return (
    <div id="profile">
        <div id="profile-avatar">
            <img src="https://cloud.appwrite.io/v1/storage/buckets/67b7203b0016cae0edb1/files/67b73264001d650c3f7f/view?project=67b71ca900384deaad08&mode=admin" alt="" />
        </div>
        <div id="profile-details">
            <h2>Manu Acharya</h2>
            <p>location : S N Nagar Sagar</p>
            <div id="contact">
                <a href="tel:9845092447">call</a>
                <a href="mailto:manu@gmail.com">mail</a>
            </div>
        </div>
    </div>
      
  );
};

export default ProfileCard;
