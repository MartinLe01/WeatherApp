import axios from 'axios';

export async function getLocationCoordinates(cityName) {
  const response = await axios.get(
    `https://geocoding-api.open-meteo.com/v1/search?name=${cityName}&count=5`,
  );
  if (!response.data.results?.length) {
    return null;
  }

  const {latitude, longitude, name} = response.data.results[0];

  return {latitude, longitude, name};
}
