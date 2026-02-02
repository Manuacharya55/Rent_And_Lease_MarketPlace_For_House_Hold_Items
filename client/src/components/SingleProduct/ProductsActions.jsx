import { ShoppingCart } from "lucide-react";
import { Heart } from "lucide-react";

const ProductActions = ({ price, onRent, onWishlist }) => (
    <div className="action-card">
        <div className="price-display ">
            <span className="amount">₹ {price}</span> <span className="unit">/ day</span>
        </div>

        <button className="primary-rent-btn" onClick={onRent}>
            <ShoppingCart size={18} /> Rent Now
        </button>

        <button className="secondary-action-btn" onClick={onWishlist}>
            <Heart size={18} /> Add to Wishlist
        </button>
    </div>
);

export default ProductActions;
