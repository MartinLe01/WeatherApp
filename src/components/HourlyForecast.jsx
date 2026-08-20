import dayjs from 'dayjs';

export function HourlyForecast({weather}) {
  if (!weather) return null;

  const currentHour = dayjs().hour();

  const startIndex = weather.data.hourly.time.findIndex((timeString) => {
    return dayjs(timeString).hour() > currentHour;
  });

  const upcomingTimes = weather.data.hourly.time.slice(startIndex);
  const upcomingTemps = weather.data.hourly.temperature_2m.slice(startIndex);
  const upcomingWeatherCodes =
    weather.data.hourly.weather_code.slice(startIndex);

  const hourlyData = upcomingTimes.map((time, index) => {
    return {
      time: time,
      temp: upcomingTemps[index],
      weather_code: upcomingWeatherCodes[index],
    };
  });

  console.log(hourlyData);

  return <div></div>;
}
