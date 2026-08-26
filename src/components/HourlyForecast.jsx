import dayjs from 'dayjs';
import {HourlyForecastCard} from './HourlyForecastCard';

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

  console.log(hourlyData.slice(0, 24));

  return (
    <div className="h-24 flex gap-5 overflow-x-auto scrollbar-none">
      {hourlyData.slice(0, 24).map((hour) => {
        return (
          <HourlyForecastCard
            key={hour.time}
            time={hour.time}
            temp={hour.temp}
            weather_code={hour.weather_code}
          />
        );
      })}
    </div>
  );
}
