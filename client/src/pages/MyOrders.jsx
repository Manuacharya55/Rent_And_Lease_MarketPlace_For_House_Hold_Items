import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/Auth';
import DashBoardNavBar from '../components/DashBoardNavBar';
import axios from 'axios';

const MyOrders = () => {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true );
    const { user } = useAuth();

    const fetchProducts = async () => {
        if (!user) return;
        try {
            const response = await axios.get(
                "http://localhost:4000/api/v1/dashboard/myorder",
                {
                    headers: {
                        "Content-Type": "application/json",
                        "auth-token": user.token,
                    },
                }
            );
            console.log(response.data)
            setProducts(response.data.rents);
            setIsLoading(false);
        } catch (error) {
            console.error("There was an error fetching the data!", error);
        }
    };

    useEffect(() => {
        if (user) fetchProducts();
    }, [user]);



    return (
        <div id="dashboard-container">
            <DashBoardNavBar />
            <h1>My Orders</h1>
            <table>
                <thead>
                    <tr>
                        <th>Owner Name</th>
                        <th>Product Name</th>
                        <th>Category</th>
                        <th>Address</th>
                        <th>Phone Number</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product._id}>
                            <td>{product.ownerId.name}</td>
                            <td>
                            {product.productId.productName}
                            </td>
                            <td>
                            {product.productId.category}
                            </td>
                            <td>{product.ownerId.address}</td>
                            <td>{product.ownerId.phonenumber}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
};

export default MyOrders