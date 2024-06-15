import axios from 'axios';

const getHistoricalWeather = async (lat: number, lon: number, date: string) => {
  const response = await axios.get(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${lat},${lon}/${date}`,
    {
      params: {
        key: 'TDLW3L2YQAKY89Y2K7LT4GGQW',
        include: 'obs',
        unitGroup: 'metric',
      },
    }
  );
  return response.data;
};

export default getHistoricalWeather;
