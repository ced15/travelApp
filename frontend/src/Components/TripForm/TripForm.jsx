import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../Loading/Loading";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useAtom } from "jotai";
import state from "../Atom/Atom";

const TripForm = ({ locations, updateLocations }) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [loggedUser, setLoggedUser] = useAtom(state.loggedUser);
  const [loading, setLoading] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [allMementos, setAllMementos] = useAtom(state.allMementos);
  const [errorMessage, setErrorMessage] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [mementoDropDown, setMementoDropDown] = useState(false);
  const [memento, setMemento] = useState({
    id: "",
    alarmDate: "",
    mementoMessage: "",
  });
  const [isDepartureCalendarOpen, setDepartureCalendarOpen] = useState(false);
  const [isArrivalCalendarOpen, setArrivalCalendarOpen] = useState(false);
  const [isAlarmDateOpen, setIsAlarmDateOpen] = useState(false);
  const [trip, setTrip] = useState({
    user: null,
    locationList: [],
    departureDate: null,
    arrivalHomeDate: null,
    event: "",
    mementos: [],
  });

  useEffect(() => {
    if (errorMessage) {
      const timeoutId = setTimeout(() => {
        setErrorMessage(false);
      }, 2500);
    }
  }, [errorMessage]);

  
  const displayError = (e) => {
    e.preventDefault();
    setTimeout(() => {
      setMemento({ mementoMessage: "" });
      setIsActive(false);
    }, 2500);
    setMemento({ mementoMessage: "Please enter a memento!" });
    setIsActive(true);
  };

  const handleAddMemento = async (e) => {
    e.preventDefault();
    trip.mementos = [...trip.mementos, memento];
    console.log(trip.mementos)
    console.log(trip.locationList)
    if (memento.alarmDate != null) {
      await fetch(`http://localhost:8080/memento/${memento.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(memento),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data)
          // setMemento({ ...memento, id: data.id });
          setMemento({ mementoMessage: "" });
          console.log("You added your memento successfully");
        })
        .catch((error) => {
          console.log(`Failed to create memento! ${error.message}`);
        });
    }
  };

  const handleMementoDateChange = (date) => {
    setMemento({ ...memento, alarmDate: date });
    setIsAlarmDateOpen(false);
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
    console.log(memento);
  };

  const onSaveTrip = (e) => {
    e.preventDefault();
    trip.locationList = locations;
    console.log(trip)
  
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
          Authorization: `Bearer ${token}`,
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
    const previousLocations = [...locations];
    updateLocations(locations.filter((location) => location.id !== id));

    fetch(`http://localhost:8080/locations/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("You deleted your location successfully");
        console.log(locations);
      })
      .catch((error) => {
        console.log(`Failed to delete location! ${error.message}`);
        updateLocations(previousLocations);
      });
  };
  
  const onClickMemento = (selectedMemento) => {
    setMemento({
      ...memento,
      mementoMessage: selectedMemento.mementoMessage,
      id: selectedMemento.id
      // update other properties of memento as needed
    });
    setMementoDropDown(false);
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="absolute z-10 max-w-screen-sm pr-8">
      <div>
        <div className="bg-white rounded-lg shadow-lg p-4 px-4 md:p-8 mb-6 h-full">
          <div className="text-gray-600 pb-4 text-center">
            <p>Create your Trip</p>
          </div>
          <div className="lg:col-span-2">
            <div className="grid gap-4 gap-y-4 text-sm grid-cols-1 md:grid-cols-6">
              <div className="md:col-span-6">
                <label>Trip Name</label>
                <input
                  type="text"
                  name="full_name"
                  id="full_name"
                  className="h-10 border mt-1 rounded px-2 w-full bg-gray-50"
                  value={trip.event}
                  placeholder="Add your Trip name"
                  onChange={(e) => handleInputChange("event", e.target.value)}
                />
              </div>

              <div className="md:col-span-6">
                <label>
                  Locations
                  <ul>
                    {locations.map((location, index) => (
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
                {/* <input type="text" name="email" id="email" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" value="" placeholder="Add your locations" /> */}
              </div>

              <div className="md:col-span-4">
                <label>Memento</label>

                <div className="max-w-md mx-auto">
                  <div className="relative">
                    <div className="h-10 bg-white flex border border-gray-200 rounded items-center">
                      <input
                        value={memento.mementoMessage}
                        readOnly
                        placeholder="Select your memento"
                        className="px-4 appearance-none outline-none text-gray-800 w-full"
                        checked
                      />

                      {/* <button className="cursor-pointer outline-none focus:outline-none transition-all text-gray-300 hover:text-gray-600">
                          <svg
                            className="w-4 h-4 mx-2 fill-current"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          >
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                          </svg>
                        </button> */}
                      <label
                        className="cursor-pointer outline-none focus:outline-none border-l border-gray-200 transition-all text-gray-300 hover:text-gray-600"
                      >
                        <svg
                          className="w-4 h-4 mx-2 fill-current"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          onClick={() =>
                            !mementoDropDown
                              ? setMementoDropDown(true)
                              : setMementoDropDown(false)
                          }
                        >
                          <polyline points="18 15 12 9 6 15"></polyline>
                          
                        </svg>
                      </label>
                    </div>

                    <input
                      type="checkbox"
                      name="show_more"
                      id="show_more"
                      className="hidden peer"
                      checked
                      readOnly
                    />
                    {mementoDropDown &&
                    <div className="absolute rounded shadow bg-white overflow-hidden hidden peer-checked:flex flex-col w-full mt-1 border border-gray-200">                      
                        {allMementos.map((memento) => (
                          <div 
                          key={memento.id}
                          className="cursor-pointer group z-10">
                            <div className="block p-2 border-transparent border-l-4 group-hover:border-blue-600 group-hover:bg-gray-100 z-10"
                            onClick={() => onClickMemento(memento)}
                            >                            
                              {memento.mementoMessage}
                            </div>
                          </div>
                        ))}

                      {/* <div className="cursor-pointer group">
                          <a className="block p-2 border-transparent border-l-4 group-hover:border-blue-600 group-hover:bg-gray-100">
                            Python
                          </a>
                        </div>
                        <div className="cursor-pointer group border-t">
                          <a className="block p-2 border-transparent border-l-4 group-hover:border-blue-600 border-blue-600 group-hover:bg-gray-100">
                            Javascript
                          </a>
                        </div>
                        <div className="cursor-pointer group border-t">
                          <a className="block p-2 border-transparent border-l-4 group-hover:border-blue-600 group-hover:bg-gray-100">
                            Node
                          </a>
                        </div>
                        <div className="cursor-pointer group border-t">
                          <a className="block p-2 border-transparent border-l-4 group-hover:border-blue-600 group-hover:bg-gray-100">
                            PHP
                          </a>
                        </div> */}
                    </div>}
                  </div>
                </div>

                {/* <input
                  type="text"
                  name="address"
                  id="address"
                  className={`${
                    isActive
                      ? "text-red-500 h-6 border mt-1 rounded px-2 w-full bg-gray-50"
                      : "h-6 border mt-1 rounded px-2 w-full bg-gray-50"
                  }`}
                  value={memento.mementoMessage}
                  placeholder="Add your memento"
                  onInput={(e) =>
                    setMemento({ mementoMessage: e.target.value })
                  }
                /> */}
                <button
                  onClick={
                    memento.mementoMessage != ""
                      ? handleAddMemento
                      : displayError
                  }
                >
                  Add memento
                </button>
              </div>

              <div className="md:col-span-2">
                <label>
                  Alarm Date
                  <DatePicker
                    className="h-6 border mt-1 rounded px-2 w-full bg-gray-50 z-0"
                    selected={memento.alarmDate}
                    value={memento.alarmDate}
                    onSelect={handleMementoDateChange}
                    open={isAlarmDateOpen}
                    onFocus={() => setIsAlarmDateOpen(true)}
                    minDate={new Date()}
                  />
                </label>
                {/* <textarea type="text" name="address" id="address" className="h-16 pt-2 border mt-1 rounded px-4 w-full bg-gray-50" value="" placeholder="Add your alarm date" /> */}
              </div>

              <div className="md:col-span-3">
                <label>
                  Select Departure Date:
                  <DatePicker
                    className="h-6 border mt-1 rounded px-2 w-full bg-gray-50 z-0"
                    selected={trip.departureDate}
                    value={trip.departureDate}
                    onSelect={handleDepartureDateChange}
                    open={isDepartureCalendarOpen}
                    onFocus={() => setDepartureCalendarOpen(true)}
                    minDate={new Date()}
                  />
                </label>
              </div>

              <div className="md:col-span-3">
                <label>
                  Select Arrival Date
                  <DatePicker
                    className="h-6 border mt-1 rounded px-2 w-full bg-gray-50"
                    selected={trip.arrivalHomeDate}
                    value={trip.arrivalHomeDate}
                    onSelect={handleArrivalDateChange}
                    open={isArrivalCalendarOpen}
                    onFocus={() => setArrivalCalendarOpen(true)}
                    minDate={trip.departureDate}
                  />
                </label>
              </div>
              {errorMessage && (
                <h1 className="text-red-500 font-semibold italic w-48">
                  Please complete all the fields!
                </h1>
              )}
              <div className="md:col-span-6 text-right">
                <div className="inline-flex items-end">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
                    onClick={onSaveTrip}
                  >
                    Save Trip
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default TripForm;
