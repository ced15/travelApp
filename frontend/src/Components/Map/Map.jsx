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
// import TripForm from "../TripForm/TripForm";

const Map = () => {
  const navigate = useNavigate();
  const [loggedUser, setLoggedUser] = useAtom(state.loggedUser);
  const [loading, setLoading] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [locationObject, setLocationObject] = useState({
    id: "",
    locationName: "",
    locationAddress: "",
    visited: false,
    notes: "",
    pinPoints: null,
  });
  const [memento, setMemento] = useState({
    id: "",
    alarmDate: "",
    mementoMessage: "",
  });
  const [locations, setLocations] = useState([]);
  const [location, setLocation] = useState();
  const [isDepartureCalendarOpen, setDepartureCalendarOpen] = useState(false);
  const [isArrivalCalendarOpen, setArrivalCalendarOpen] = useState(false);
  const [trip, setTrip] = useState({
    user: null,
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
    url: "/images/pin_raccoon_1_17.png",
  };

  useEffect(() => {
    if (errorMessage) {
      const timeoutId = setTimeout(() => {
        setErrorMessage(false);
      }, 2500);
    }
  }, [errorMessage]);

  const handleCreateTrip = () => {
    setIsFormVisible(true);
  };

  const displayError = (e) => {
    e.preventDefault();
    setTimeout(() => {
      setMemento({ mementoMessage: "" });
      setIsActive(false);
    }, 2500);
    setMemento({ mementoMessage: "Please enter a memento!" });
    setIsActive(true);
  };

  const handleAddLocation = async () => {
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
        trip.locationList.push(data);
        setLocationObject({ ...locationObject, id: data.id });
        console.log("You added your location successfully");
      })
      .catch((error) => {
        console.log(`Failed to create location! ${error.message}`);
      });
  };

  const handleAddMemento = async (e) => {
    e.preventDefault();
    console.log(locationObject);
    

    await fetch(`http://localhost:8080/memento/createMemento`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(memento),
    })
      .then((res) => res.json())
      .then((data) => {
        setMemento({ ...memento, id: data.id });
        trip.mementos = [...trip.mementos, data];
        setMemento({ mementoMessage: "" });
        console.log("You added your memento successfully");
      })
      .catch((error) => {
        console.log(`Failed to create memento! ${error.message}`);
      });
  };

  const handleInputChange = (fieldName, value) => {
    setTrip((prevTrip) => ({
      ...prevTrip,
      [fieldName]: value,
    }));
  };

  const handleDepartureDateChange = (date) => {
    console.log(memento);
    setTrip({ ...trip, departureDate: date });
    setDepartureCalendarOpen(false);
  };

  const handleArrivalDateChange = (date) => {
    if (date >= trip.departureDate) {
      setTrip({ ...trip, arrivalHomeDate: date });
    } else {
      console.error("Data de sosire trebuie să fie după data de plecare.");
    }
    setArrivalCalendarOpen(false); // Închide calendarul după ce s-a selectat data
  };

  const onSaveTrip = (e) => {
    e.preventDefault();

    if (
      trip.name == "" ||
      trip.mementos.length == 0 ||
      trip.locationList.length == 0 ||
      trip.arrivalHomeDate == "" ||
      trip.departureDate == ""
    ) {
      setErrorMessage(true);
    } else {
      setErrorMessage(false);
      setLoading(true);
      console.log(trip.locationList);
      fetch(`http://localhost:8080/trips/createTrip/${loggedUser.id}`, {
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
          console.log("You created your trip successfully");
          navigate("/");
        })
        .catch((error) => {
          console.log(`Failed to create trip! ${error.message}`);
        });
    }
  };
  const handleDeleteLocation = (e, id) => {
    e.preventDefault();
    fetch(`http://localhost:8080/locations/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("You deleted your location successfully");
        setTrip((prevTrip) => ({
          ...prevTrip,
          locationList: prevTrip.locationList.filter(
            (location) => location.id !== id
          ),
        }));
      })
      .catch((error) => {
        console.log(`Failed to delete location! ${error.message}`);
      });
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="flex relative z-0 justify-end items-center">
      {/* < TripForm/> */}
      <div className="w-1/7 p-4 bg-black text-white relative pt-20">
        <h1 className="font-semibold italic pb-2"> Search for a location </h1>
        <Places
          setLocation={(position) => {
            setLocation(position);
            setLocationObject({
              locationName: position.name,
              locationAddress: position.address,
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

        {isFormVisible && (
          <div>
            <form>
              <label className="font-semibold italic">
                Trip Name:
                <br></br>
                <div className="pb-1"></div>
                <input
                  className="w-full text-black"
                  type="text"
                  value={trip.event}
                  onChange={(e) => handleInputChange("event", e.target.value)}
                />
              </label>
              <br></br>
              <br></br>
              <label className="font-semibold italic ">
                Locations:
                <ul>
                  {trip.locationList.map((location, index) => (
                    <li key={index}>
                      {location.locationName}
                      <button
                        className="pl-4"
                        onClick={(e) => handleDeleteLocation(e, location.id)}
                      >
                        X
                      </button>
                    </li>
                  ))}
                </ul>
              </label>
              <br></br>
              <label className="font-semibold italic">
                Memento:
                <br></br>
                <div className="pb-1"></div>
                <textarea
                  className={`${
                    isActive
                      ? "text-red-500 w-full h-24 pl-0.5 font-semibold italic text-lg"
                      : "w-full h-24 pl-0.5 text-black font-semibold italic"
                  }`}
                  type="text"
                  value={memento.mementoMessage}
                  onInput={(e) =>
                    setMemento({ mementoMessage: e.target.value })
                  }
                />
                <button
                  onClick={
                    memento.mementoMessage != ""
                      ? handleAddMemento
                      : displayError
                  }
                >
                  {" "}
                  Add memento{" "}
                </button>
              </label>
              <br></br>
              <br></br>

              <label>
                Select Departure Date:
                <div className="pb-1"></div>
                <DatePicker
                  className="text-black pl-1 w-full"
                  selected={trip.departureDate}
                  value={trip.departureDate}
                  onSelect={handleDepartureDateChange}
                  open={isDepartureCalendarOpen}
                  onFocus={() => setDepartureCalendarOpen(true)}
                  minDate={new Date()}
                />
              </label>
              <br />
              <label>
                <div className="pb-1"></div>
                Select Arrival Date:
                <div className="pb-1"></div>
                <DatePicker
                  className="text-black pl-1 w-full"
                  selected={trip.arrivalHomeDate}
                  value={trip.arrivalHomeDate}
                  onSelect={handleArrivalDateChange}
                  open={isArrivalCalendarOpen}
                  onFocus={() => setArrivalCalendarOpen(true)}
                  minDate={trip.departureDate}
                />
              </label>
              <br></br>
              {errorMessage && (
                <div className="pt-2 text-red-500 font-semibold italic text-lg">
                  {" "}
                  Please complete all the fields!{" "}
                </div>
              )}
              <div className="pt-12 text-center">
                <button
                  className="font-semibold italic text-2xl mx-auto text-center"
                  onClick={onSaveTrip}
                >
                  Save trip
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      <div className="h-screen w-full">
        <GoogleMap
          zoom={15}
          center={center}
          mapContainerClassName="h-screen w-full relative z-0"
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
