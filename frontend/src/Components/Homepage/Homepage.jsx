import { GoogleMap, LoadScript, useLoadScript } from '@react-google-maps/api';
import "./Homepage.css";
import Header from "./Header/Header";
import React, { useRef, useEffect } from 'react';
import Loading from '../Loading/Loading';
import Map from '../Map/Map';

const Homepage = () => {

  const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const  { isLoaded } = useLoadScript({
    googleMapsApiKey: googleMapsApiKey,
    libraries: ["places"]
  });

  if(!isLoaded) {
    return (
      <Loading />
    )
  }

  return (
    <div>
      <Header/>
      <Map/>
    </div>
  )
};

export default Homepage;