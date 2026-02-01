import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Check } from 'lucide-react'; // Assuming lucide-react is installed as per package.json
import './OrderPlaced.css';

const OrderPlaced = () => {
    const navigate = useNavigate();

    return (
        <div className="order-placed-container">
            <div className="order-success-card">
                <div className="icon-container">
                    <Check size={48} strokeWidth={3} />
                </div>

                <h1 className="order-title">Order Placed!</h1>

                <p className="order-message">
                    Thank you for your rental request.<br />
                    Your order has been successfully processed.
                </p>

                <button onClick={() => navigate('/')} className="home-button">
                    Return to Home
                </button>
            </div>
        </div>
    );
};

export default OrderPlaced;
