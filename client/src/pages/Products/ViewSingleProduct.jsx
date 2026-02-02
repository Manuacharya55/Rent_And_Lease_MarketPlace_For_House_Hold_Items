import { useState, useEffect } from 'react';
import '../../style/productdescription.css';
import { useParams, useNavigate, NavLink } from 'react-router-dom';

import { useAuth } from '../../context/Auth';
import { useProducts } from '../../Hooks/useProducts';
import { useReview } from '../../Hooks/useReview';
import { useWishlist } from '../../Hooks/useWishlist'
import ProductHeader from '../../components/SingleProduct/ProductHeader';
import ProductGallery from '../../components/SingleProduct/ProductGallery';
import ProductOverview from '../../components/SingleProduct/ProductOverview';
import ReviewsSection from '../../components/SingleProduct/ReviewSection';
import ProductActions from '../../components/SingleProduct/ProductsActions';
import { ArrowLeft } from 'lucide-react';

const ViewSingleProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    let reviewRating;

    const { product, fetchById, loading } = useProducts();
    const { reviews, fetchReviews, loading: reviewLoading, add, remove } = useReview();
    const { add: addToWishList } = useWishlist();

    const [userRating, setUserRating] = useState(0);
    const [reviewText, setReviewText] = useState("");


    reviewRating = reviews?.reduce((acc, r) => acc + r.rating, 0) / reviews?.length || 0;

    const handleAddToWishlist = async (productId) => {
        await addToWishList(productId)
    }

    useEffect(() => {
        fetchById(id),
            fetchReviews(id)
    }, [id]);

    const handleSubmit = async () => {
        const response = await add(id, userRating, reviewText)
        console.log(response)
        if (response.success) {
            setUserRating(0)
            setReviewText("")
        }
    }

    const deleteReview = async (reviewId) => {
        const response = await remove(id, reviewId)
        console.log(response)
    }

    if (loading) return <div className="loading-container">Loading...</div>;
    if (!product) return <div className="loading-container">Product Not Found</div>;

    return (
        <div className="product-page-container">

            <div className="page-header-actions">
                <button className="back-btn" onClick={() => navigate(-1)}>
                    <ArrowLeft size={18} /> Back
                </button>
            </div>

            <ProductHeader
                name={product?.name}
                onWishlist={() => handleAddToWishlist(product?._id)}
            />

            <ProductGallery
                images={product?.images}
            />

            <div className="product-details-split" >
                <div className="details-left">
                    <ProductOverview
                        description={product?.description}
                        user={product.user}
                        address={product.address}
                    />
                </div>
                <div className="details-right">
                    <ProductActions
                        price={product.price}
                        onRent={() => navigate(`/checkout/${product._id}`)}
                        onWishlist={() => addToWishList(product._id)}
                    />
                </div>

            </div>
            <ReviewsSection
                reviews={reviews}
                rating={userRating}
                setRating={setUserRating}
                reviewText={reviewText}
                setReviewText={setReviewText}
                onSubmit={handleSubmit}
                onDelete={deleteReview}
                currentUserId={user?.id}
                loading={reviewLoading}
            />
        </div>
    );
};

export default ViewSingleProduct;
