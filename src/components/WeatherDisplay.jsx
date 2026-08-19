import {CurrentWeather} from './CurrentWeather';
import {HighLowTemp} from './HighLowTemp';

export function WeatherDisplay({city, weather, isLoading, error, weatherCode}) {
  return (
    <section className="flex flex-col items-center text-3xl mt-4">
      {isLoading ? (
        <svg
          className="animate-spin h-24 w-24 text-blue-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          />
        </svg>
      ) : error ? (
        <p>City not found. Please try again.</p>
      ) : (
        <div className="w-full flex flex-col gap-12">
          <CurrentWeather
            city={city}
            weather={weather}
            weatherCode={weatherCode}
          />

          <HighLowTemp weather={weather} />
        </div>
      )}
    </section>
  );
}
