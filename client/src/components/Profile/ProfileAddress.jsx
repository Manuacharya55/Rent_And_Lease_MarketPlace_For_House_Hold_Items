import React from 'react';
import { Edit2, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import '../../style/profile-modern.css';

const ProfileAddress = ({ address }) => {
    return (
        <div className="profile-card">
            <div className="card-header">
                <h3>Address</h3>
                {address?._id ? (
                    <Link to={`/edit-address/${address._id}`} className="icon-btn"><Edit2 size={18} /></Link>
                ) : (
                    <Link to="/add-address" className="icon-btn">Add</Link>
                )}
            </div>
            <div className="address-content">
                <MapPin size={24} className="address-icon" />
                <p>{address?.address || "No address added yet."}</p>
            </div>
        </div>
    );
};

export default ProfileAddress;
