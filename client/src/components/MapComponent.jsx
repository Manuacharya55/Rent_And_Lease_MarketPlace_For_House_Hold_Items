import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import { useAuth } from "../context/Auth";

const MapComponent = () => {
  const [userLocation, setUserLocation] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  // Default fallback location (Delhi)
  const defaultCenter = [28.6139, 77.209];

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    if (!user) return;

    try {
      const response = await axios.get(
        "http://localhost:4000/api/v1/product/",
        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": user.token,
          },
        }
      );

      if (response.data.success) {
        setIsLoading(false);

        // Extract lat & lng correctly, filtering out invalid data
        const locations = response.data.data
          .filter((curEle) => curEle.userId && curEle.userId.location && curEle.userId.location.coordinates)
          .map((curEle,index) => ({
            lat: curEle.userId.location.coordinates[1],
            lng: curEle.userId.location.coordinates[0],
          }));

        setUserLocation(locations);
      }
    } catch (error) {
      console.error("Error loading locations:", error);
    }
  };

  return isLoading ? (
    "Loading Map..."
  ) : (
    <MapContainer
      center={userLocation.length > 0 ? userLocation[0] : defaultCenter} // Ensure valid center
      zoom={10}
      style={{
        height: "100vh",
        width: "600px",
      }}
    >
      {/* Add Tile Layer */}
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {/* Add Markers for each location */}
      {userLocation.map((position, index) => (
        <Marker key={index} position={[position.lat, position.lng]}>
          <Popup>Location {index + 1}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapComponent;
