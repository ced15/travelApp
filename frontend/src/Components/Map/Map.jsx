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
    const image = {
        url: "https://www.simpleimageresizer.com/_uploads/photos/79f7a882/pin_raccoon_2_15.png",  
      };
    
      console.log(image);
      
    

    return (
        <div className="flex h-screen">
            <div className="w-1/6 p-4 bg-black text-white">
                <h1 className="font-semibold italic pb-2"> Search for a location </h1>
                <Places
                    setLocation={(position) => {
                        setLocation(position);
                        mapRef.current?.panTo(position);
                    }}   
                />
            </div>
            <div className="h-screen w-full">
                <GoogleMap 
                    zoom={15} 
                    center={center} 
                    mapContainerClassName="h-screen w-full" 
                    options={options}
                    onLoad={onLoad}>
                    {location && <Marker key='0' icon={image.url} position ={location} />}
                </GoogleMap>               
            </div>    
        </div>
    )
}
export default Map;