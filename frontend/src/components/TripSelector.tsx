import React from 'react';

interface Trip {
  id: number;
  fromLocation: string;
  toLocation: string;
  startDate: string;
  endDate: string;
}

interface TripSelectorProps {
  trips: Trip[];
  selectedTripId: number | null;
  onSelectTrip: (tripId: number) => void;
}

const TripSelector: React.FC<TripSelectorProps> = ({
  trips,
  selectedTripId,
  onSelectTrip,
}) => {
  return (
    <div>
      <label>Select Trip:</label>
      <select
        value={selectedTripId !== null ? selectedTripId : ''}
        onChange={(e) => onSelectTrip(parseInt(e.target.value, 10))}
      >
        <option value='' disabled>
          Select an existing trip
        </option>
        {trips.map((trip) => (
          <option key={trip.id} value={trip.id}>
            {trip.startDate} - {trip.endDate}: {trip.fromLocation} to{' '}
            {trip.toLocation}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TripSelector;
