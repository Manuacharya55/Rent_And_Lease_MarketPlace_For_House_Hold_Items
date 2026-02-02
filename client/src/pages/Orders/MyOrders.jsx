import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/Auth";
import { deleteData, getData } from "../../API/axios";
import { ArrowLeft, ChevronLeft, ChevronRight, Edit2, Eye, Plus, Trash2 } from "lucide-react";

const MyOrders = () => {
    const navigate = useNavigate();
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 1,
        totalDocuments: 0
    });

    const { user } = useAuth()



    const fetchProducts = async () => {
        if (!user?.token) return
        setIsLoading(true)
        try {
            const response = await getData(`order/my-orders?page=${pagination.currentPage}`, {}, user?.token)
            // console.log(response.data)
            if (response.success) {
                console.log(response.data.data)
                setData(response.data.data)
                setPagination(response.data.pagination)
            }
        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchProducts()
    }, [user?.token])

    const handleDelete = async (id) => {
        try {
            const response = await deleteData(`product/${id}`, {}, user?.token)
            console.log(response)
            if (response.success) {
                setData(data.map(item => item._id === id ? { ...item, isActive: !item.isActive } : item))
            }
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <div className="manage-products-container">
            {/* Header */}
            <div className="mp-header">
                <button className="mp-back-btn" onClick={() => navigate(-1)}>
                    <ArrowLeft size={18} /> Back
                </button>
            </div>

            <h1 className="mp-title">Order History</h1>

            {/* Table */}
            <div className="mp-table-wrapper">
                <table className="mp-table">
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Image</th>
                            <th>Owner</th>
                            <th>Phone</th>
                            <th>Price</th>
                            <th>Borrowed AT</th>
                            <th>Payment ID</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(order => (
                            <tr key={order._id}>
                                <td className="mp-name-cell">{order?.product?.name}</td>
                                <td>
                                    <img src={order?.product?.images[0]} alt="product" className="mp-img-thumb" />
                                </td>
                                <td>{order?.owner?.name}</td>
                                <td>{order?.owner?.phonenumber}</td>
                                <td>{order?.product?.price}/day</td>
                                <td>{order?.rentDate.split("T")[0]}</td>
                                <td>{order?.paymentId}</td>
                                <td>
                                    <span className={`mp-status-badge ${order?.status === "not borrowed" || "borrowed" || "returned" || "overdue" ? 'active' : 'inactive'}`}>
                                        {order?.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="mp-pagination">
                <button
                    disabled={pagination.currentPage === 1}
                    onClick={() => setPagination(p => ({ ...p, currentPage: p.currentPage - 1 }))}
                    className="mp-page-btn"
                >
                    <ChevronLeft size={18} />
                </button>
                <span className="mp-page-info">
                    Page {pagination.currentPage} of {pagination.totalPages}
                </span>
                <button
                    disabled={pagination.currentPage === pagination.totalPages}
                    onClick={() => setPagination(p => ({ ...p, currentPage: p.currentPage + 1 }))}
                    className="mp-page-btn"
                >
                    <ChevronRight size={18} />
                </button>
            </div>
        </div>
    );
}

export default MyOrders