import {useRef, useState} from 'react';
import {getLocationCoordinates} from './utils/getLocationCoordinates';
import {getWeatherData} from './utils/getWeatherData';
import './App.css';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDay, setIsDay] = useState(1);

  const inputRef = useRef(null);

  async function handleSearch() {
    setIsLoading(true);
    setError(false);

    const cityName = inputRef.current.value;

    const response = await getLocationCoordinates(cityName);
    if (!response) {
      setError(true);
      setIsLoading(false);
      return;
    }
    setCity(response.name);

    const weatherData = await getWeatherData(
      response.latitude,
      response.longitude,
    );
    setIsDay(weatherData.data.current_weather.is_day);
    setWeather(weatherData);
    setIsLoading(false);
    console.log(weatherData);
  }

  return (
    <div
      className={`min-h-screen font-display p-12 ${isDay ? 'bg-[#6BD6CF]' : 'bg-slate-900'}`}
    >
      <header className="relative z-10 text-4xl font-bold text-center">
        <h1>Weather App</h1>
      </header>

      <div
        className={`w-lg h-60 absolute ${isDay ? 'bg-amber-300' : 'bg-slate-200'} top-0 rounded-b-full inset-auto left-1/2 -translate-x-1/2 transition-colors duration-700`}
      ></div>

      <main className="m-auto max-w-lg h-96 backdrop-blur-xl border-solid border-2 mt-8 p-8 rounded-4xl sm:mx-auto">
        <section>
          <div className="relative">
            <input
              className="w-full border-solid border-2 rounded-full bg-slate-50 min-h-12 p-2"
              ref={inputRef}
              type="text"
            />
            <button
              onClick={handleSearch}
              className="absolute right-1 bg-blue-500 top-1/2 -translate-y-1/2 rounded-full w-10 sm:w-24 h-10 flex justify-center items-center gap-1 text-slate-50 transition-[width] cursor-pointer"
            >
              <span className="material-symbols-outlined">search</span>
              <p className="hidden sm:block">Search</p>
            </button>
          </div>
        </section>

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
              <h2 className="font-normal">
                {!city ? 'Search for city' : city}
              </h2>
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

      <footer>
        <p className="text-center">
          Weather data by{' '}
          <a className="underline" href="https://open-meteo.com/">
            Open-Meteo.com
          </a>
        </p>
      </footer>
    </div>
  );
}

export default App;
