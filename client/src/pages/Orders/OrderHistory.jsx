import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/Auth";
import { getData, patchData } from "../../API/axios";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";

const OrderHistory = () => {
    const navigate = useNavigate();
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [selectedDate, setSelectedDate] = useState("")
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
            let url = `order/borrowed?page=${pagination.currentPage}`
            if (selectedDate) {
                url += `&date=${new Date(selectedDate).toISOString()}`
            }
            const response = await getData(url, {}, user?.token)
            if (response.success) {
                console.log(response.data)
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
    }, [user?.token, selectedDate, pagination?.currentPage])

    // const handleStatusChange = async (id, status) => {
    //     try {
    //         const response = await patchData(`order/borrowed/${id}`, { status }, user?.token)
    //         console.log(response)
    //         if (response.success) {
    //             setData(data.map(item => item._id === id ? { ...item, status } : item))
    //         }
    //     } catch (error) {
    //         console.error(error)
    //     }
    // }
    return (
        <div className="manage-products-container">
            {/* Header */}
            <div className="mp-header">
                <button className="mp-back-btn" onClick={() => navigate(-1)}>
                    <ArrowLeft size={18} /> Back
                </button>
                <div style={{ marginLeft: "auto" }}>
                    <input
                        type="date"
                        style={{
                            padding: "8px 12px",
                            borderRadius: "6px",
                            border: "1px solid #ddd",
                            outline: "none",
                            cursor: "pointer"
                        }}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        value={selectedDate}
                    />
                </div>
            </div>

            <h1 className="mp-title">Order History</h1>

            {/* Table */}
            <div className="mp-table-wrapper">
                <table className="mp-table">
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Image</th>
                            <th>Borrower</th>
                            <th>Phone</th>
                            <th>Price</th>
                            <th>Borrowed AT</th>
                            <th>Payment ID</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.length > 0 ? (
                            data.map(order => (
                                <tr key={order._id}>
                                    <td className="mp-name-cell">{order?.product?.name}</td>
                                    <td>
                                        <img src={order?.product?.images[0]} alt="product" className="mp-img-thumb" />
                                    </td>
                                    <td>{order?.borrower?.name}</td>
                                    <td>{order?.borrower?.phonenumber}</td>
                                    <td>{order?.product?.price}</td>
                                    <td>{order?.rentDate.split("T")[0]}</td>
                                    <td>{order?.paymentId}</td>
                                    <td
                                    >
                                        <span className={`mp-status-badge ${order?.status === "not borrowed"
                                                ? "status-yellow"
                                                : order?.status === "borrowed"
                                                    ? "status-yellow-dark"
                                                    : order?.status === "returned"
                                                        ? "status-green"
                                                        : "status-red"
                                            }`}>
                                            {order.returnDate <= new Date().toISOString() && order?.status === "borrowed" ? "overdue" : order?.status}
                                            </span>
                                        
                                    </td>

                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="8" style={{ textAlign: "center", padding: "20px" }}>
                                    No orders found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {data.length > 0 && (
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
            )}
        </div>
    );
}

export default OrderHistory
