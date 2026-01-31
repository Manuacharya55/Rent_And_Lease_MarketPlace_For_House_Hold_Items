import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../style/manageproducts.css';
import { ArrowLeft, Plus, Edit2, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';

const ManageProducts = () => {
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // Mock Data
    const products = [
        {
            id: 1,
            name: "Geometric Print Shirt",
            category: "Men's Fashion",
            price: "₹1,200",
            createdAt: "2024-01-15",
            isActive: true,
            image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=100"
        },
        {
            id: 2,
            name: "Leather Sofa Set",
            category: "Furniture",
            price: "₹1,200 / day",
            createdAt: "2024-01-10",
            isActive: true,
            image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=100"
        },
        {
            id: 3,
            name: "Canon DSLR Camera",
            category: "Electronics",
            price: "₹800 / day",
            createdAt: "2023-12-28",
            isActive: false,
            image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=100"
        },
        {
            id: 4,
            name: "Camping Tent",
            category: "Outdoor",
            price: "₹500 / day",
            createdAt: "2023-12-20",
            isActive: true,
            image: "https://images.unsplash.com/photo-1504280390367-361c6d9e38f4?auto=format&fit=crop&q=80&w=100"
        },
        {
            id: 5,
            name: "Party Speakers",
            category: "Electronics",
            price: "₹1,500 / day",
            createdAt: "2023-12-15",
            isActive: true,
            image: "https://images.unsplash.com/photo-1545459720-aac3e5ca9a24?auto=format&fit=crop&q=80&w=100"
        },
        {
            id: 6,
            name: "Drill Machine",
            category: "Tools",
            price: "₹200 / day",
            createdAt: "2023-12-10",
            isActive: false,
            image: "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?auto=format&fit=crop&q=80&w=100"
        }
    ];

    // Pagination Logic
    const totalPages = Math.ceil(products.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = products.slice(startIndex, startIndex + itemsPerPage);

    return (
        <div className="manage-products-container">
            {/* Header */}
            <div className="mp-header">
                <button className="mp-back-btn" onClick={() => navigate(-1)}>
                    <ArrowLeft size={18} /> Back
                </button>
                <button className="mp-add-btn" onClick={() => navigate('/add-product')}>
                    <Plus size={18} /> Add Product
                </button>
            </div>

            <h1 className="mp-title">Manage Products</h1>

            {/* Table */}
            <div className="mp-table-wrapper">
                <table className="mp-table">
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Created At</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map(product => (
                            <tr key={product.id}>
                                <td>
                                    <img src={product.image} alt="product" className="mp-img-thumb" />
                                </td>
                                <td className="mp-name-cell">{product.name}</td>
                                <td>{product.category}</td>
                                <td>{product.price}</td>
                                <td>{product.createdAt}</td>
                                <td>
                                    <span className={`mp-status-badge ${product.isActive ? 'active' : 'inactive'}`}>
                                        {product.isActive ? 'Active' : 'Inactive'}
                                    </span>
                                </td>
                                <td>
                                    <div className="mp-actions">
                                        <button className="mp-action-btn edit" onClick={() => navigate(`/dashboard/edit/${product.id}`)}>
                                            <Edit2 size={16} />
                                        </button>
                                        <button className="mp-action-btn delete">
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="mp-pagination">
                <button 
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(p => p - 1)}
                    className="mp-page-btn"
                >
                    <ChevronLeft size={18} />
                </button>
                <span className="mp-page-info">
                    Page {currentPage} of {totalPages}
                </span>
                <button 
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(p => p + 1)}
                    className="mp-page-btn"
                >
                    <ChevronRight size={18} />
                </button>
            </div>
        </div>
    );
};

export default ManageProducts;
