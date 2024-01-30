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

                    {/* <MdChevronRight className="text-lg" /> */}
                </button>

                {isFormVisible && (
                    <div>
                        <form>
                            <label>
                                Trip Name:
                                <input
                                    type="text"
                                    value={tripName}
                                    onChange={(e) => setTripName(e.target.value)}
                                />
                            </label>
                            <br></br>
                            <br></br>
                            <label>
                                Locations:
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
                                    value={memento}
                                    onChange={(e) => setMemento(e.target.value)}
                                />
                            </label>
                            <br></br>
                            <br></br>
                            <label>
                                Select Departure and Arrival date
                                <Datepicker value={date} onChange={handleValueChange} />
                            </label>
                        </form>
                        <button>Save trip</button>
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
