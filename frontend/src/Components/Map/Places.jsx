import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
  getDetails,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";
import "./Map.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import Datepicker from "react-tailwindcss-datepicker"; 
// import { saveToken, getToken, removeToken, decodeToken } from "./jwtService";

export default function Places({ setLocation }) {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [tripName, setTripName] = useState("");
  const [user, setUser] = useState("");
  const [locations, setLocations] = useState([]);
  const [date, setDate] = useState({
  startDate: new Date(),
  endDate: new Date().setMonth(11),
}); 
  const [memento, setMemento] = useState("");
  const [locationsForDatabase, setLocationsForDatabase] = useState([]);

  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();

  const handleSelect = async (val) => {
    setValue(val, false);
    clearSuggestions();
    const results = await getGeocode({ address: val });
    const { lat, lng } = await getLatLng(results[0]);
    const details = await getDetails({ placeId: results[0].place_id });
    const locationName = details?.name || "Unknown Location";

    setLocationsForDatabase([
      ...locationsForDatabase,
      { name: locationName, lat, lng },
    ]);
  };

  const handleCreateTrip = () => {
    setIsFormVisible(true);
  };

  const handleAddLocation = () => {};

  const handleAddMemento = () => {
    setMemento("");
  };
const handleValueChange = (newValue) => {
  console.log("newValue:", newValue);
  setValue(newValue);
}; 
  return (
    <div>
      <Combobox onSelect={handleSelect}>
        <ComboboxInput
          value={value}
          onChange={(e) => setValue(e.target.value)}
          disabled={!ready}
          className="w-full p-2 text-black"
          placeholder="Search"
        />
        <button
          className="flex flex-row items-center rounded-xl bg-gray-100 px-4 py-3 text-base font-medium text-navy-700 transition duration-200 hover:bg-gray-200 active:bg-gray-300 dark:bg-white/10 dark:text-white dark:hover:bg-white/20 dark:active:bg-white/30"
          onClick={isFormVisible ? handleAddLocation : handleCreateTrip}
        >
          {isFormVisible ? "Add Location" : "Create Trip"}
          {/* <MdChevronRight className="text-lg" /> */}
        </button>
        <ComboboxPopover>
          <ComboboxList>
            {status === "OK" &&
              data.map(({ place_id, description }) => (
                <ComboboxOption key={place_id} value={description} />
              ))}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>

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
            <ul>
              {locations.map((location, index) => (
                <li key={index}>{location.name}</li>
              ))}
            </ul>
            <label>
              Add Memento:
              <input
                type="text"
                value={memento}
                onChange={(e) => setMemento(e.target.value)}
              />
            </label>
            <br></br>
            <label>
              Select Departure and Arrival date
              <Datepicker value={value} onChange={handleValueChange} />
            </label>
          </form>
          <button onClick={handleAddMemento}>Save trip</button>
        </div>
      )}
    </div>
  );
}
