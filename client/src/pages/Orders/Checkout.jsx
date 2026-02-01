import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

// Components
import MyCalendar from "../../components/MyCalendar";

// Styles
import "./checkout.css";
import { useAuth } from "../../context/Auth";
import { getData } from "../../API/axios";
import toast from "react-hot-toast";
import PaymentCard from "../../components/Payment/PaymentCard";

// Stripe Public Key
const stripePromise = loadStripe(
    "pk_test_51Qy6OKJx3mIqkvw160yw4AWKGgl1VCmUXHgXRITnhJTAdGEKOt60IvAoyubH3taTF46vPjZQOewZF4xTUja92dpf00ymcli1Rc"
);

const Checkout = () => {
    const location = useLocation();
    const { id } = useParams();
    const { user } = useAuth();

    const [selectedDate, setSelectedDate] = useState(null);
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({});
    const [clientSecret, setClientSecret] = useState("");

    const productFallback = location.state?.product || {};

    const fetchBookedDates = async () => {
        if (!user?.token || !id) return;
        setLoading(true);
        try {
            const response = await getData(`/rent/booked-dates/${id}`, {}, user?.token);
            console.log(response)
            if (response.success) {
                setData(response.data);
                setClientSecret(response.data.key);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (user?.token && id) {
            fetchBookedDates();
        }
    }, [user?.token, id]);

    // Use data.product if available, otherwise fallback
    const displayProduct = data?.product || productFallback;


    return loading ? (
        <div className="loading" style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <h1>Loading...</h1>
        </div>
    ) : (
        <div className="checkout-page">
            <header className="checkout-header">
                <h1 className="checkout-title">Checkout</h1>
            </header>

            <main className="checkout-grid">
                {/* Section 1: Product Summary */}
                <section className="checkout-section product-section">
                    <h3 className="section-title">Product Details</h3>

                    {displayProduct?.images && displayProduct.images.length > 0 && (
                        <div className="product-image-container">
                            <img
                                src={displayProduct.images[0]}
                                alt={displayProduct.name}
                                className="product-image"
                            />
                        </div>
                    )}

                    <div className="product-details">
                        <span className="product-category">{displayProduct?.category || "Category"}</span>
                        <h2>{displayProduct?.name || "Product Name"}</h2>
                        <p style={{ color: '#666', lineHeight: '1.5', margin: '12px 0' }}>
                            {/* {displayProduct?.description || "No description available."} */}
                        </p>
                        <div className="product-price">
                            ₹{displayProduct?.price} <span style={{ fontSize: '0.9rem', color: '#6b7280', fontWeight: '400' }}>/ day</span>
                        </div>
                    </div>
                </section>

                {/* Section 2: Calendar */}
                <section className="checkout-section calendar-section">
                    <h3 className="section-title">Select Dates</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
                        <MyCalendar
                            selectedDate={selectedDate}
                            setSelectedDate={setSelectedDate}
                            bookedDates={data?.bookedDates}
                        />
                        {selectedDate && (
                            <div style={{ textAlign: 'center', padding: '10px', background: '#eef2ff', borderRadius: '8px', width: '100%', color: '#4f46e5', fontWeight: '500' }}>
                                Selected Date: {selectedDate}
                            </div>
                        )}
                    </div>
                </section>

                {/* Section 3: Payment */}
                <section className="checkout-section payment-section">
                    <h3 className="section-title">Payment</h3>
                    <div style={{ width: '100%' }}>
                        <Elements stripe={stripePromise} options={{ clientSecret }}>
                            <PaymentCard
                                amount={displayProduct?.price}
                                selectedDate={selectedDate}
                                product={displayProduct}
                            />
                        </Elements>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default Checkout;
