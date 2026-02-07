import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import '../../style/viewproducts.css';
import { Search, MapPin, Heart, Filter, ChevronLeft, ChevronRight } from 'lucide-react';
import { getData, postData } from '../../API/axios';
import { useAuth } from '../../context/Auth';
import ProductCard from '../../components/Shared/ProductCard';
import Loader from '../../components/Shared/Loader';
import states from '../../utils/states';


const ViewProducts = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const { user } = useAuth();

    // Get params from URL query string
    const pageParam = searchParams.get('page') || '1';
    const stateParam = searchParams.get('state') || '';
    const categoryParam = searchParams.get('category') || '';
    const districtParam = searchParams.get('district') || '';

    // Temporary filter selections (not yet applied)
    const [selectedState, setSelectedState] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [districts, setDistricts] = useState([]);

    // Active filters from URL (applied filters)
    const [activeFilters, setActiveFilters] = useState({
        state: stateParam,
        category: categoryParam,
        district: districtParam
    });

    const [pagination, setPagination] = useState({
        currentPage: parseInt(pageParam) || 1,
        totalPages: 1,
        totalDocuments: 0
    });

    const categories = [
        "kitchen",
        "bedroom",
        "living room",
        "bathroom",
        "furniture",
        "appliances",
        "electronics",
        "kitchenware",
        "laundry",
        "cleaning",
        "decor",
        "lighting",
        "storage",
        "office",
        "tools",
        "garden",
        "outdoor",
        "fitness",
        "kids",
        "baby",
        "party",
        "clothing",
        "seasonal",
        "misc"
    ];

    // Update districts when state selection changes
    useEffect(() => {
        if (selectedState) {
            const stateData = states.find(s => s.name === selectedState);
            setDistricts(stateData ? stateData.districts : []);
        } else {
            setDistricts([]);
            setSelectedDistrict('');
        }
    }, [selectedState]);

    // Initialize temporary filters from URL params
    useEffect(() => {
        if (stateParam) setSelectedState(stateParam);
        if (categoryParam) setSelectedCategory(categoryParam);
        if (districtParam) setSelectedDistrict(districtParam);
    }, []);

    const fetchProducts = async () => {
        if (!user?.token) return
        try {
            // Build query params from active filters
            let queryParams = `page=${pagination.currentPage}`;
            if (activeFilters.state) queryParams += `&state=${activeFilters.state}`;
            if (activeFilters.category) queryParams += `&category=${activeFilters.category}`;
            if (activeFilters.district) queryParams += `&district=${activeFilters.district}`;

            const response = await getData(`product?${queryParams}`, {}, user?.token)

            if (response.success) {
                setData(response.data.data)
                setPagination(response.data.pagination)
            }
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        if (user?.token) {
            fetchProducts()
        }
    }, [user?.token, pagination.currentPage, activeFilters.state, activeFilters.category, activeFilters.district])

    const addToWishlist = async (productId) => {
        if (!user?.token) return
        try {
            const response = await postData(`wishlist/${productId}`, {}, user?.token)
        } catch (error) {
            console.error(error)
        }
    }

    const handleSearch = () => {
        // Update active filters
        setActiveFilters({
            state: selectedState,
            category: selectedCategory,
            district: selectedDistrict
        });

        // Reset to page 1 and navigate with query params
        setPagination(p => ({ ...p, currentPage: 1 }));

        // Build query string
        const params = new URLSearchParams();
        params.set('page', '1');
        if (selectedState) params.set('state', selectedState);
        if (selectedCategory) params.set('category', selectedCategory);
        if (selectedDistrict) params.set('district', selectedDistrict);

        navigate(`/products?${params.toString()}`);
    };

    return (
        <div className="view-products-container">
            {loading && <Loader />}
            {/* Hero & Search Section (Image 1 Style) */}
            <div className="listing-hero">
                <div className="hero-content" style={{textAlign:'center'}}>
                    <h1 className="hero-title">
                        Discover Perfect Items For Your Home.
                    </h1>
                </div>

                {/* Search Bar Floating */}
                <div className="search-filter-bar">
                    <div className="search-field">
                        <label>Category</label>
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                        >
                            <option value="">All Categories</option>
                            {categories.map((cat, index) => (
                                <option key={index} value={cat}>
                                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="search-field">
                        <label>State</label>
                        <select
                            value={selectedState}
                            onChange={(e) => {
                                setSelectedState(e.target.value);
                                setSelectedDistrict(''); // Reset district when state changes
                            }}
                        >
                            <option value="">All States</option>
                            {states.map((state, index) => (
                                <option key={index} value={state.name}>{state.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="search-field">
                        <label>District</label>
                        <select
                            value={selectedDistrict}
                            onChange={(e) => setSelectedDistrict(e.target.value)}
                            disabled={!selectedState}
                        >
                            <option value="">All Districts</option>
                            {districts.map((district, index) => (
                                <option key={index} value={district}>{district}</option>
                            ))}
                        </select>
                    </div>
                    <button className="search-submit-btn" onClick={handleSearch}>
                        <Search size={18} /> Search Properties
                    </button>
                </div>
            </div>

            {/* Product Grid Section */}
            <div className="products-grid-section">
                <div className="grid-header">
                    <h2>{data.length} Results Found</h2>
                </div>

                <div className="products-grid">
                    {data.map(product => (

                        <ProductCard
                            product={product}
                            variant="product"
                            onAddWishlist={addToWishlist}
                        />

                    ))}
                </div>

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


        </div>
    );
};

export default ViewProducts;
