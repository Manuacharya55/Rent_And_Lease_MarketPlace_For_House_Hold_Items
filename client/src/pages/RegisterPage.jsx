import React, { useState } from "react";
import Register from "../components/Register";
import LocationFetcher from "../components/LocationFetcher";

const RegisterPage = () => {
  const [location, setLocation] = useState({
    lat: "",
    lng: "",
    country: "",
    state: "",
    district: "",
  });

  return (
    <div id="container">
      <div id="image-holder">
        {/* Pass setLocation to LocationFetcher so it can update state */}
        <LocationFetcher setLocation={setLocation} />
      </div>
      <div id="form-holder">
        {/* Pass location state to Register so it updates the inputs */}
        <Register location={location} />
      </div>
    </div>
  );
};

export default RegisterPage;
