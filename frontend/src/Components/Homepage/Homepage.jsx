import { GoogleMap, LoadScript, useLoadScript } from "@react-google-maps/api";
import "./Homepage.css";
import React from "react";
import Loading from "../Loading/Loading";
import Map from "../Map/Map";
import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import { useAtom } from "jotai";
import state from "../Atom/Atom";

const Homepage = () => {
  const [allMementos, setAllMementos] = useAtom(state.allMementos);
  const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: googleMapsApiKey,
    libraries: ["places"],
  });

  useEffect(() => {
    fetch(`http://localhost:8080/memento/getAllMementos`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setAllMementos(data);
        console.log(data);
      })
      .catch((error) => {
        console.log(`Failed to create memento! ${error.message}`);
      });
  }, []);

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
