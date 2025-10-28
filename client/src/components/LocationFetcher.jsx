import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix Leaflet marker issue with Webpack
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import markerShadowPng from "leaflet/dist/images/marker-shadow.png";

// Custom marker icon
const markerIcon = new L.Icon({
  iconUrl: markerIconPng,
  shadowUrl: markerShadowPng,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const ClickableMap = ({ setLocation }) => {
  const [markerPosition, setMarkerPosition] = useState(null);

  useMapEvents({
    click: async (e) => {
      const { lat, lng } = e.latlng;
      setMarkerPosition([lat, lng]);

      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
        );
        const data = await response.json();

        // Update parent component's state
        setLocation({
          lat,
          lng,
          country: data.address?.country || "Unknown",
          state: data.address?.state || "Unknown",
          district: data.address?.county || "Unknown",
        });
      } catch (error) {
        console.error("Error fetching location data", error);
      }
    },
  });

  return markerPosition ? (
    <Marker position={markerPosition} icon={markerIcon} />
  ) : null;
};

const LocationFetcher = ({ setLocation }) => {
  const [location, setLocalLocation] = useState(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      console.error("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        setLocalLocation(userLocation);
        setLocation(userLocation);
      },
      (error) => {
        console.error("Error fetching location", error);
      }
    );
  }, [setLocation]);

  if (!location) return <p>Fetching location...</p>;

  return (
    <MapContainer
      center={[location.lat, location.lng]}
      zoom={15}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <ClickableMap setLocation={setLocation} />
    </MapContainer>
  );
};

export default LocationFetcher;
