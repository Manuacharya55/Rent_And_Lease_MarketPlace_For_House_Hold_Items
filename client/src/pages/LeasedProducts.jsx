import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../context/Auth";
import DashBoardNavBar from "../components/DashBoardNavBar";
import toast from "react-hot-toast";

const LeasedProducts = () => {
    const [products, setProducts] = useState([]);
    const { user } = useAuth();

    const fetchProducts = async () => {
        if (!user) return;
        try {
            const response = await axios.get(
                "http://localhost:4000/api/v1/dashboard/rented",
                {
                    headers: {
                        "Content-Type": "application/json",
                        "auth-token": user.token,
                    },
                }
            );
            setProducts(response.data);
            console.log(response.data)
        } catch (error) {
            console.error("There was an error fetching the data!", error);
        }
    };

    useEffect(() => {
        if (user) fetchProducts();
    }, [user]);

    const handleButtonClick = async(id) => {
        console.log(id)
        try {
            const response = await axios.patch(`http://localhost:4000/api/v1/dashboard/rented/${id}`,{}, {
            headers: {
                "Content-Type": "application/json",
                "auth-token": user.token,
            },
            });
            console.log("Product details:", response.data);
            toast.success("Product status changed successfully!");
        } catch (error) {
            console.error("There was an error fetching the product details!", error);
            toast.error("Failed to fetch product details!");
        }
    };

    return (
        <div id="dashboard-container">
            <DashBoardNavBar />
            <h1>Leased Products</h1>
            <table>
                <thead>
                    <tr>
                        <th>Product Name</th>
                        <th>Product Image</th>
                        <th>User Name</th>
                        <th>Address</th>
                        <th>Phone Number</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product._id}>
                            <td>{product.productId.productName}</td>
                            <td>
                                <img src={product.productId.productImage[0]} alt={product.name} width="50" />
                            </td>
                            <td>{product.purchaserId.name}</td>
                            <td>{product.purchaserId.address}</td>
                            <td>{product.purchaserId.phonenumber}</td>
                            <td>
                                <button onClick={() => handleButtonClick(product.productId._id)}>
                                    Make Returned
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default LeasedProducts;
