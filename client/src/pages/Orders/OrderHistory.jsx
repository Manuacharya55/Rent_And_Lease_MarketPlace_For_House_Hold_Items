import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/Auth";
import { getData, patchData } from "../../API/axios";
import { ArrowLeft, ChevronLeft, ChevronRight, Eye, X } from "lucide-react";
import Loader from "../../components/Shared/Loader";

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

    const [selectedOrder, setSelectedOrder] = useState(null);

    const openModal = (order) => setSelectedOrder(order);
    const closeModal = () => setSelectedOrder(null);

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

            {isLoading && <Loader fullScreen={false} />}

            {/* Table */}
            <div className="mp-table-wrapper">
                <div className="mp-table-scroll">
                    <table className="mp-table">
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Image</th>
                                <th>Borrower</th>
                                <th>Phone</th>
                                <th>Price</th>
                                <th>Borrowed AT</th>
                                <th>Status</th>
                                <th>Actions</th>
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
                                        <td>₹{order?.product?.price}</td>
                                        <td>{order?.rentDate.split("T")[0]}</td>
                                        <td>
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
                                        <td>
                                            <div className="mp-actions">
                                                <button
                                                    className="mp-action-btn edit"
                                                    onClick={() => openModal(order)}
                                                    title="View Details"
                                                >
                                                    <Eye size={18} />
                                                </button>
                                            </div>
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

            {/* Order Details Modal */}
            {selectedOrder && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <div>
                                <h3 className="modal-title">Order Details</h3>
                                <p className="modal-subtitle">ID: {selectedOrder._id}</p>
                            </div>
                            <button className="modal-close-btn" onClick={closeModal}>
                                <X size={24} />
                            </button>
                        </div>

                        <div className="modal-body">
                            {/* Product Info */}
                            <div className="detail-section">
                                <h4 className="detail-section-title">Product Information</h4>
                                <div className="product-preview">
                                    <img
                                        src={selectedOrder.product.images[0]}
                                        alt={selectedOrder.product.name}
                                        className="preview-img"
                                    />
                                    <div>
                                        <p style={{ fontWeight: 600, fontSize: '1.1rem' }}>{selectedOrder.product.name}</p>
                                        <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>{selectedOrder.product.category}</p>
                                        <p style={{ fontWeight: 600, color: '#4f46e5' }}>₹{selectedOrder.product.price} / day</p>
                                    </div>
                                </div>
                            </div>

                            {/* Borrower Info */}
                            <div className="detail-section">
                                <h4 className="detail-section-title">Borrower Details</h4>
                                <div className="user-preview">
                                    {selectedOrder.borrower.avatar && (
                                        <img
                                            src={selectedOrder.borrower.avatar}
                                            alt={selectedOrder.borrower.name}
                                            className="avatar"
                                        />
                                    )}
                                    <div className="info-grid" style={{ flex: 1 }}>
                                        <div className="info-item">
                                            <label>Name</label>
                                            <p>{selectedOrder.borrower.name}</p>
                                        </div>
                                        <div className="info-item">
                                            <label>Phone</label>
                                            <p>{selectedOrder.borrower.phonenumber}</p>
                                        </div>
                                        <div className="info-item" style={{ gridColumn: 'span 2' }}>
                                            <label>Email</label>
                                            <p>{selectedOrder.borrower.email}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Rental Info */}
                            <div className="detail-section">
                                <h4 className="detail-section-title">Rental Information</h4>
                                <div className="info-grid">
                                    <div className="info-item">
                                        <label>Borrowed Date</label>
                                        <p>{new Date(selectedOrder.rentDate).toLocaleDateString()}</p>
                                    </div>
                                    <div className="info-item">
                                        <label>Return Date</label>
                                        <p>{new Date(selectedOrder.returnDate).toLocaleDateString()}</p>
                                    </div>
                                    <div className="info-item">
                                        <label>Status</label>
                                        <span className={`mp-status-badge ${selectedOrder.status === 'borrowed' ? 'active' : 'inactive'}`}>
                                            {selectedOrder.status}
                                        </span>
                                    </div>
                                    <div className="info-item">
                                        <label>Payment ID</label>
                                        <p style={{ fontFamily: 'monospace', fontSize: '0.85rem' }}>{selectedOrder.paymentId}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default OrderHistory
