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
// import { saveToken, getToken, removeToken, decodeToken } from "./jwtService";

export default function Places({ setLocation }) {
  const [user, setUser] = useState("");
  const [date, setDate] = useState({
  startDate: new Date(),
  endDate: new Date().setMonth(11),
}); 
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
    setLocation({ lat, lng, name: locationName });
    // setLocationsForDatabase([
    //   ...locationsForDatabase,
    //   { name: locationName, lat, lng },
    // ]);
  };

  


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
        <ComboboxPopover>
          <ComboboxList>
            {status === "OK" &&
              data.map(({ place_id, description }) => (
                <ComboboxOption key={place_id} value={description} />
              ))}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
     </div>
  );
}
