import {getLocationCoordinates} from '../utils/getLocationCoordinates';
import {getWeatherData} from '../utils/getWeatherData';

export function SearchBar({
  inputRef,
  setCity,
  setWeather,
  setError,
  setIsLoading,
  setIsDay,
  setWeatherCode,
}) {
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
    setWeatherCode(weatherData.data.current_weather.weathercode);
    setIsLoading(false);
    console.log(weatherData);
  }

  return (
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
  );
}
