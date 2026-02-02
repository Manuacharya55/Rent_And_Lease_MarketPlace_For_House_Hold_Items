import { useState } from "react";
import { useAuth } from "../context/Auth";
import { deleteData, getData, postData } from "../API/axios";

export const useReview = () => {
    const { user } = useAuth();
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [error, setError] = useState(null);

    const requireAuth = () => {
        if (!user?.token) return
        return user?.token
    }

    const fetchReviews = async (id) => {
        const token = requireAuth();
        if (!token) return
        try {
            console.log(token)
            setLoading(true)
            const response = await getData(`reviews/${id}`, {}, token);
            console.log(response)
            if (response.success) {
                setReviews(response.data);
            }
        } catch (error) {
            console.log(error)
            setError(error);
        } finally {
            setLoading(false)
        }
    }


    const add = async (id, userRating, reviewText) => {
        const token = requireAuth();
        if (!token) return
        try {
            setProcessing(true)
            const response = await postData(`reviews/${id}`, { rating: userRating, description: reviewText }, token);
            console.log(response)
            if (response.success) {
                setReviews(prev => [...prev, response.data])
            }
            return response
        } catch (error) {
            console.error(error);
            setError(error)
        } finally {
            setProcessing(false)
        }
    }

    const remove = async (id,reviewId) => {
        const token = requireAuth();
        if (!token) return
        try {
            setProcessing(true)
            const response = await deleteData(`/reviews/${id}/${reviewId}`, {}, token);
            console.log(response.data)
            if (response.success) {
                setReviews(prev => prev.filter(r => r._id !== reviewId))
            }
            return response
        } catch (error) {
            console.error(error);
            setError(error)
        } finally {
            setProcessing(false)
        }
    }
    return { fetchReviews, add, remove, reviews, loading, error }
}