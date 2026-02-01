import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../style/viewproducts.css';
import { Search, MapPin, Heart, Filter, ChevronLeft, ChevronRight } from 'lucide-react';
import { getData, postData } from '../../API/axios';
import { useAuth } from '../../context/Auth';


const ViewProducts = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const { user } = useAuth();

    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 1,
        totalDocuments: 0
    });

    // Mock Data
    const products = [
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
            id: 2,
            name: "Espanio Ladib Plak",
            address: "350 Palace Road, New York, USA",
            price: "₹4,120",
            period: "per month",
            image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800",
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
            id: 4,
            name: "Duplex Slap Lak",
            address: "350 Palace Road, New York, USA",
            price: "₹2,180",
            period: "per month",
            image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&q=80&w=800",
            type: "Residence"
        },
        {
            id: 5,
            name: "Adom's Bluv East",
            address: "350 Palace Road, New York, USA",
            price: "₹3,450",
            period: "per month",
            image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=800",
            type: "Residence"
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

    const fetchProducts = async () => {
        if (!user?.token) return
        try {
            const response = await getData(`product?page=${pagination.currentPage}`, {}, user?.token)
            console.log(response)
            if (response.success) {
                setData(response.data.data)
                setPagination(response.data.pagination)
            }
        } catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        if (user?.token) {
            fetchProducts()
        }
    }, [user?.token])

    const addToWishlist = async (productId) => {
        if (!user?.token) return
        try {
            const response = await postData(`wishlist/${productId}`, {}, user?.token)
            console.log(response)
            if (response.success) {
                console.log(response)
            }
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className="view-products-container">
            {/* Hero & Search Section (Image 1 Style) */}
            <div className="listing-hero">
                <div className="hero-content">
                    {/* <div className="hero-tags">
                        <span className="hero-tag active">House</span>
                        <span className="hero-tag">Apartment</span>
                        <span className="hero-tag">Residential</span>
                    </div> */}
                    <h1 className="hero-title">
                        Rent Items With Ease.
                    </h1>
                </div>

                {/* Search Bar Floating */}
                <div className="search-filter-bar">
                    <div className="search-field">
                        <label>Looking for</label>
                        <input type="text" placeholder="Enter type" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                    </div>
                    <div className="search-field">
                        <label>Price</label>
                        <select>
                            <option>Price Range</option>
                            <option>₹1k - ₹5k</option>
                            <option>₹5k - ₹10k</option>
                        </select>
                    </div>
                    {/* <div className="search-field">
                        <label>Locations</label>
                        <select>
                            <option>Select Location</option>
                            <option>Bangalore</option>
                            <option>Mumbai</option>
                        </select>
                    </div> */}
                    <div className="search-field">
                        <label>Number of rooms</label>
                        <select>
                            <option>2 Bed rooms</option>
                            <option>3 Bed rooms</option>
                        </select>
                    </div>
                    <button className="search-submit-btn">
                        <Search size={18} /> Search Properties
                    </button>
                </div>
            </div>

            {/* Product Grid Section */}
            <div className="products-grid-section">
                <div className="grid-header">
                    <h2>{data.length} Results Found</h2>
                    <div className="sort-box">
                        Sort by: <strong>Newest</strong>
                    </div>
                </div>

                <div className="products-grid">
                    {data.map(product => (
                        <div key={product._id} className="product-card" onClick={() => navigate(`/product/${product._id}`)}>
                            <div className="card-image-wrapper">
                                <img src={product.images[0]} alt={product.name} />
                                <button className="card-wishlist-btn" onClick={(e) => { e.stopPropagation(); addToWishlist(product._id) }}>
                                    <Heart size={16} />
                                </button>
                                <span className="card-badge">{product.category}</span>
                            </div>
                            <div className="card-details">
                                <div className="card-row-top">
                                    <h3 className="card-title">{product.name}</h3>
                                    <div className="card-price-block">
                                        <span className="card-price">{product?.price}</span>
                                        <span className="card-period">per day</span>
                                    </div>
                                </div>
                                <p className="card-address">{product?.district + ", " + product?.state}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="mp-pagination">
                    <button
                        disabled={pagination.currentPage === 1}
                        onClick={() => setPagination(p => ({ ...p, currentPage: p.currentPage - 1 }))}
                        className="mp-page-btn"
                    >
                        <ChevronLeft size={18} />
                    </button>
                    <span className="mp-page-info">
                        Page {pagination.currentPage} of {pagination.totalPages}
                    </span>
                    <button
                        disabled={pagination.currentPage === pagination.totalPages}
                        onClick={() => setPagination(p => ({ ...p, currentPage: p.currentPage + 1 }))}
                        className="mp-page-btn"
                    >
                        <ChevronRight size={18} />
                    </button>
                </div>
            </div>


        </div>
    );
};

export default ViewProducts;
