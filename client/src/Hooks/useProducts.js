import { useState } from "react";
import { getData, postData, patchData, deleteData } from "../API/axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/Auth";


export const useProducts = () => {
    const { user } = useAuth();
    const [product, setProduct] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 1,
        totalDocuments: 0
    });


    const requireAuth = () => {
        if (!user?.token) {
            throw new Error("Unauthorized");
        }

        return user?.token
    }

    // fetch all the products from the database
    const fetchAllProducts = async (page = 1) => {
        try {
            setLoading(true);
            setError(null);

            const token = requireAuth();

            const response = await getData(`product?page=${page}`, {}, token)
            if (response.success) {
                setProducts(response.data);
                setPagination(response.data.pagination);
            }

            return response.data;
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    // fetch all my products from the database
    const fetchMyProducts = async (page = 1) => {
        try {
            setError(null);
            setLoading(true);

            const token = requireAuth();

            const response = await getData(`product/my-products?page=${page}`, {}, token)
            console.log(response.data.pagination)
            if (response.success) {
                setProducts(response.data.data);
                setPagination(response.data.pagination);
            }

            return response.data.data;
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    const fetchById = async (id) => {
        try {
            setError(null)
            setLoading(true);

            const token = requireAuth();

            const response = await getData(`product/${id}`, {}, token)
            console.log(response.data)
            if (response.success) {
                setProduct(response.data);
            }

            return response.data;
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    const fetchMyProductById = async (id) => {
        try {
            setError(null)
            setLoading(true);

            const token = requireAuth();

            const response = await getData(`product/my-products/${id}`, {}, token)
            console.log(response.data)
            if (response.success) {
                console.log(response.data)
                setProduct(response.data);
            }

            return response.data;
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    const create = async (data) => {
        try {
            setError(null)
            setLoading(true);

            const token = requireAuth();

            const response = await postData("product/", data, token)
            if (response.success) {
                setProduct(response.data);
            }

            return response;
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    const update = async (id, data) => {
        try {
            setError(null)
            setLoading(true);

            const token = requireAuth();

            const response = await patchData(`product/${id}`, data, token)
            if (response.success) {
                setProduct(response.data);
            }

            return response;
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    const remove = async (id) => {
        try {
            setError(null)
            setLoading(true);

            const token = requireAuth();

            const response = await deleteData(`product/${id}`, {}, token)
            if (response.success) {
                setProduct(product.map(item => item._id === id ? { ...item, isActive: !item.isActive } : item))
            }

            return response.data;
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }




    return {
        products,
        product,
        pagination,
        loading,
        error,

        fetchAllProducts,
        fetchMyProducts,
        fetchMyProductById,
        fetchById,
        create,
        update,
        remove,
    };
};
