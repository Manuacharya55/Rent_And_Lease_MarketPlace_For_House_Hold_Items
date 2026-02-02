import { Heart, Trash2, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ProductCard = ({
  product,
  variant = "product", // "product" | "wishlist"
  onAddWishlist,
  onRemoveWishlist,
  onRent,
}) => {
  const navigate = useNavigate();

  // ================= PRODUCT CARD =================
  if (variant === "product") {
    return (
      <div
        className="product-card"
        onClick={() => navigate(`/product/${product._id}`)}
      >
        <div className="card-image-wrapper">
          <img src={product.images?.[0]} alt={product.name} />

          <button
            className="card-wishlist-btn"
            onClick={(e) => {
              e.stopPropagation();
              onAddWishlist?.(product._id);
            }}
          >
            <Heart size={16} />
          </button>

          <span className="card-badge">{product.category}</span>
        </div>

        <div className="card-details">
          <div className="card-row-top">
            <h3 className="card-title">{product.name}</h3>

            <div className="card-price-block">
              <span className="card-price">{product.price}</span>
              <span className="card-period">per day</span>
            </div>
          </div>

          <p className="card-address">
            {product.district}, {product.state}
          </p>
        </div>
      </div>
    );
  }

  // ================= WISHLIST CARD =================
  return (
    <div
      className="wishlist-card"
      onClick={() => navigate(`/product/${product._id}`)}
    >
      <div className="w-card-image-wrapper">
        <img src={product.images?.[0]} alt={product.name} />

        <button
          className="w-remove-btn"
          onClick={(e) => {
            e.stopPropagation();
            onRemoveWishlist?.(product._id);
          }}
        >
          <Trash2 size={16} />
        </button>

        <span className="w-card-badge">{product.category}</span>
      </div>

      <div className="w-card-details">
        <div className="w-card-row-top">
          <h3 className="w-card-title">{product.name}</h3>

          <div className="w-card-price-block">
            <span className="w-card-price">{product.price}</span>
            <span className="w-card-period">per day</span>
          </div>
        </div>

        <p className="w-card-address">
          {product.district}, {product.state}
        </p>

        <button
          className="w-move-cart-btn"
          onClick={(e) => {
            e.stopPropagation();
            onRent?.(product._id);
          }}
        >
          <ShoppingCart size={16} /> Rent Now
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
