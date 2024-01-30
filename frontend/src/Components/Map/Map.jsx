import { useState, useMemo, useCallback, useRef } from "react";
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
import Datepicker from "react-tailwindcss-datepicker";
import { useAtom } from "jotai";
import state from "../Atom/Atom";

const Map = () => {
  const [loading, setLoading] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [memento, setMemento] = useState("");
  const [locations, setLocations] = useState([]);
  const [tripName, setTripName] = useState("");
  const [location, setLocation] = useState();
  const [trip, setTrip] = useState({
    locationList: [],
    departureDate: "",
    arrivalHomeDate: "",
    event: "",
    mementos: [],
  });
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
    url: "https://www.simpleimageresizer.com/_uploads/photos/79f7a882/pin_raccoon_2_15.png",
  };

  const handleCreateTrip = () => {
    setIsFormVisible(true);
  };

  const handleAddLocation = () => {
    location != null &&
      setLocations((prevLocations) => [...prevLocations, location]);
  };

  const handleAddMemento = () => {
    setMemento("");
  };

  const [date, setDate] = useState({
    startDate: new Date(),
    endDate: new Date().setMonth(11),
  });

  const handleValueChange = (newValue) => {
    console.log("newValue:", newValue);
    setDate(newValue);
  };

  const handleInputChange = (e) => {
    const { trip, value } = e.target;
    setTrip((prevTrip) => ({
      ...prevTrip,
      [trip]: value,
    }));
  };

  const onSaveTrip = (e) => {
    e.preventDefault();
    setLoading(true);

    fetch(`http://localhost:8080/trips/createTrip`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(trip),
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        console.log(data);
        console.log("You created your trip successfully");
        navigate("/");
      })
      .catch((error) => {
        console.log(`Failed to create trip! ${error.message}`);
      });
  };

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
        <button
          className="flex flex-row items-center rounded-xl bg-black-100 px-4 py-3 text-base font-medium text-navy-700 transition duration-200 hover:bg-gray-200 active:bg-gray-300 dark:bg-white/10 dark:text-white dark:hover:bg-white/20 dark:active:bg-white/30"
          onClick={isFormVisible ? handleAddLocation : handleCreateTrip}
        >
          {isFormVisible ? "Add Location" : "Create Trip"}
        </button>

        {isFormVisible && (
          <div>
            <form>
              <label>
                Trip Name:
                <input
                  type="text"
                  value={trip.event}
                  onChange={handleInputChange}
                  // onChange={(e) => setTrip.event(e.target.value)}
                />
              </label>
              <br></br>
              <br></br>
              <label>
                Locations:
                <input
                  type="text"
                  value={
                    // location && location.name
                    trip.locationList
                  }
                  // onChange={(e) => setTrip.locationList(e.target.value)}
                  onChange={handleInputChange}
                />
                <ul>
                  {locations.map((location, index) => (
                    <li key={index}>{location.name}</li>
                  ))}
                </ul>
              </label>
              <br></br>

              <label>
                Add Memento:
                <input
                  type="text"
                  value={trip.mementos}
                  onChange={handleInputChange}
                  // onChange={(e) => setTrip.mementos(e.target.value)}
                />
              </label>
              <br></br>
              <br></br>
              <label>
                Select Departure and Arrival date
                <Datepicker value={date} onChange={setTrip.departureDate} />
              </label>
            </form>
            <button onClick={onSaveTrip}>Save trip</button>
          </div>
        )}
      </div>

      <div className="h-screen w-full">
        <GoogleMap
          zoom={15}
          center={center}
          mapContainerClassName="h-screen w-full"
          options={options}
          onLoad={onLoad}
        >
          {location && <Marker key="0" icon={image.url} position={location} />}
        </GoogleMap>
      </div>
    </div>
  );
};
export default Map;
