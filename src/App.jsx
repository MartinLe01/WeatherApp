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
    <>
      <header className="text-4xl font-bold text-center mt-12">
        <h1>Weather App</h1>
      </header>

      <div
        className={`w-lg h-60 absolute ${isDay ? 'bg-amber-300' : 'bg-slate-200'} top-0 rounded-b-full inset-auto z-[-1] left-1/2 -translate-x-1/2`}
      ></div>

      <main className="m-auto max-w-lg h-96 backdrop-blur-lg border-solid border-2 mt-8 p-8 rounded-4xl">
        <section className="flex justify-center">
          <input
            className="border-solid border-2 rounded-full bg-slate-50 min-h-12"
            ref={inputRef}
            type="text"
          />
          <button onClick={handleSearch}>Show weather</button>
        </section>

        <section>
          {isLoading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>City not found. Please try again.</p>
          ) : (
            <div>
              <div>
                <h2>{!city ? 'Search for city' : city}</h2>
              </div>
              <div>
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
          Weather data by <a href="https://open-meteo.com/">Open-Meteo.com</a>
        </p>
      </footer>
    </>
  );
}

export default App;
