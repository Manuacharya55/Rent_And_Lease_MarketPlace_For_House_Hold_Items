import { Send, Star, Trash2 } from "lucide-react";

const ReviewsSection = ({
  reviews = [],
  rating,
  setRating,
  reviewText,
  setReviewText,
  onSubmit,
  onDelete,
  currentUserId,
  loading,
}) => {
  const reviewRating =
    reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length || 0;

  return (
    <div className="reviews-section-full">
      <h2 className="section-title-r">Rating & Reviews</h2>

      <div className="reviews-layout">
        {/* ================= LEFT: SUMMARY + INPUT ================= */}
        <div className="review-input-col">
          {/* Summary */}
          <div className="review-summary">
            <h1>{reviewRating.toFixed(1)}</h1>

            <div className="stars-combined">
              <div className="stars-row">
                {Array(Math.round(reviewRating))
                  .fill(0)
                  .map((_, i) => (
                    <Star
                      key={i}
                      size={20}
                      fill="gold"
                      stroke="none"
                    />
                  ))}
              </div>
              <span className="total-ratings">
                {reviews.length} Ratings
              </span>
            </div>
          </div>

          {/* Add Review */}
          <div className="add-review-box">
            <h4>Review this product</h4>

            <div className="rating-select">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star
                  key={s}
                  size={24}
                  className={s <= rating ? "star-fill" : "star-empty"}
                  onClick={() => setRating(s)}
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
              <button className="send-btn-icon" onClick={onSubmit}>
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* ================= RIGHT: REVIEWS LIST ================= */}
        {loading ? (
          <div className="loading-container">Loading...</div>
        ) : (
          <div className="reviews-list-col">
            <h3>All Reviews ({reviews.length})</h3>

            <div className="reviews-list-compact">
              {reviews.map((r) => (
                <div key={r._id} className="review-item">
                  <div className="review-header-compact">
                    <div className="user-meta">
                      <img
                        src={r?.user?.avatar}
                        alt="user"
                        className="mini-avatar"
                      />
                      <span className="r-user">{r?.user?.name}</span>
                    </div>

                    <span className="r-time">
                      {r?.createdAt?.split("T")[0]}
                    </span>

                    <span className="r-rating">
                      <Star size={12} fill="gold" stroke="none" />{" "}
                      {r.rating}
                    </span>
                  </div>

                  <p>{r.description}</p>

                  {r?.user?._id === currentUserId && (
                    <div className="operation">
                      <button
                        className="delete-btn"
                        onClick={() => onDelete(r._id)}
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewsSection;
