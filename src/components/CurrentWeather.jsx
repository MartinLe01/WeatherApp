import {weatherCodeToSlug} from '../utils/weatherCodeToSlug';

export function CurrentWeather({city, weather, weatherCode}) {
  const slug = weatherCodeToSlug(weatherCode);
  const iconUrl = slug
    ? `https://cdn.meteocons.com/3.0.0-next.10/svg/fill/${slug}.svg`
    : null;

  return (
    <div>
      <h2 className="font-normal text-center">
        {!city ? 'Search for city' : city}
      </h2>
      <div className="flex flex-col items-center font-semibold">
        {iconUrl && <img src={iconUrl} alt={slug} width={128} height={128} />}
        <p>
          {weather &&
            `${Math.round(weather.data.current_weather.temperature)} ${weather.data.current_weather_units.temperature}`}
        </p>
      </div>
    </div>
  );
}
