import React, { useState, useEffect } from 'react';
import '../../style/productdescription.css';
import { useParams, useNavigate, NavLink } from 'react-router-dom';
import { Heart, MapPin, Star, ShoppingCart, ArrowLeft, Send, Trash2 } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useAuth } from '../../context/Auth';
import { deleteData, getData, postData } from '../../API/axios';

const ViewSingleProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [review, setReview] = useState(null);
    const [loading, setLoading] = useState(true);
    const [userRating, setUserRating] = useState(0);
    const [reviewText, setReviewText] = useState("");
    const { user } = useAuth()
    let reviewRating;
    // Mock Data Fetch

    const fetchProductDetails = async () => {
        setLoading(true)
        if (!user?.token) return
        try {
            const response = await getData(`/product/${id}`, {}, user?.token);
            console.log(response.data)
            if (response.success) {
                setProduct(response.data[0]);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false)
        }
    }

    const fetchReviews = async () => {
        if (!user?.token) return
        try {
            const response = await getData(`reviews/${id}`, {}, user?.token);
            console.log(response.data)
            if (response.success) {
                setReview(response.data);
            }
        } catch (error) {
            console.error(error);
        }
    }
    reviewRating = review?.reduce((acc, r) => acc + r.rating, 0) / review?.length || 0;

    const handleAddToWishlist = async (productId) => {
        if (!user?.token) {
            return
        }
        try {
            const response = await postData(`/wishlist/${productId}`, {}, user?.token);
            console.log(response.data)
            if (response.success) {
                // setProduct(response.data[0]);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (user?.token) {
            Promise.all([fetchProductDetails(), fetchReviews()])
        }
    }, [id, user?.token]);

    const addReview = async () => {
        if (!user?.token || !userRating || !reviewText || !id) {
            return
        }
        try {
            const response = await postData(`reviews/${id}`, { rating: userRating, description: reviewText }, user?.token);
            console.log(response.data)
            if (response.success) {
                setReviewText("")
                setUserRating(0)
                setReview(prev => [...prev, response.data])
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false)
        }
    }

    const deleteReview = async (reviewId) => {
        if (!user?.token || !reviewId) {
            return
        }
        try {
            const response = await deleteData(`/reviews/${id}/${reviewId}`, {}, user?.token);
            console.log(response.data)
            if (response.success) {
                setReview(prev => prev.filter(r => r._id !== reviewId))
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false)
        }
    }
    if (loading) return <div className="loading-container">Loading...</div>;
    if (!product) return <div className="loading-container">Product Not Found</div>;

    return (
        <div className="product-page-container">
            {/* Top Navigation */}
            <div className="page-header-actions">
                <button className="back-btn" onClick={() => navigate(-1)}>
                    <ArrowLeft size={18} /> Back
                </button>
            </div>

            {/* Product Header (Name & Description) */}
            <div className="product-top-info">
                <div className="title-row">
                    <h1 className="product-main-title">{product?.name}</h1>
                    {/* <span className="badge-best-sell"># Best Sell</span> */}
                    <button className="wishlist-round-btn" onClick={() => handleAddToWishlist(product?._id)}>
                        <Heart size={20} />
                    </button>
                </div>
                <p className="product-short-desc">{product?.description}</p>
            </div>

            {/* Gallery Section - 4 Images Layout */}
            <div className="gallery-layout-grid">
                {/* Main Large Image */}
                <div className="gallery-item main-item">
                    <img src={product?.images[0]} alt="Main" />
                    <div className="overlay-text">GEOMETRIC</div>
                </div>
                {/* Side Stacked Images */}
                <div className="gallery-side-stack">
                    <div className="gallery-item side-item">
                        <img src={product.images[1] || product.images[0]} alt="Side 1" />
                    </div>
                    <div className="gallery-item side-item">
                        <img src={product.images[2] || product.images[0]} alt="Side 2" />
                    </div>
                </div>
            </div>

            {/* Details & Info Split */}
            <div className="product-details-split">

                {/* Left Column: Overview (Desc, Profile, Location) */}
                <div className="details-left">
                    <div className="info-card overview-card">
                        <h3>Overview</h3>
                        <p className="desc-text">{product.description}</p>

                        <div className="divider"></div>

                        {/* Owner / Profile */}
                        <div className="owner-section">
                            <span className="section-label">Listed By</span>
                            <div className="owner-row">
                                <img src={product?.user?.avatar} alt="Owner" />
                                <div>
                                    <h4>{product?.user?.name}</h4>
                                    <span className="owner-sub">{product?.user?.phonenumber}</span>
                                </div>
                            </div>
                        </div>

                        <div className="divider"></div>

                        {/* Location / Map */}
                        <div className="location-section">
                            <span className="section-label">Location</span>
                            <div className="address-row">

                                <NavLink to={`https://www.google.com/maps?q=${product?.address?.lat},${product?.address?.lng}`} target="_blank" id='address-map'>
                                    <MapPin size={20} className="icon-orange" />
                                    <span>{product?.address?.address}</span>
                                </NavLink>
                            </div>

                        </div>
                    </div>
                </div>

                {/* Right Column: Price & Actions (Sticky) */}
                <div className="details-right">
                    <div className="action-card sticky-card">
                        <div className="price-display">
                            <span className="currency">₹</span>
                            <span className="amount">{product?.price}</span>
                            <span className="unit">/ day</span>
                        </div>
                        <p className="tax-note">Inclusive of all taxes</p>

                        <button className="primary-rent-btn" onClick={() => navigate(`/checkout/${product?._id}`)}>
                            <ShoppingCart size={18}

                            /> Rent Now
                        </button>
                        <button className="secondary-action-btn" onClick={() => handleAddToWishlist(product?._id)}>
                            <Heart size={18} /> Add to Wishlist
                        </button>
                    </div>
                </div>
            </div>

            {/* Reviews Section - Full Width Bottom */}
            <div className="reviews-section-full">
                <h2 className="section-title-r">Rating & Reviews</h2>

                <div className="reviews-layout">
                    {/* Summary & Input */}
                    <div className="review-input-col">
                        <div className="review-summary">
                            <h1>{reviewRating}</h1>
                            <div className="stars-combined">
                                <div className="stars-row">
                                    {Array(Math.round(reviewRating)).fill(0).map((s, i) => <Star key={i} size={20} fill="gold" stroke="none" />)}
                                </div>
                                <span className="total-ratings">{reviewRating} Ratings</span>
                            </div>
                        </div>

                        <div className="add-review-box">
                            <h4>Review this product</h4>
                            <div className="rating-select">
                                {[1, 2, 3, 4, 5].map(s => (
                                    <Star
                                        key={s}
                                        size={24}
                                        className={s <= userRating ? "star-fill" : "star-empty"}
                                        onClick={() => setUserRating(s)}
                                    />
                                ))}
                            </div>
                            <div className="input-group">
                                <textarea
                                    placeholder="Type your review here..."
                                    value={reviewText}
                                    onChange={(e) => setReviewText(e.target.value)}
                                    rows={3}
                                />
                                <button className="send-btn-icon" onClick={addReview}><Send size={18} /></button>
                            </div>
                        </div>
                    </div>

                    {/* Reviews List */}
                    <div className="reviews-list-col">
                        <h3>All Reviews ({review?.length})</h3>
                        <div className="reviews-list-compact">
                            {review?.map((r, i) => (
                                <div key={i} className="review-item">
                                    <div className="review-header-compact">
                                        <div className="user-meta">
                                            <img src={`https://ui-avatars.com/api/?name=${r?.user?.avatar || r?.user?.name}`} alt="user" className="mini-avatar" />
                                            <span className="r-user">{r?.user?.name}</span>
                                        </div>
                                        <span className="r-time">{r?.createdAt?.split('T')[0]}</span>
                                        <span className="r-rating"><Star size={12} fill="gold" stroke="none" /> {r?.rating}</span>
                                    </div>
                                    <p>{r.description}</p>
                                    {r?.user?._id == user?.id && <div className="operation">
                                        <button className="delete-btn" onClick={() => deleteReview(r?._id)}><Trash2 size={18} /></button>
                                    </div>}
                                </div>

                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewSingleProduct;
