// Needed to reference this here wouldn't work in the vite-env.d.ts
/// <reference types="@types/google.maps" />

import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import getCoordinates from '../utils/geocoding';
import getHistoricalWeather from '../utils/weather';

interface TripFormProps {
  fetchTrips: () => void;
}

const TripForm: React.FC<TripFormProps> = ({ fetchTrips }) => {
  const [fromLocation, setFromLocation] = useState<string>('');
  const [toLocation, setToLocation] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const fromInputRef = useRef<HTMLInputElement>(null);
  const toInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const loadAutocomplete = () => {
      if (window.google && window.google.maps && window.google.maps.places) {
        const fromAutocomplete = new window.google.maps.places.Autocomplete(
          fromInputRef.current!
        );
        const toAutocomplete = new window.google.maps.places.Autocomplete(
          toInputRef.current!
        );

        fromAutocomplete.addListener('place_changed', () => {
          const place = fromAutocomplete.getPlace();
          setFromLocation(place.formatted_address || '');
        });

        toAutocomplete.addListener('place_changed', () => {
          const place = toAutocomplete.getPlace();
          setToLocation(place.formatted_address || '');
        });
      } else {
        console.error('Google Maps API not loaded');
      }
    };

    // Retry google api
    const intervalId = setInterval(() => {
      if (window.google && window.google.maps && window.google.maps.places) {
        loadAutocomplete();
        clearInterval(intervalId);
      }
    }, 100);

    return () => clearInterval(intervalId);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const fromCoords = await getCoordinates(fromLocation);
      const toCoords = await getCoordinates(toLocation);
      const fromWeather = await getHistoricalWeather(
        fromCoords.lat,
        fromCoords.lng,
        startDate
      );
      const toWeather = await getHistoricalWeather(
        toCoords.lat,
        toCoords.lng,
        endDate
      );

      // Save trip and weather info to backend
      await axios.post('http://localhost:8000/api/trips/', {
        fromLocation,
        toLocation,
        startDate,
        endDate,
        fromWeather,
        toWeather,
      });

      fetchTrips();
    } catch (error) {
      console.error('Error saving trip:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>From:</label>
      <input type='text' ref={fromInputRef} required />

      <label>To:</label>
      <input type='text' ref={toInputRef} required />

      <label>Start Date:</label>
      <input
        type='date'
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        required
      />

      <label>End Date:</label>
      <input
        type='date'
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        required
      />

      <button type='submit'>Save Trip</button>
    </form>
  );
};

export default TripForm;
