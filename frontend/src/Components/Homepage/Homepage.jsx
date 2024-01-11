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

  // const mapStyles = {
  //   height: '100vh',
  //   width: '100%',
  // };

  // const defaultCenter = {
  //   lat: 40.748817,
  //   lng: -73.985428,
  // };

  // return (
    
  //   <div>
  //     <Header/>
  //     <LoadScript googleMapsApiKey="AIzaSyD_5tG3mD_cqZUW2uWPFoC1r8XZT2d8WxE">
  //     <div>
  //         <GoogleMap mapContainerStyle={mapStyles} zoom={13} center={defaultCenter} />
  //       </div>
  //     </LoadScript>
      
  //   </div>
  // );

  return (
    <div>
      <Header/>
      <Map/>
    </div>
  )
};

export default Homepage;