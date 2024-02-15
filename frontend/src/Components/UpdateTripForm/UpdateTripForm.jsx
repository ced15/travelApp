import React, { useEffect } from "react";
import { useState } from "react";

export default function UpdateTripForm({
  showFormAndTrip
}) {
  const token = localStorage.getItem("token");
  const [locationsFromTrip, setLocationsFromTrip] = useState([
    ...showFormAndTrip.trip.locationList,
  ]);

  useEffect(() => {
    console.log(showFormAndTrip);
    setLocationsFromTrip([...showFormAndTrip.trip.locationList])
  },[showFormAndTrip])

  const handleDeleteLocation = (e, id) => {
    e.preventDefault();
    const previousLocations = [...locationsFromTrip]
    setLocationsFromTrip(locationsFromTrip.filter((location) => location.id !== id))

    fetch(`http://localhost:8080/trips/deleteLocationFromTrip/${showFormAndTrip.trip.id}/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => res.json())
      .then(() => {
        console.log("You deleted your location successfully");
      })
      .catch((error) => {
        console.log(`Failed to delete location! ${error.message}`);
        setLocationsFromTrip(previousLocations)
      });
  };

  return (
    <div className="absolute z-10 max-w-screen-sm pr-8">
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
              />
            </div>

            <div className="md:col-span-6">
              <label>
                Locations
                <div className="bg-white shadow-lg rounded-lg overflow-hidden pt-2">
                  <ul className="divide-y divide-gray-200">
                    {locationsFromTrip.map((location, index) => (
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
                    ))}
                  </ul>
                </div>
              </label>
            </div>

            <div className="md:col-span-4">
              <label>Memento</label>

              <div className="max-w-md mx-auto">
                <div className="relative pt-1">
                  <div className="h-6 bg-gray-50 flex border border-gray-200 rounded items-center">
                    <input
                      readOnly
                      placeholder="Select your memento"
                      className="px-2 appearance-none outline-none text-gray-800 w-full bg-gray-50"
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
                  {/* {mementoDropDown && (
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
                    )} */}
                </div>
              </div>

              <button className="pt-1">Add memento</button>
            </div>

            {/* <div className="md:col-span-3">
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
              </div> */}

            {/* <div className="md:col-span-3">
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
              </div> */}

            <div className="md:col-span-6 text-right">
              <div className="inline-flex items-end pt-4">
                <button className="bg-gray-500 hover:bg-gray-400 text-white font-bold py-2 px-4 rounded-md">
                  Save Trip
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
