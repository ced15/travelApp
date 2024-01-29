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
        url: "https://cdn.discordapp.com/attachments/1080482388221640805/1194934425658597417/image_2024-01-11_112147747-removebg-preview.png?ex=65b22867&is=659fb367&hm=e098d083cc5715339864a6f1ec3bb314d5d7aa6e76de1d074bafa1c93eb29b80&",
        size: new google.maps.Size(20, 32),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(0, 32),    
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