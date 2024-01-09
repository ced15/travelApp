import { GoogleMap, LoadScript } from '@react-google-maps/api';
import "./Homepage.css";
import Header from "./Header/Header";

const Homepage = () => {
   const mapStyles = {
    height: '100vh',
    width: '100%',
  };

  const defaultCenter = {
    lat: 40.748817,
    lng: -73.985428,
  };

  return (
    <div>
      <Header/>
    <LoadScript
      googleMapsApiKey="AIzaSyD_5tG3mD_cqZUW2uWPFoC1r8XZT2d8WxE"
    >
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={13}
        center={defaultCenter}
      />
    </LoadScript>
    </div>
  )
}


export default Homepage;