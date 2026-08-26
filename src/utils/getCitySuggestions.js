import axios from 'axios';

export async function getCitySuggestions(cityName) {
  const response = await axios.get(
    `https://geocoding-api.open-meteo.com/v1/search?name=${cityName}`,
  );

  if (!response.data.results?.length) {
    return null;
  }

  return response.data.results;
}
