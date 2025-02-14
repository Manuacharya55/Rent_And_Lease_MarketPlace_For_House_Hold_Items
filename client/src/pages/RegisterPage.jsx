import React, { useState } from "react";

const RegisterPage = () => {
  const [step, setStep] = useState(1);

  const increaseStep = (e) => {
    e.preventDefault();
    setStep((prev) => Math.min(prev + 1, 3)); // Prevent step from exceeding 3
  };

  const decreaseStep = (e) => {
    e.preventDefault();
    setStep((prev) => Math.max(prev - 1, 1)); // Prevent step from going below 1
  };

  return (
    <div className="auth-container">
      <div className="image-section">
        <h1>Rent And Lease Marketplace For Household Items</h1>
      </div>

      <div className="form-section">
        <form id="register-form">
          <h1>Register Here</h1>

          {/* Step 1 */}
          <div className={`steps ${step === 1 ? "block" : "hide"}`}>
            <input type="text" placeholder="Enter your full name" name="name" required />
            <input type="email" placeholder="Enter your email" name="email" required />
            <input type="tel" placeholder="Enter your phone number" name="phone" required />
          </div>

          {/* Step 2 */}
          <div className={`steps ${step === 2 ? "block" : "hide"}`}>
            <input type="password" placeholder="Enter your password" name="password" required />
            <textarea placeholder="Enter your address" name="address" required />
          </div>

          {/* Step 3 */}
          <div className={`steps ${step === 3 ? "block" : "hide"}`}>
            <div className="map"></div>
            <input type="text" placeholder="Enter lattitude" name="details" />
            <input type="text" placeholder="Enter longitude" name="details" />
          </div>

          <div className="btn-container">
            {/* Previous Button */}
            {step > 1 && (
              <button className="btn" onClick={decreaseStep}>
                Previous
              </button>
            )}

            {/* Next Button */}
            {step < 3 && (
              <button className="btn" onClick={increaseStep}>
                Next
              </button>
            )}

            {/* Register Button (Only on Step 3) */}
            {step === 3 && (
              <button className="btn" type="submit">
                Register
              </button>
            )}
          </div>

          <a href="/login">Already have an account?</a>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
