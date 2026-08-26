import {useEffect, useState} from 'react';
import {getLocationCoordinates} from '../utils/getLocationCoordinates';
import {getCitySuggestions} from '../utils/getCitySuggestions';
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
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const timeout = setTimeout(async () => {
      const citySuggestions = await getCitySuggestions(inputValue);
      setSuggestions(citySuggestions ?? []);
    }, 400);

    return () => {
      clearTimeout(timeout);
    };
  }, [inputValue]);

  async function handleSuggestionClick(suggestionArr) {
    setIsLoading(true);
    setError(false);
    setSuggestions([]);

    const response = await getLocationCoordinates(suggestionArr);
    setCity(response.name);

    const weatherData = await getWeatherData(
      response.latitude,
      response.longitude,
    );
    setIsDay(weatherData.data.current_weather.is_day);
    setWeather(weatherData);
    setWeatherCode(weatherData.data.current_weather.weathercode);
    setIsLoading(false);
    setInputValue('');
    console.log(weatherData);
  }

  async function handleSearch() {
    setIsLoading(true);

    const res = await getCitySuggestions(inputValue);
    if (!res) {
      setError(true);
      setIsLoading(false);
      return;
    }
    handleSuggestionClick(res[0]);
  }

  function handleKeyDown(event) {
    if (event.key === 'Enter') handleSearch();
  }

  return (
    <section>
      <div className="relative">
        <input
          className="w-full border-solid border-2 rounded-full bg-slate-50 min-h-12 p-2 pl-4 relative z-20"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          type="text"
        />
        <button
          onClick={handleSearch}
          className="absolute z-20 right-1 bg-blue-500 top-1/2 -translate-y-1/2 rounded-full w-10 sm:w-24 h-10 flex justify-center items-center gap-1 text-slate-50 transition-[width] cursor-pointer"
        >
          <span className="material-symbols-outlined">search</span>
          <p className="hidden sm:block">Search</p>
        </button>

        {suggestions?.length > 0 && (
          <div className="bg-slate-200 w-full h-auto absolute rounded-3xl pt-12 pb-2 top-0 z-10 overflow-hidden">
            {suggestions.map((suggestion) => {
              return (
                <div
                  className="w-full min-h-8 flex items-center pl-4 hover:bg-slate-300"
                  key={suggestion.id}
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion.name}, {suggestion.country}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
