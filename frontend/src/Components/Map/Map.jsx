import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../Loading/Loading";
import {
  GoogleMap,
  Marker,
  DirectionsRenderer,
  Circle,
  MarkerClusterer,
} from "@react-google-maps/api";
import "./Map.css";
import Places from "./Places";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Map.css";
import supabase from "../../supabase";
import { useAtom } from "jotai";
import state from "../Atom/Atom";
import TripForm from "../TripForm/TripForm";

const Map = () => {
  const navigate = useNavigate();
  
  const [loggedUser, setLoggedUser] = useAtom(state.loggedUser);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [locationObject, setLocationObject] = useState({
    id: "",
    locationName: "",
    locationAddress: "",
    visited: false,
    notes: "",
    pinPoints: null,
    photo: null,
  });
  const [locations, setLocations] = useState([]);
  const [location, setLocation] = useState();
  const mapRef = useRef();
  const center = useMemo(() => ({ lat: 43, lng: -80 }), []);
  const options = useMemo(
    () => ({
      mapId: "3e861c750b535752",
      disableDefaultUI: true,
      clickableIcons: true,
    }),
    []
  );
  const onLoad = useCallback((map) => (mapRef.current = map), []);
  const image = {
    url: "/images/pin_raccoon_1_17.png",
  };

  const handleAddLocation = async () => {
    if (location != null) {
      await fetch(`http://localhost:8080/locations/createLocation`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(locationObject),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setLocations((prevLocation) => [...prevLocation, data]);
          setLocationObject({ ...locationObject, id: data.id });
          console.log(locationObject);
          console.log("You added your location successfully");
        })
        .catch((error) => {
          console.log(`Failed to create location! ${error.message}`);
        });
    }
  };

  const handleCreateTrip = () => {
    setIsFormVisible(true);
  };

  const updateLocations = (value) => {
    setLocations(value);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="flex relative z-0 justify-end items-center">
      {isFormVisible && (
        <TripForm locations={locations} updateLocations={updateLocations} />
      )}
      <div className="h-screen w-full">
        <GoogleMap
          zoom={15}
          center={center}
          mapContainerClassName="h-screen w-full relative z-0"
          options={options}
          onLoad={onLoad}
        >
          {location && <Marker key="0" icon={image.url} position={location} />}
          <div className="p-4 text-black absolute pt-16">
            <h1 className="font-semibold italic pb-2">Search for a location</h1>
            <Places
              setLocation={(position) => {
                setLocation(position);
                setLocationObject({
                  locationName: position.name,
                  locationAddress: position.address,
                  photo: position.photo,
                });
                mapRef.current?.panTo(position);
              }}
            />
            <button
              className="flex flex-row items-center rounded-xl bg-black-100 py-3 text-base font-medium text-navy-700"
              onClick={isFormVisible ? handleAddLocation : handleCreateTrip}
            >
              {isFormVisible ? "Add Location" : "Create Trip"}
            </button>
          </div>
        </GoogleMap>
      </div>
    </div>
  );
};
export default Map;
