// import styled from 'styled-components';
import { useRef, useEffect, useState } from 'react';
import { useMapsLibrary } from '@vis.gl/react-google-maps';
import { Input } from '@mui/material';

interface Props {
  onPlaceSelect: (place: google.maps.places.PlaceResult) => void;
}

// This is an example of the classic "Place Autocomplete" widget.
// https://developers.google.com/maps/documentation/javascript/place-autocomplete
export const PlaceAutocomplete = ({ onPlaceSelect }: Props) => {
  const [placeAutocomplete, setPlaceAutocomplete] =
    useState<google.maps.places.Autocomplete | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const places = useMapsLibrary('places');

  useEffect(() => {
    if (!places || !inputRef.current) return;

    const sessionToken = new window.google.maps.places.AutocompleteSessionToken();
    const options = {
      fields: ['geometry', 'name', 'formatted_address', 'address_components'],
      componentRestrictions: { country: ['PH'] },
      sessionToken: sessionToken
    };

    setPlaceAutocomplete(new places.Autocomplete(inputRef.current, options));
  }, [places]);

  useEffect(() => {
    if (!placeAutocomplete) return;

    placeAutocomplete.addListener('place_changed', () => {
      const place = placeAutocomplete.getPlace();
      if (!place.geometry) {
        window.alert(`No details available for input: '${place.name}'`);
        return;
      }
      onPlaceSelect(place);
    });
  }, [onPlaceSelect, placeAutocomplete]);

  return <Input inputRef={inputRef} placeholder='Enter Current Home Address' />;
};
