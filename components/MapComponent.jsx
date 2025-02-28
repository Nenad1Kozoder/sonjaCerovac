import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

const customIcon = new L.Icon({
  iconUrl: markerIcon.src,
  shadowUrl: markerShadow.src,
  iconSize: [25, 41], // Veličina ikone
  iconAnchor: [12, 41], // Tačka gde se oslanja na mapu
  popupAnchor: [1, -34], // Pozicija popup-a
});

const MapComponent = ({ data }) => {
  const [position, setPosition] = useState(null); // Početno je null

  useEffect(() => {
    setTimeout(() => {
      setPosition([data.latitude, data.longitude]); // Beograd kao primer
    }, 1000);
  }, []);

  if (!position) return <p>Učitavanje mape...</p>;

  return (
    <div
      style={{
        height: "500px",
        width: "100%",
        borderRadius: "28px",
        overflow: "hidden",
      }}
    >
      <MapContainer center={position} zoom={13} style={{ height: "100%" }}>
        <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />
        <Marker position={position} icon={customIcon}>
          <Popup>Beograd, Srbija</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MapComponent;
