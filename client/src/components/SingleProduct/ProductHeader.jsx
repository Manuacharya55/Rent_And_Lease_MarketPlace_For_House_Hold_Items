import { Heart } from "lucide-react";

const ProductHeader = ({ name, onWishlist }) => (
  <div className="product-top-info">
    <div className="title-row">
      <h1 className="product-main-title">{name}</h1>
      <button className="wishlist-round-btn" onClick={onWishlist}>
        <Heart size={20} />
      </button>
    </div>
  </div>
);

export default ProductHeader;
