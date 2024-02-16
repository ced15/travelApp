import React, { useEffect } from "react";
import { useState } from "react";
import { useAtom } from "jotai";
import state from "../Atom/Atom";
import DatePicker from "react-datepicker";
import Loading from "../Loading/Loading";
import { useNavigate } from "react-router-dom";

export default function UpdateTripForm({
  showFormAndTrip,
  setShowFormAndTrip,
}) {
  const token = localStorage.getItem("token");
  const [loggedUser, setLoggedUser] = useAtom(state.loggedUser);
  const [mementoDropDown, setMementoDropDown] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [isAlarmDateOpen, setIsAlarmDateOpen] = useState(false);
  const [isDepartureCalendarOpen, setDepartureCalendarOpen] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isArrivalCalendarOpen, setArrivalCalendarOpen] = useState(false);
  const [allMementos, setAllMementos] = useAtom(state.allMementos);
  const [isActive, setIsActive] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [memento, setMemento] = useState({
    id: "",
    alarmDate: "",
    mementoMessage: "",
  });

  useEffect(() => {
    if (errorMessage) {
      const timeoutId = setTimeout(() => {
        setErrorMessage(false);
      }, 2500);
    }
  }, [errorMessage]);

  const handleInputChange = (fieldName, value) => {
    setShowFormAndTrip((prevTrip) => ({
      trip: {
        ...prevTrip.trip,
        [fieldName]: value,
      },
      state: true,
    }));
  };

  const handleDepartureDateChange = (date) => {
    setShowFormAndTrip((prevTrip) => ({
      trip: {
        ...prevTrip.trip,
        departureDate: date,
      },
      state: true,
    }));
    setDepartureCalendarOpen(false);
  };

  const handleArrivalDateChange = (date) => {
    if (date >= showFormAndTrip.trip.departureDate) {
      setShowFormAndTrip((prevTrip) => ({
        trip: {
          ...prevTrip.trip,
          arrivalHomeDate: date,
        },
        state: true,
      }));
    } else {
      console.error("Data de sosire trebuie să fie după data de plecare.");
    }
    setArrivalCalendarOpen(false);
  };

  const displayError = (message) => {
    setTimeout(() => {
      setMemento({ mementoMessage: "" });
      setIsActive(false);
      setIsButtonDisabled(false);
    }, 2500);
    setMemento({ mementoMessage: message });
    setIsButtonDisabled(true);
    setIsActive(true);
  };

  const handleMementoDateChange = (date) => {
    setMemento({ ...memento, alarmDate: date });
    setIsAlarmDateOpen(false);
  };

  const onClickMemento = (selectedMemento) => {
    setMemento({
      ...memento,
      mementoMessage: selectedMemento.mementoMessage,
      id: selectedMemento.id,
    });
    setMementoDropDown(false);
  };

  const handleDeleteLocation = (e, id) => {
    e.preventDefault();
    const previousLocations = [...showFormAndTrip.trip.locationList];
    setShowFormAndTrip((prevTrip) => ({
      trip: {
        ...prevTrip.trip,
        locationList: showFormAndTrip.trip.locationList.filter(
          (location) => location.id !== id
        ),
      },
      state: true,
    }));

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
      })
      .catch((error) => {
        console.log(`Failed to delete location! ${error.message}`);
        setShowFormAndTrip((prevTrip) => ({
          trip: {
            ...prevTrip.trip,
            locationList: previousLocations,
          },
          state: true,
        }));
      });
  };

  const handleDeleteMemento = (e, id) => {
    setShowFormAndTrip((prevTrip) => ({
      trip: {
        ...prevTrip.trip,
        mementos: showFormAndTrip.trip.mementos.filter(
          (thisMemento) => thisMemento.id !== id
        ),
      },
      state: true,
    }));
    console.log(showFormAndTrip.trip.mementos);
  };

  const handleAddMemento = () => {
    const isMementoAlreadyAdded = showFormAndTrip.trip.mementos.some(
      (thisMemento) => thisMemento.id === memento.id
    );

    if (memento.alarmDate == null) {
      displayError("Please enter the alarm date!");
    } else {
      if (
        !isMementoAlreadyAdded &&
        memento.mementoMessage != "" &&
        !isButtonDisabled
      ) {
        handleInputChange("mementos", [
          ...showFormAndTrip.trip.mementos,
          memento,
        ]);
      } else {
        displayError("Memento Already exists!");
      }
    }
  };

  const onSaveTrip = (e) => {
    e.preventDefault();
    if (
      showFormAndTrip.trip.name == "" ||
      showFormAndTrip.trip.mementos.length == 0 ||
      showFormAndTrip.trip.locationList.length == 0 ||
      showFormAndTrip.trip.arrivalHomeDate == "" ||
      showFormAndTrip.trip.departureDate == ""
    ) {
      setErrorMessage(true);
    } else {
      setErrorMessage(false);
      setLoading(true);
      fetch(`http://localhost:8080/trips/updateTrip/${showFormAndTrip.trip.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(showFormAndTrip.trip),
      })
        .then((res) => res.json())
        .then((data) => {
          setLoading(false);
          console.log("You updated your trip successfully");
          setShowFormAndTrip({state: false});
          navigate("/homepage");
        })
        .catch((error) => {
          console.log(`Failed to update trip! ${error.message}`);
        });
    }
  };

  return (
    <>
      {loading ? (
        <div className="absolute z-50 h-screen w-full">
          <Loading />
        </div>
      ) : (
        <div className="absolute z-10 max-w-screen-sm right-72">
          <div className="bg-white rounded-lg shadow-lg p-4 px-4 md:p-8 mb-6 z-10">
            <div className="text-gray-600 pb-4 text-center">
              <p>Update Trip</p>
            </div>
            <div className="lg:col-span-2">
              <div className="grid gap-4 gap-y-4 text-sm grid-cols-1 md:grid-cols-6">
                <div className="md:col-span-6">
                  <label>Trip Name</label>
                  <input
                    type="text"
                    className="h-6 border mt-1 rounded px-2 w-full bg-gray-50"
                    value={showFormAndTrip.trip.event}
                    placeholder="Add your Trip name"
                    onChange={(e) => handleInputChange("event", e.target.value)}
                  />
                </div>

                <div className="md:col-span-6">
                  <label>
                    Locations
                    <div className="bg-white shadow-lg rounded-lg overflow-hidden pt-2">
                      <ul className="divide-y divide-gray-200">
                        {showFormAndTrip.trip.locationList.map(
                          (location, index) => (
                            <li
                              className="flex justify-between items-center user-card"
                              key={index}
                            >
                              <div className="flex items-center pl-2">
                                <span className="ml-3 font-medium">
                                  {location.locationName}
                                </span>
                              </div>
                              <div>
                                <button
                                  type="button"
                                  className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                                  onClick={(e) =>
                                    handleDeleteLocation(e, location.id)
                                  }
                                >
                                  <span className="sr-only">Close menu</span>
                                  <svg
                                    className="h-6 w-6"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      d="M6 18L18 6M6 6l12 12"
                                    />
                                  </svg>
                                </button>
                              </div>
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  </label>
                </div>

                <div className="md:col-span-4">
                  <label>
                    Memento
                    <div className="max-w-md pt-1">
                      <div className="relative pt-1">
                        <div className="h-6 bg-gray-50 flex border border-gray-200 rounded items-center">
                          <input
                            value={memento.mementoMessage}
                            readOnly
                            placeholder="Select your memento"
                            className={
                              isActive
                                ? "px-2 text-red-500 w-full"
                                : "px-2 appearance-none outline-none text-gray-800 w-full bg-gray-50"
                            }
                            checked
                          />

                          <label className="cursor-pointer outline-none focus:outline-none border-l border-gray-200 transition-all text-gray-300 hover:text-gray-600">
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
                        {mementoDropDown && (
                          <div className="absolute rounded shadow bg-gray-50 overflow-hidden hidden peer-checked:flex flex-col w-full mt-1 border border-gray-200 z-10">
                            {allMementos.map((memento) => (
                              <div
                                key={memento.id}
                                className="cursor-pointer group z-10"
                              >
                                <div
                                  className="block p-2 border-transparent border-l-4 group-hover:border-blue-600 group-hover:bg-gray-100 z-10"
                                  onClick={() => onClickMemento(memento)}
                                >
                                  {memento.mementoMessage}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </label>
                </div>
                <div className="md:col-span-2 pt-1">
                  <label>
                    Alarm Date
                    <DatePicker
                      className="h-6 border mt-1 rounded px-2 w-full bg-gray-50 z-10"
                      selected={memento.alarmDate}
                      value={memento.alarmDate}
                      onSelect={handleMementoDateChange}
                      open={isAlarmDateOpen}
                      onFocus={() => setIsAlarmDateOpen(true)}
                      minDate={new Date()}
                    />
                  </label>
                </div>

                <button
                  onClick={() => handleAddMemento()}
                  className={`md:col-span-2 text-left ${
                    isButtonDisabled
                      ? "disabled:opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                >
                  Add memento
                </button>

                <div className="md:col-span-6">
                  <div className="bg-white shadow-lg rounded-lg overflow-hidden pt-2">
                    <ul className="divide-y divide-gray-200">
                      {showFormAndTrip.trip.mementos.map((memento, index) => (
                        <li
                          className="flex justify-between items-center user-card"
                          key={index}
                        >
                          <div className="flex items-center pl-2">
                            <span className="ml-3 font-medium">
                              {memento.mementoMessage}
                            </span>
                          </div>
                          <div>
                            <button
                              type="button"
                              className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                              onClick={(e) =>
                                handleDeleteMemento(e, memento.id)
                              }
                            >
                              <span className="sr-only">Close menu</span>
                              <svg
                                className="h-6 w-6"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                aria-hidden="true"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M6 18L18 6M6 6l12 12"
                                />
                              </svg>
                            </button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="md:col-span-3">
                  <label>
                    Select Departure Date:
                    <DatePicker
                      className="h-6 border mt-1 rounded px-2 w-full bg-gray-50 z-0"
                      selected={new Date(showFormAndTrip.trip.departureDate)}
                      value={new Date(showFormAndTrip.trip.departureDate)}
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
                      selected={new Date(showFormAndTrip.trip.arrivalHomeDate)}
                      value={new Date(showFormAndTrip.trip.arrivalHomeDate)}
                      onSelect={handleArrivalDateChange}
                      open={isArrivalCalendarOpen}
                      onFocus={() => setArrivalCalendarOpen(true)}
                      minDate={showFormAndTrip.trip.departureDate}
                    />
                  </label>
                </div>

                {errorMessage && (
                  <h1 className="text-red-500 font-semibold italic w-48">
                    Please complete all the fields!
                  </h1>
                )}

                <div className="md:col-span-6 text-right">
                  <div className="inline-flex items-end pt-4">
                    <button
                      onClick={onSaveTrip}
                      className="bg-gray-500 hover:bg-gray-400 text-white font-bold py-2 px-4 rounded-md"
                    >
                      Save Trip
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
