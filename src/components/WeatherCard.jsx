import {useState} from 'react';
import {SearchBar} from './SearchBar';

export function WeatherCard({inputRef, setIsDay}) {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <main className="m-auto max-w-lg h-96 backdrop-blur-xl border-solid border-2 mt-8 p-8 rounded-4xl sm:mx-auto">
      <SearchBar
        inputRef={inputRef}
        setCity={setCity}
        setWeather={setWeather}
        setError={setError}
        setIsLoading={setIsLoading}
        setIsDay={setIsDay}
      />

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
          <div>
            <h2 className="font-normal">{!city ? 'Search for city' : city}</h2>
            <div className="flex flex-col items-center font-semibold">
              <p>
                {weather &&
                  `${Math.round(weather.data.current_weather.temperature)} ${weather.data.current_weather_units.temperature}`}
              </p>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
