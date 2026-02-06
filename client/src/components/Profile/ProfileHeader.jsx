import React from 'react';
import { Camera } from 'lucide-react';
import '../../style/profile-modern.css';
import { useAuth } from '../../context/Auth';

const ProfileHeader = ({ data }) => {
    const { avatar,name,email,createdAt } = data.user
    return (
        <div className="profile-header-card">
            <div className="profile-header-bg"></div>
            <div className="avatar-wrapper">
                <img
                    src={avatar || "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=1887&auto=format&fit=crop"}
                    alt="Profile"
                    className="profile-avatar"
                />
                <button className="edit-avatar-btn">
                    <Camera size={18} />
                </button>
            </div>
            <h1 className="profile-name">{name}</h1>
            {/* Optional: Show role or joined date */}
            {createdAt && <p className="profile-role">Member since {createdAt.split("T")[0]}</p>}
        </div>
    );
};

export default ProfileHeader;
