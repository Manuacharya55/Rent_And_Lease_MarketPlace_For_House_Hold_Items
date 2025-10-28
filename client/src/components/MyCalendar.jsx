import React, { useState } from "react";
import Calendar from "react-calendar";

import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  useStripe,
  useElements,
  CardElement,
} from "@stripe/react-stripe-js";

import axios from "axios";
import "react-calendar/dist/Calendar.css";
import { useAuth } from "../context/Auth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const stripePromise = loadStripe(
  "pk_test_51Qy6OKJx3mIqkvw160yw4AWKGgl1VCmUXHgXRITnhJTAdGEKOt60IvAoyubH3taTF46vPjZQOewZF4xTUja92dpf00ymcli1Rc"
);

const CheckoutForm = ({ amount, selectedDate, product }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  console.log(user.token);

  
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    if (!stripe || !elements) {
      setError("Stripe is not properly loaded.");
      setLoading(false);
      return;
    }

    try {
      const cardElement = elements.getElement(CardElement);
      const { paymentMethod, error } = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
      });

      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }

      const { data } = await axios.post(
        "http://localhost:4000/api/v1/payment/rent-payment",
        {
          productId: product?._id,
          rentDate: selectedDate,
          totalAmount: parseFloat(amount),
          paymentMethodId: paymentMethod.id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": user.token,
          },
        }
      );

      toast.success("Payment Successful! Rent Recorded");
      navigate("/");
    } catch (error) {
      console.log(error);
      setError(
        error.response?.data?.error || "Payment failed. Please try again."
      );
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe || loading}>
        {loading ? "Processing..." : `Pay ₹${amount}`}
      </button>
      {error && <div style={{ color: "red" }}>{error}</div>}
      {success && <div style={{ color: "green" }}>Payment Successful!</div>}
    </form>
  );
};

const MyCalendar = ({ setSelectedDate, selectedDate, product }) => {
  const [value, setValue] = useState(new Date());

  const handleDateClick = (date) => {
    const formattedDate = date.toISOString().split("T")[0];
    setSelectedDate(formattedDate);
  };

  return (
    <div style={{ maxWidth: "400px", margin: "25px auto" }}>
      <Calendar onChange={handleDateClick} value={value} />
      <div id="bill">
        <p>Product Name: {product?.productName}</p>
        <p>Category: {product?.category}</p>
        <h1>Price: ₹{parseInt(product?.price)}</h1>
        <p>Rent Date: {selectedDate}</p>

        <Elements stripe={stripePromise}>
          <CheckoutForm
            amount={parseInt(product?.price)}
            selectedDate={selectedDate}
            product={product}
          />
        </Elements>
      </div>
    </div>
  );
};

export default MyCalendar;
