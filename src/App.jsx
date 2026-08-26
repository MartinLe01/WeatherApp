import {useState} from 'react';
import {WeatherCard} from './components/WeatherCard';
import './App.css';

function App() {
  const [isDay, setIsDay] = useState(1);

  return (
    <div
      className={`min-h-screen font-display p-12 ${isDay ? 'bg-[#6BD6CF]' : 'bg-slate-900'}`}
    >
      <header className="relative z-10 text-4xl font-bold text-center">
        <h1>Weather App</h1>
      </header>

      <div
        className={`w-full max-w-lg h-60 absolute ${isDay ? 'bg-amber-300' : 'bg-slate-200'} top-0 rounded-b-full inset-auto left-1/2 -translate-x-1/2 transition-colors duration-700`}
      ></div>

      <WeatherCard setIsDay={setIsDay} />

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
