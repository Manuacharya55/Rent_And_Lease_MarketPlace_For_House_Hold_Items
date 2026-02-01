import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../style/wishlist.css';
import { Trash2, ShoppingCart, ArrowLeft } from 'lucide-react';
import { useAuth } from '../../context/Auth';
import { deleteData, getData } from '../../API/axios';

const Wishlist = () => {
    const navigate = useNavigate();
    const { user } = useAuth()
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    // Mock Data (Simulating Wishlist Items)
    const wishlistItems = [
        {
            id: 1,
            name: "Adom's Bluv East",
            address: "350 Palace Road, New York, USA",
            price: "₹3,450",
            period: "per month",
            image: "https://images.unsplash.com/photo-1600596542815-e32c21219f3b?auto=format&fit=crop&q=80&w=800",
            type: "Residence"
        },
        {
            id: 3,
            name: "Double Flax Apartment",
            address: "350 Palace Road, New York, USA",
            price: "₹7,891",
            period: "per month",
            image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=800",
            type: "Apartment"
        },
        {
            id: 6,
            name: "Paklow Apartment",
            address: "350 Palace Road, New York, USA",
            price: "₹6,450",
            period: "per month",
            image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&q=80&w=800",
            type: "Apartment"
        }
    ];

    const fetchWishlist = async () => {
        if (!user?.token) return
        try {
            const response = await getData(`wishlist`, {}, user?.token)
            console.log(response)
            if (response.success) {
                setData(response.data)
            }
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        fetchWishlist()
    }, [user?.token])

    const removeWishlist = async (id) => {
        if (!user?.token) return
        try {
            const response = await deleteData(`wishlist/${id}`, {}, user?.token)
            console.log(response)
            if (response.success) {
                // fetchWishlist()
                console.log(response)
                setData(data.filter(item => item?.product?._id !== id))
            }
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className="wishlist-container">
            <div className="wishlist-header">
                <div className="page-header-actions">
                    <button className="back-btn" onClick={() => navigate(-1)}>
                        <ArrowLeft size={18} /> Back
                    </button>
                </div>
                <h1>My Wishlist</h1>
                <p>{data.length} Saved Items</p>
            </div>

            <div className="wishlist-grid">
                {data.map(item => (
                    <div key={item?.product?._id} className="wishlist-card" onClick={() => navigate(`/product/${item?.product?._id}`)}>
                        <div className="w-card-image-wrapper">
                            <img src={item?.product?.images[0]} alt={item?.product?.name} />
                            <button className="w-remove-btn" onClick={(e) => { e.stopPropagation(); removeWishlist(item?.product?._id) }}>
                                <Trash2 size={16} />
                            </button>
                            <span className="w-card-badge">{item?.product?.category}</span>
                        </div>
                        <div className="w-card-details">
                            <div className="w-card-row-top">
                                <h3 className="w-card-title">{item?.product?.name}</h3>
                                <div className="w-card-price-block">
                                    <span className="w-card-price">{item?.product?.price}</span>
                                    <span className="w-card-period">per day</span>
                                </div>
                            </div>
                            <p className="w-card-address">{item?.address[0].district + ", " + item?.address[0].state}</p>

                            <button className="w-move-cart-btn" onClick={(e) => { e.stopPropagation(); }}>
                                <ShoppingCart size={16} /> Rent Now
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {wishlistItems.length === 0 && (
                <div className="empty-wishlist">
                    <h3>Your wishlist is empty</h3>
                    <button onClick={() => navigate('/products')}>Browse Products</button>
                </div>
            )}
        </div>
    );
};

export default Wishlist;
