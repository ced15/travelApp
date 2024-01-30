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

  const [departureDate, setDepartureDate] = useState({
    Date: new Date(),
  });

  const [arrivalDate, setArrivalDate] = useState({
    Date: new Date(),
  });

  const handleDepartureDateChange = (newValue) => {
    setDepartureDate((prevDate) => ({
      ...prevDate,
      startDate: newValue.startDate,
    }));
    handleInputChange("departureDate", newValue.startDate);
  };

  const handleArrivalDateChange = (newValue) => {
    setArrivalDate((prevDate) => ({
      ...prevDate,
      endDate: newValue.startDate,
    }));
    handleInputChange("arrivalHomeDate", newValue.startDate);
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
          className="flex flex-row items-center rounded-xl bg-black-100 py-3 text-base font-medium text-navy-700"
          onClick={isFormVisible ? handleAddLocation : handleCreateTrip}
        >
          {isFormVisible ? "Add Location" : "Create Trip"}

          {/* <MdChevronRight className="text-lg" /> */}
        </button>

        {isFormVisible && (
          <div>
            <form>
              <label className="font-semibold italic">
                Trip Name:
                <br></br>
                <div className="pb-1"></div>
                <input className="w-full text-black"
                  type="text"
                  value={tripName}
                  onChange={(e) => setTripName(e.target.value)}
                />
              </label>
              <br></br>
              <br></br>
              <label className="font-semibold italic ">
                Locations:
                <ul>
                  {locations.map((location, index) => (
                    <li key={index}>{location.name}</li>
                  ))}
                </ul>
              </label>
              <br></br>
              <label className="font-semibold italic">
                Add Memento:
                <br></br>
                <div className="pb-1"></div>
                <textarea className="w-full text-black h-24 pl-0.5"
                  type="text"
                  value={memento}
                  onChange={(e) => setMemento(e.target.value)}
                />
              </label>
              <br></br>
              <br></br>
              <label className="font-semibold italic">               
                Select Departure Date:
                <div className="pb-1"></div>
                <Datepicker className="text-black"
                  value={departureDate}
                  onChange={handleDepartureDateChange}
                />
              </label>
              <br />
              <label className="font-semibold italic">
                Select Arrival Date:
                <div className="pb-1"></div>
                <Datepicker className="text-black"
                  value={arrivalDate}
                  onChange={handleArrivalDateChange}
                />
              </label>
            </form>
            <button className="pt-2 font-semibold italic text-lg place-content-center">Save trip</button>
          </div>
        )}
      </div>



      <div className="h-screen w-full">
        <GoogleMap
          zoom={15}
          center={center}
          mapContainerClassName="h-screen w-full"
          options={options}
          onLoad={onLoad}>
          {location && <Marker key='0' icon={image.url} position={location} />}
        </GoogleMap>
      </div>
    </div>
  )
}
export default Map;
