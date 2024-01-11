import { useState, useMemo, useCallback, useRef } from "react";
import {
  GoogleMap,
  Marker,
  DirectionsRenderer,
  Circle,
  MarkerClusterer,
} from "@react-google-maps/api";
import "./Map.css"
import Places from "./Places";
// import Distance from "./distance";

// const LatLngLiteral = google.maps.LatLngLiteral;
// const DirectionsResult = google.maps.DirectionsResult;
// const MapOptions = google.maps.MapOptions;



const Map = () => {
    const [location, setLocation] = useState();
    const mapRef = useRef();
    const center = useMemo(() => ({ lat: 43, lng: -80 }), []);
    const options = useMemo(() => ({
        mapId: "3e861c750b535752",
        disableDefaultUI: true,
        clickableIcons: true,
    }), []);
    const onLoad = useCallback((map) => (mapRef.current = map), []);


    return (
        <div className="container">
            <div className="controls">
                <h1> SEARCH LOCATION </h1>
                <Places
                    setLocation={(position) => {
                        setLocation(position);
                        mapRef.current?.panTo(position);
                    }}   
                />
            </div>
            <div className="map">
                <GoogleMap 
                    zoom={15} 
                    center={center} 
                    mapContainerClassName="map-container" 
                    options={options}
                    onLoad={onLoad}>
                    {location && <Marker icon={customIcon} position ={location} />}
                </GoogleMap>               
            </div>    
        </div>
    )
}
export default Map;