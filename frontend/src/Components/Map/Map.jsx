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
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useAtom } from "jotai";
import state from "../Atom/Atom";

// import Distance from "./distance";

// const LatLngLiteral = google.maps.LatLngLiteral;
// const DirectionsResult = google.maps.DirectionsResult;
// const MapOptions = google.maps.MapOptions;

const Map = () => {
  const [loading, setLoading] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [memento, setMemento] = useState("");
  const [locations, setLocations] = useState([]);
  const [tripName, setTripName] = useState("");
  const [location, setLocation] = useState();
  const [trip, setTrip] = useState({
    locationList: [],
    departureDate: null,
    arrivalHomeDate: null,
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

 

  const handleInputChange = (fieldName, value) => {
    setTrip((prevTrip) => ({
      ...prevTrip,
      [fieldName]: value,
    }));
  };
  
  const [isDepartureCalendarOpen, setDepartureCalendarOpen] = useState(false);
  const [isArrivalCalendarOpen, setArrivalCalendarOpen] = useState(false);

  const handleDepartureDateChange = (date) => {
    setTrip({ ...trip, departureDate: date });
    setDepartureCalendarOpen(false); // Închide calendarul după ce s-a selectat data
  };

  const handleArrivalDateChange = (date) => {
    setTrip({ ...trip, arrivalHomeDate: date });
    setArrivalCalendarOpen(false); // Închide calendarul după ce s-a selectat data
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
        console.log(data);
      });
  };

    if (loading) {
      return <Loading />;
    }


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
                  value={trip.event}
                  // onChange={handleInputChange}
                  onChange={(e) => handleInputChange("event", e.target.value)}
                />
              </label>
              <br></br>
              <br></br>
              <label className="font-semibold italic ">
                Locations:
                <input
                  type="text"
                  value={
                    // location && location.name
                    trip.locationList
                  }
                  // onChange={(e) => setTrip.locationList(e.target.value)}
                  // onChange={handleInputChange}
                  onChange={(e) =>
                    handleInputChange("locationList", e.target.value)
                  }
                />
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
                  value={trip.mementos}
                  onChange={(e) =>
                    handleInputChange("Mementos", e.target.value)
                  }
                  // onChange={handleInputChange}
                  // onChange={(e) => setTrip.mementos(e.target.value)}
                />
              </label>
              <br></br>
              <br></br>

              <label>
                Select Departure Date:
                <DatePicker
                  selected={trip.departureDate}
                  value={trip.departureDate}
                  onSelect={handleDepartureDateChange}
                  shouldCloseOnSelect={true}
                  open={isDepartureCalendarOpen}
                  onFocus={() => setDepartureCalendarOpen(true)}
                />
              </label>
              <br />
              <label>
                Select Arrival Date:
                <DatePicker
                  selected={trip.arrivalHomeDate}
                  value={trip.arrivalHomeDate}
                  onSelect={handleArrivalDateChange}
                  shouldCloseOnSelect={true}
                  open={isArrivalCalendarOpen}
                  onFocus={() => setArrivalCalendarOpen(true)}
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
  );
};
export default Map;
