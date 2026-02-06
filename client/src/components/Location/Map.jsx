import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import markerShadowPng from "leaflet/dist/images/marker-shadow.png";

// Fix Leaflet marker icon issue
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

      // Fetch address components (Geocoding)
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
        );
        const data = await response.json();

        if (setLocation) {
          setLocation({
            lat,
            lng,
            country: data.address?.country || "",
            state: data.address?.state || "",
            district: data.address?.state_district,
            address: data.display_name || ""
          });
        }
      } catch (error) {
        console.error("Error fetching location data", error);
      }
    },
  });

  return markerPosition ? <Marker position={markerPosition} icon={markerIcon} /> : null;
};

const Map = ({ setLocation, initialLocation }) => {
  const [currentPosition, setCurrentPosition] = useState(null);

  useEffect(() => {
    // If initial location provided, use it
    if (initialLocation && initialLocation.lat && initialLocation.lng) {
      setCurrentPosition([initialLocation.lat, initialLocation.lng]);
    } 
    // Otherwise try geolocation
    else if (navigator.geolocation) {
       navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentPosition([position.coords.latitude, position.coords.longitude]);
        },
        (error) => {
          console.error("Error fetching current location", error);
          // Fallback to a default center (e.g., India center approx) if location denied
          setCurrentPosition([20.5937, 78.9629]); 
        }
      );
    } else {
        // Fallback
        setCurrentPosition([20.5937, 78.9629]);
    }
  }, [initialLocation]);

  if (!currentPosition) return <p>Loading Map...</p>;

  return (
    <div style={{ height: "100%", width: "100%", overflow: "hidden" }}>
      <MapContainer
        center={currentPosition}
        zoom={13}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <ClickableMap setLocation={setLocation} />
        {/* If initial location exists, show marker there initially too? 
            ClickableMap manages its own marker state on click. 
            Ideally we should sync marker with parent state, but for now this works for "picking". 
        */}
      </MapContainer>
    </div>
  );
};

export default Map;
