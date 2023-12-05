import { GoogleMap, LoadScript } from '@react-google-maps/api';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import "./Homepage.css";
import Header from "./Header/Header";
import React, {useState} from "react";

const Homepage = () => {

  const [address, setAddress] = useState('');
  const [coordinates, setCoordinates] = useState({ lat: null, lng: null });

  const handleSelect = async (value) => {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);
    setAddress(value);
    setCoordinates(latLng);
  };

  const mapStyles = {
    height: '100vh',
    width: '100%',
  };

  const defaultCenter = {
    lat: 40.748817,
    lng: -73.985428,
  };

  return (
    <div>
      <Header/>
      <PlacesAutocomplete
        value={address}
        onChange={setAddress}
        onSelect={handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input {...getInputProps({ placeholder: 'Search address...' })} />
            <div>
              {loading && <div>Loading...</div>}
              {suggestions.map((suggestion) => (
                <div {...getSuggestionItemProps(suggestion)} key={suggestion.id}>
                  {suggestion.description}
                </div>
              ))}
            </div>
          </div>
        )}

      </PlacesAutocomplete>
      <LoadScript
        googleMapsApiKey="AIzaSyD_5tG3mD_cqZUW2uWPFoC1r8XZT2d8WxE"
      >
        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={13}
          center={defaultCenter}
        />
      </LoadScript>
      {coordinates.lat && coordinates.lng && (
        <div>
          <p>Latitude: {coordinates.lat}</p>
          <p>Longitude: {coordinates.lng}</p>
        </div>
      )}
    </div>
  );
}

export default Homepage;