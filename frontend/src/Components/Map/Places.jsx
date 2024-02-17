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
import { useState } from "react";

export default function Places({ setLocation }) {
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
    const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    const locationName = details?.name || "Unknown Location";
    const address = details?.formatted_address || "Address not available";
    const photo = `https://maps.googleapis.com/maps/api/streetview?size=400x200&location=${lat},${lng}&fov=90&heading=235&pitch=10&key=${googleMapsApiKey}`;
    setLocation({ lat, lng, name: locationName, address, photo });
  };

  return (
    <div>
      <Combobox onSelect={handleSelect}>
        <ComboboxInput
          value={value}
          onChange={(e) => setValue(e.target.value)}
          disabled={!ready}
          className="w-60 p-3 rounded-xl   focus:outline-0 focus:outline-primary-100 focus:ring-2 focus:ring-primary-100 bg-gray-50 text-black font-bold"
          placeholder="Search for a location"
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
