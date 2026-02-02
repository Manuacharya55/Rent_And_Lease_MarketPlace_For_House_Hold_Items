import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../style/wishlist.css';
import { Trash2, ShoppingCart, ArrowLeft } from 'lucide-react';
import { deleteData, getData } from '../../API/axios';
import { useWishlist } from '../../Hooks/useWishlist';
import ProductCard from '../../components/Shared/ProductCard';

const Wishlist = () => {
    const navigate = useNavigate();
    const { loading, fetchWishlist, remove, wishlist } = useWishlist();

    useEffect(() => {
        fetchWishlist()
    }, [])

    const removeWishlist = async (id) => {
        await remove(id)
    }

    if (loading) return <div className="loading-container">Loading...</div>;
    if (!wishlist) return <div className="loading-container">Wishlist Not Found</div>;

    return (
        <div className="wishlist-container">
            <div className="wishlist-header">
                <div className="page-header-actions">
                    <button className="back-btn" onClick={() => navigate(-1)}>
                        <ArrowLeft size={18} /> Back
                    </button>
                </div>
                <h1>My Wishlist</h1>
                <p>{wishlist.length} Saved Items</p>
            </div>

            <div className="wishlist-grid">
                {wishlist.map(item => (
                    <div key={item?.product?._id} className="wishlist-card" onClick={() => navigate(`/product/${item?.product?._id}`)}>
                        <ProductCard
                            product={item?.product}
                            variant="wishlist"
                            onRemoveWishlist={removeWishlist}
                            onRent={(id) => navigate(`/checkout/${id}`)}
                        />

                    </div>
                ))}
            </div>

            {wishlist.length === 0 && (
                <div className="empty-wishlist">
                    <h3>Your wishlist is empty</h3>
                    <button onClick={() => navigate('/products')}>Browse Products</button>
                </div>
            )}
        </div>
    );
};

export default Wishlist;
