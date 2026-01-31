import React, { useState, useEffect } from 'react';
import '../../style/productdescription.css';
import { useParams, useNavigate } from 'react-router-dom';
import { Heart, MapPin, Star, ShoppingCart, ArrowLeft, Send } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon in React Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const ViewSingleProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [userRating, setUserRating] = useState(0);
    const [reviewText, setReviewText] = useState("");

    // Mock Data Fetch
    useEffect(() => {
        setTimeout(() => {
            setProduct({
                id: id,
                name: "Geometric Print Shirt",
                category: "Men's Fashion",
                price: "₹1,200", // Rent price
                description: "Regular fit shirt in viscose fabric. Camp collar and short sleeves. Split hem. Button-up front.",
                address: "Plot No. 45, Indiranagar, Bangalore",
                lat: 12.9716,
                lng: 77.5946,
                owner: {
                    name: "Alex Johnson",
                    avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=1780&auto=format&fit=crop"
                },
                images: [
                    "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=1888&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=1888&auto=format&fit=crop", 
                   "https://images.unsplash.com/photo-1515562141207-7a88fb0537bf?q=80&w=2070&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1550226891-ef816aed4a98?q=80&w=2070&auto=format&fit=crop"
                ],
                reviews: [
                    { id: 1, user: "Rakibull Hassan", rating: 5, comment: "We use the Join Life label on clothing that is produced using technology and raw materials that help us to reduce the environmental impact of our products." }
                ]
            });
            setLoading(false);
        }, 800);
    }, [id]);

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
                    <h1 className="product-main-title">{product.name}</h1>
                    <span className="badge-best-sell"># Best Sell</span>
                    <button className="wishlist-round-btn">
                        <Heart size={20} />
                    </button>
                </div>
                <p className="product-short-desc">{product.description}</p>
            </div>

            {/* Gallery Section - 4 Images Layout */}
            <div className="gallery-layout-grid">
                {/* Main Large Image */}
                <div className="gallery-item main-item">
                    <img src={product.images[0]} alt="Main" />
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
                                <img src={product.owner.avatar} alt="Owner" />
                                <div>
                                    <h4>{product.owner.name}</h4>
                                    <span className="owner-sub">Verified Owner</span>
                                </div>
                            </div>
                        </div>

                        <div className="divider"></div>

                        {/* Location / Map */}
                        <div className="location-section">
                            <span className="section-label">Location</span>
                            <div className="address-row">
                                <MapPin size={20} className="icon-orange" />
                                <span>{product.address}</span>
                                <span className="view-map-link">(View on Google Maps)</span>
                            </div>
                            {/* <div className="mini-map-preview">
                                <MapContainer center={[product.lat, product.lng]} zoom={13} scrollWheelZoom={false} style={{ height: "100%", width: "100%" }}>
                                    <TileLayer
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    />
                                    <Marker position={[product.lat, product.lng]} />
                                </MapContainer>
                            </div> */}
                        </div>
                    </div>
                </div>

                {/* Right Column: Price & Actions (Sticky) */}
                <div className="details-right">
                     <div className="action-card sticky-card">
                        <div className="price-display">
                            <span className="currency">₹</span>
                            <span className="amount">1,200</span>
                            <span className="unit">/ day</span>
                        </div>
                        <p className="tax-note">Inclusive of all taxes</p>

                         <button className="primary-rent-btn">
                             <ShoppingCart size={18} /> Rent Now
                         </button>
                         <button className="secondary-action-btn">
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
                            <h1>4.5</h1>
                            <div className="stars-combined">
                                <div className="stars-row">
                                    {[1,2,3,4,5].map(s => <Star key={s} size={20} fill="gold" stroke="none"/>)}
                                </div>
                                <span className="total-ratings">{product.reviews.length} Ratings</span>
                            </div>
                        </div>

                        <div className="add-review-box">
                            <h4>Review this product</h4>
                            <div className="rating-select">
                                {[1,2,3,4,5].map(s => (
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
                                <button className="send-btn-icon"><Send size={18}/></button>
                            </div>
                        </div>
                    </div>

                    {/* Reviews List */}
                    <div className="reviews-list-col">
                        <h3>All Reviews ({product.reviews.length})</h3>
                        <div className="reviews-list-compact">
                            {product.reviews.map((r, i) => (
                                <div key={i} className="review-item">
                                    <div className="review-header-compact">
                                        <div className="user-meta">
                                            <img src={`https://ui-avatars.com/api/?name=${r.user}`} alt="user" className="mini-avatar"/>
                                            <span className="r-user">{r.user}</span>
                                        </div>
                                        <span className="r-time">1 hour ago</span>
                                        <span className="r-rating"><Star size={12} fill="gold" stroke="none" /> {r.rating}</span>
                                    </div>
                                    <p>{r.comment}</p>
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
