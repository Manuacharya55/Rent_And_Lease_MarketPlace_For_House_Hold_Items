import React from 'react';
import { Edit2 } from 'lucide-react';
import '../../style/profile-modern.css';

const ProfileInfo = ({ user }) => {
    return (
        <div className="profile-card">
            <div className="card-header">
                <h3>Personal Details</h3>
                <button className="icon-btn"><Edit2 size={16} /></button>
            </div>
            <div className="details-list">
                <div className="detail-item">
                    <span className="label">Name</span>
                    <span className="value">{user?.name}</span>
                </div>
                <div className="detail-item">
                    <span className="label">Email</span>
                    <span className="value">{user?.email}</span>
                </div>
                <div className="detail-item">
                    <span className="label">Phone</span>
                    <span className="value">{user?.phonenumber || "Not Provided"}</span>
                </div>
            </div>
        </div>
    );
};

export default ProfileInfo;
