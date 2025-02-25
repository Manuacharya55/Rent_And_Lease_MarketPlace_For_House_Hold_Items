import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet-routing-machine";

const RouteMap = ({props}) => {
  const [userLocation, setUserLocation] = useState(null);
  const destination = [props.lat, props.lng]; // Example destination (Delhi)

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation([position.coords.latitude, position.coords.longitude]);
      },
      (error) => {
        console.error("Error getting location:", error);
      }
    );
  }, []);

  useEffect(() => {
    if (!userLocation) return;

    const map = L.map("map").setView(userLocation, 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

    // Add route without the text instructions
    const control = L.Routing.control({
      waypoints: [
        L.latLng(userLocation[0], userLocation[1]),
        L.latLng(destination[0], destination[1]),
      ],
      routeWhileDragging: true,
      createMarker: () => null, // Remove markers
      show: false, // Hide route instructions
      addWaypoints: false,
      fitSelectedRoutes: true,
      showAlternatives: false,
    }).addTo(map);

    // Remove route instructions container
    control.on("routesfound", function () {
      const itinerary = control._container;
      if (itinerary) {
        L.DomUtil.remove(itinerary);
      }
    });

    return () => {
      map.remove();
    };
  }, [userLocation]);

  return (
    <div id="map" style={{ height: "100vh", width: "100%" }}>
      {!userLocation && <p>Fetching your location...</p>}
    </div>
  );
};

export default RouteMap;
