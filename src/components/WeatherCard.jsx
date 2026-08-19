import {useState} from 'react';
import {SearchBar} from './SearchBar';
import {WeatherDisplay} from './WeatherDisplay';

export function WeatherCard({inputRef, setIsDay}) {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [weatherCode, setWeatherCode] = useState(null);

  return (
    <main className="m-auto max-w-lg h-96 backdrop-blur-xl border-solid border-2 mt-8 p-8 rounded-4xl sm:mx-auto">
      <SearchBar
        inputRef={inputRef}
        setCity={setCity}
        setWeather={setWeather}
        setError={setError}
        setIsLoading={setIsLoading}
        setIsDay={setIsDay}
        setWeatherCode={setWeatherCode}
      />

      <WeatherDisplay
        city={city}
        weather={weather}
        isLoading={isLoading}
        error={error}
        weatherCode={weatherCode}
      />
    </main>
  );
}
