import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../style/manageproducts.css';
import { ArrowLeft, Plus, Edit2, Trash2, ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import { deleteData, getData } from '../../API/axios';
import { useAuth } from '../../context/Auth';
import { useProducts } from '../../Hooks/useProducts';

const ManageProducts = () => {
    const navigate = useNavigate();

    const {products,pagination,loading,error,fetchMyProducts,remove} = useProducts()

    useEffect(()=>{
        fetchMyProducts(pagination.currentPage)
    },[pagination.currentPage])

    const handleDelete = async(id)=>{
        try {
          await remove(id)
          await fetchMyProducts(pagination.currentPage)
        } catch (error) {
            console.error(error)
        }
    }

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    
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
                        {products.map(product => (
                            <tr key={product._id}>
                                <td>
                                    <img src={product.images[0]} alt="product" className="mp-img-thumb" />
                                </td>
                                <td className="mp-name-cell">{product.name}</td>
                                <td>{product.category}</td>
                                <td>{product.price}/day</td>
                                <td>{product.createdAt.split('T')[0]}</td>
                                <td>
                                    <span className={`mp-status-badge ${product.isActive ? 'active' : 'inactive'}`}>
                                        {product.isActive ? 'Active' : 'Inactive'}
                                    </span>
                                </td>
                                <td>
                                    <div className="mp-actions">
                                        <button className="mp-action-btn edit" onClick={() => navigate(`/edit-product/${product._id}`)}>
                                            <Edit2 size={16} />
                                        </button>
                                        <button className="mp-action-btn delete" onClick={()=>handleDelete(product._id)}>
                                            {product?.isActive ? <Trash2 size={16} /> : <Eye size={16} />}
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
                    disabled={pagination.currentPage === 1}
                    onClick={() => fetchMyProducts(pagination.currentPage - 1)}
                    className="mp-page-btn"
                >
                    <ChevronLeft size={18} />
                </button>
                <span className="mp-page-info">
                    Page {pagination.currentPage} of {pagination.totalPages}
                </span>
                <button 
                    disabled={pagination.currentPage === pagination.totalPages}
                    onClick={() => fetchMyProducts(pagination.currentPage + 1)}
                    className="mp-page-btn"
                >
                    <ChevronRight size={18} />
                </button>
            </div>
        </div>
    );
};

export default ManageProducts;
