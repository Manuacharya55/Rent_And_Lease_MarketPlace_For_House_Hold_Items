import React from 'react';
import { Package, Clock, Calendar, Box } from 'lucide-react';
import { Link } from 'react-router-dom';
import '../../style/profile-modern.css';

const ProfileActions = () => {
    return (
        <>
            <h2 className="section-title">Quick Actions</h2>
            <div className="quick-links-grid" style={{ marginBottom: '20px', alignItems: 'center' }}  >
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
        </>
    );
};

export default ProfileActions;
