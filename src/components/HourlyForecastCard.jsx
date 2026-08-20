import {weatherCodeToSlug} from '../utils/weatherCodeToSlug';
import dayjs from 'dayjs';

export function HourlyForecastCard({time, temp, weather_code}) {
  const slug = weatherCodeToSlug(weather_code);
  const iconUrl = slug
    ? `https://cdn.meteocons.com/3.0.0-next.10/svg/fill/${slug}.svg`
    : null;

  return (
    <div className="h-full w-16  flex flex-col items-center">
      <p className="text-lg text-center">{dayjs(time).format('HH')}</p>
      <div className="h-10 w-10 flex items-center justify-center">
        {iconUrl && (
          <img src={iconUrl} alt={slug} className="max-h-full max-w-full" />
        )}
      </div>
      <p className="text-lg font-medium text-center">{`${Math.round(temp)}°C`}</p>
    </div>
  );
}
