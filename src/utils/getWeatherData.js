import axios from 'axios';

export async function getWeatherData(latitude, longitude) {
  const response = await axios.get(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&timezone=auto&hourly=temperature_2m&forecast_days=1`,
  );

  return response;
}
