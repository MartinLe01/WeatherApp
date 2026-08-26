import {useState} from 'react';
import {getLocationCoordinates} from '../utils/getLocationCoordinates';
import {getWeatherData} from '../utils/getWeatherData';

export function SearchBar({
  setCity,
  setWeather,
  setError,
  setIsLoading,
  setIsDay,
  setWeatherCode,
}) {
  const [inputValue, setInputValue] = useState('');

  async function handleSearch() {
    setIsLoading(true);
    setError(false);

    const response = await getLocationCoordinates(inputValue);
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
    setWeatherCode(weatherData.data.current_weather.weathercode);
    setIsLoading(false);
    console.log(weatherData);
  }

  function handleKeyDown(event) {
    if (event.key === 'Enter') handleSearch();
  }

  return (
    <section>
      <div className="relative">
        <input
          className="w-full border-solid border-2 rounded-full bg-slate-50 min-h-12 p-2"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
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
  );
}
