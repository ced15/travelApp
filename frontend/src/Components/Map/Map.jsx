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
import "./Map.css"

// import Distance from "./distance";

// const LatLngLiteral = google.maps.LatLngLiteral;
// const DirectionsResult = google.maps.DirectionsResult;
// const MapOptions = google.maps.MapOptions;
import supabase from "../../supabase";


const Map = () => {
    const navigate = useNavigate();

  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");

      if (token) {
        try {
          const { data, error } = await supabase
            .from("token")
            .select("user_id")
            .filter("token", "eq", token)
            .single();

          if (error) {
            throw error;
          }

          if (data && data.user_id) {
            const userId = data.user_id;
            const userData = await supabase
              .from("_user")
              .select("id, first_name, last_name, email")
              .eq("id", userId)
              .single();

            if (userData.error) {
              throw userData.error;
            }
            setUser(userData.data);
            console.log(user);
          } else {
            console.error("No user found for the given token.");
          }
        } catch (error) {
          console.error("Error fetching user data:", error.message);
        }
      }
    };
    fetchUserData();
  }, []);

  const [loading, setLoading] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [memento, setMemento] = useState("");
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
    mementoList: []
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
    url: "https://www.simpleimageresizer.com/_uploads/photos/270d802c/pin_raccoon_1_17.png",
  };

  useEffect(() => {
    if (errorMessage) {
      const timeoutId = setTimeout(() => {
        setErrorMessage(false);
      }, 2500);

      // return () => clearTimeout(timeoutId);
    }
  }, [errorMessage]);

  const handleCreateTrip = () => {
    setIsFormVisible(true);
  };

  const displayError = (e) => {
    e.preventDefault();
    setTimeout(() => {
      setMemento("")
      setIsActive(false);
    }, 2500);
    setMemento("Please enter a memento!");
    setIsActive(true);
  };

  const handleAddLocation = () => {
    location != null &&
      setLocations((prevLocations) => [...prevLocations, location]);
    handleInputChange("locationList", [...trip.locationList, location.name]);
    console.log(locations);
    console.log(trip.locationList);
  };

  const handleAddMemento = (e) => {
    e.preventDefault();
    handleInputChange("mementoList", [...trip.mementoList, memento]);
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
  console.log(trip);
};

  const handleDepartureDateChange = (date) => {
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

    if (trip.name == "" || trip.mementoList.length == 0 ||
      trip.locationList.length == 0 || trip.arrivalHomeDate == "" ||
      trip.departureDate == "") {
      setErrorMessage(true);
    } else {
      setErrorMessage(false);
      setLoading(true);
    // trip.user = {id:user.id}
    fetch(`http://localhost:8080/trips/createTrip/${user.id}`, {
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
        .then((res) => res.json())
        .then((data) => {
          setLoading(false);
          console.log(localStorage.getItem("token"))
          console.log(data);
          console.log(trip)
          console.log("You created your trip successfully");
          navigate("/");
        })
        .catch((error) => {
          console.log(`Failed to create trip! ${error.message}`);
        });
    }
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
                  {locations.map((location, index) => (
                    <li key={index}>{location.name}</li>
                  ))}
                </ul>
              </label>
              <br></br>
              <label className="font-semibold italic">
                Memento:
                <br></br>
                <div className="pb-1"></div>
                <textarea
                  className={`${isActive ? 'text-red-500 w-full h-24 pl-0.5 font-semibold italic text-lg' : 'w-full h-24 pl-0.5 text-black font-semibold italic'}`}
                  type="text"
                  value={memento}
                  onChange={(e) => setMemento(e.target.value)}
                />
                <button onClick={memento != "" ? handleAddMemento : displayError}> Add memento </button>
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
                />
              </label>
              <br></br>
              {errorMessage && <div className="pt-2 text-red-500 font-semibold italic text-lg"> Please complete all the fields! </div>}
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
