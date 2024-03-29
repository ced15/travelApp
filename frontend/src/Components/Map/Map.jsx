import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../Loading/Loading";
import {
  GoogleMap,
  Marker,
} from "@react-google-maps/api";
import "./Map.css";
import Places from "./Places";
import "react-datepicker/dist/react-datepicker.css";
import "./Map.css";
import { useAtom } from "jotai";
import state from "../Atom/Atom";
import TripForm from "../TripForm/TripForm";
import UpdateTripForm from "../UpdateTripForm/UpdateTripForm";
import { Button } from "flowbite-react";

const Map = () => {
  const navigate = useNavigate();
  
  const [loggedUser, setLoggedUser] = useAtom(state.loggedUser);
  const [showFormAndTrip, setShowFormAndTrip] = useAtom(state.currentTrip);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isUpdateFormVisible, setIsUpdateFormVisible] = useState(false);
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

  useEffect(() => {
    console.log(showFormAndTrip)
  },[])

  const handleAddLocation = async (e) => {
    e.preventDefault()
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
          setShowFormAndTrip((prevTrip) => ({
              trip: {
                ...prevTrip.trip,
                locationList: [...prevTrip.trip.locationList, data],
              },
              state: true
          }));
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
    <div className="flex pt-4 relative z-0 justify-end items-center">
      {isFormVisible && (
        <TripForm locations={locations} updateLocations={updateLocations} />
      )}
      {showFormAndTrip.state && (
        <UpdateTripForm
          showFormAndTrip={showFormAndTrip}
          setShowFormAndTrip={setShowFormAndTrip}
        />
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
            <Places
              className="pb-6"
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
            <div className="mt-4">
              <Button
                onClick={
                  isFormVisible || showFormAndTrip.state
                    ? handleAddLocation
                    : handleCreateTrip
                }
                outline
                gradientDuoTone="greenToBlue"
              >
                {isFormVisible || showFormAndTrip.state
                  ? "Add Location"
                  : "Create Trip"}
              </Button>
            </div>
          </div>
        </GoogleMap>
      </div>
    </div>
  );
};
export default Map;
