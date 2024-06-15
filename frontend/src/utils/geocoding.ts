import axios from 'axios';

const getCoordinates = async (address: string) => {
  const response = await axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json`,
    {
      params: {
        address: address,
        key: 'AIzaSyD4ZeiM4PU7EWyQzZMopcDiEy9hKrgjcGU',
      },
    }
  );
  const { lat, lng } = response.data.results[0].geometry.location;
  return { lat, lng };
};

export default getCoordinates;
