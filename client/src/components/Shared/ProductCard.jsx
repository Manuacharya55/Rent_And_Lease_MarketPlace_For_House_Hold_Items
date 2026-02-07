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
        <div className="card-image-wrapper"
          style={{ backgroundImage: `url(${product.images?.[0]})` }}
        >
          {/* <img src={product.images?.[0]} alt={product.name} /> */}

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
              <span className="card-period">/day</span>
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
      className="product-card"
      onClick={() => navigate(`/product/${product._id}`)}
    >
      <div
        className="card-image-wrapper"
        style={{ backgroundImage: `url(${product.images?.[0]})` }}
      >
        <button
          className="card-wishlist-btn"
          onClick={(e) => {
            e.stopPropagation();
            onRemoveWishlist?.(product._id);
          }}
        >
          <Trash2 size={16} />
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

        <button
          onClick={(e) => {
            e.stopPropagation();
            onRent?.(product._id);
          }}
          className="card-rent-btn"
        >
          <ShoppingCart size={16} /> Rent Now
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
