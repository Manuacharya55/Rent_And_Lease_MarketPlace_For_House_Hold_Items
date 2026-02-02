import { useState } from "react"
import { useAuth } from "../context/Auth"
import { deleteData, getData, postData } from "../API/axios"

export const useWishlist = () => {
    const [wishlist, setWishlist] = useState([])
    const [loading, setLoading] = useState(false)
    const { user } = useAuth()

    const requireAuth = () => {
        if (!user?.token) return
        return user?.token
    }

    const fetchWishlist = async () => {
        const token = requireAuth()
        if (!token) return
        try {
            setLoading(true)
            const response = await getData(`wishlist`, {}, token)
            console.log(response.data)
            if (response.success) {
                setWishlist(response.data)
            }
            return response
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    const remove = async (productId) => {
        const token = requireAuth()
        if (!token) return
        try {
            const response = await deleteData(`wishlist/${productId}`, {}, token)
            console.log(response.data)
            if (response.success) {
                setWishlist(prev=> prev.filter(item => item.product._id !== productId))
            }
            return response
        } catch (error) {
            console.error(error)
        }
    }

    const add = async(productId)=>{
        const token = requireAuth()
        if (!token) return
        try {
            setLoading(true)
            const response = await postData(`wishlist/${productId}`, {}, token)
            console.log(response.data)
            if (response.success) {
                setWishlist(prev => [...prev, response.data])
            }
            return response
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    return { fetchWishlist, remove, add, wishlist, loading }
}

