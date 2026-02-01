import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useAuth } from "../../context/Auth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import { postData } from "../../API/axios";

const PaymentCard = ({ amount, selectedDate, product }) => {
 const stripe = useStripe();
    const elements = useElements();
    const { user } = useAuth();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);


    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) return

        setLoading(true);
        try {
            const { paymentIntent, error } = await stripe.confirmPayment({
                elements,
                confirmParams: {
                    return_url: `${window.location.origin}/booking-success`,
                },
                redirect: "if_required",
            });

            if (error) {
                toast.error(error.message);
                setLoading(false);
            } else if (paymentIntent.status === "succeeded") {
                const response = await postData(`rent/`, {
                    productId: product?._id,
                    date: selectedDate,
                    amount: paymentIntent?.amount,
                    paymentIntentId: paymentIntent.id,
                }, user?.token)

                if (response.success) {
                    console.log(response)
                    navigate("/order-placed")
                }
            }
        } catch (error) {
            console.log(error)
        }
        setLoading(false);
    };

    return (
        <form onSubmit={handleSubmit} className="checkout-form">
            <div className="form-group">
                <label htmlFor="card-element">Card Details</label>
                <div className="card-element-container">
                    <PaymentElement />
                </div>
            </div>

            <button
                type="submit"
                className="pay-button"
                disabled={!stripe || loading || !selectedDate}
            >
                {loading ? (
                    <span className="spinner">Processing...</span>
                ) : (
                    `Pay ₹${amount}`
                )}
            </button>

            {!selectedDate && (
                <p className="instruction-text">Please select a date from the calendar to proceed.</p>
            )}
        </form>
    );
};

export default PaymentCard;