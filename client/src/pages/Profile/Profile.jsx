import React, { useState, useEffect } from 'react';
import '../../style/profile.css';
import { Edit2, MapPin, Package, Clock, Calendar, Box, LogOut, Camera } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getData } from '../../API/axios';
import { useAuth } from '../../context/Auth';

const Profile = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();
    // Mock Fetch Method

    const fetchProfile = async () => {
        if (!user?.token) return;
        setLoading(true);
        const response = await getData("profile/my-profile", {}, user?.token);
        if(response?.success){
            setData(response?.data);
        }
        console.log(response)
        setLoading(false);
    }
    useEffect(() => {
        if(user?.token){
            fetchProfile();
        }

                // setData({
                //     name: "John Doe",
                //     email: "john.doe@example.com",
                //     phone: "+91 98765 43210",
                //     avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=1887&auto=format&fit=crop",
                //     address: "123, Green Street, Tech Park, Bangalore, Karnataka - 560001"
                // });
    }, [user?.token]);

    if (loading) return <div className="profile-loading">Loading Profile...</div>;

    return (
        <div className="profile-container">
            {/* Header Section with Avatar */}
            <div className="profile-header">
                <div className="avatar-wrapper">
                    <img src={user.avatar} alt="Profile" className="profile-avatar" />
                    <button className="edit-avatar-btn">
                        <Camera size={18} />
                    </button>
                </div>
                <h1 className="profile-name">{data.name}</h1>
                {/* <p className="profile-role">{data.createdAt.split("T")[0]}</p> */}
            </div>

            <div className="profile-content-grid">
                {/* Personal Details Card */}
                <div className="profile-card details-card">
                    <div className="card-header">
                        <h3>Personal Details</h3>
                        <button className="icon-btn"><Edit2 size={16} /></button>
                    </div>
                    <div className="details-list">
                        <div className="detail-item">
                            <span className="label">Name</span>
                            <span className="value">{data?.user?.name}</span>

                        </div>
                        <div className="detail-item">
                            <span className="label">Email</span>
                            <span className="value">{data?.user?.email}</span>

                        </div>
                        <div className="detail-item">
                            <span className="label">Phone</span>
                            <span className="value">{data?.user?.phonenumber}</span>

                        </div>
                    </div>
                </div>

                {/* Address Card */}
                <div className="profile-card address-card">
                    <div className="card-header">
                        <h3>Address</h3>
                        <Link to={`/edit-address/${data?.addresses?._id}`}className="icon-btn"><Edit2 size={18} /></Link>
                    </div>
                    <div className="address-content">
                        <MapPin size={24} className="address-icon"/>
                        <p>{data?.addresses.address}</p>
                    </div>
                </div>
            </div>

            {/* Quick Links Section */}
            <h2 className="section-title">Quick Actions</h2>
            <div className="quick-links-grid">
                <Link to="/dashboard/items" className="quick-link-card purple">
                    <Box size={32} />
                    <span>Manage Products</span>
                </Link>
                <Link to="/dashboard/orders" className="quick-link-card orange">
                    <Package size={32} />
                    <span>My Orders</span>
                </Link>
                <Link to="/dashboard/todays-order" className="quick-link-card blue">
                    <Clock size={32} />
                    <span>Today's Order</span>
                </Link>
                <Link to="/dashboard/orders-history" className="quick-link-card green">
                    <Calendar size={32} />
                    <span>Order History</span>
                </Link>
            </div>
        </div>
    );
};

export default Profile;
