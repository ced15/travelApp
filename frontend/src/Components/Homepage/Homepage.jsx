import { GoogleMap, LoadScript, useLoadScript } from "@react-google-maps/api";
import "./Homepage.css";
import React from "react";
import Loading from "../Loading/Loading";
import Map from "../Map/Map";

const Homepage = () => {
  const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: googleMapsApiKey,
    libraries: ["places"],
  });

  if (loadError) {
    console.error("Error loading Google Maps:", loadError);
    return <div>Error loading Google Maps</div>;
  }

  if (!isLoaded) {
    return <Loading />;
  }

  return (
    <div>
      <Map />
    </div>
  );
};

export default Homepage;
