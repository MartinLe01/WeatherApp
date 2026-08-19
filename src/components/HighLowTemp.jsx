import {calcTempPercentage} from '../utils/calcTempPercentage';

export function HighLowTemp({weather}) {
  if (!weather) return null;

  let lowestTemp = Math.min(...weather.data.hourly.temperature_2m);
  let highestTemp = Math.max(...weather.data.hourly.temperature_2m);

  let lowestPercent = calcTempPercentage(lowestTemp);
  let highestPercent = calcTempPercentage(highestTemp);

  return (
    <div className="relative">
      <div className="bg-linear-to-r from-blue-500 via-amber-300 to-red-500 w-full h-3 rounded-full"></div>

      <div
        className="h-5 w-1 bg-slate-50 absolute top-0 -translate-y-1/5 rounded-full"
        style={{left: `${lowestPercent}%`}}
      ></div>

      <div
        className="h-5 w-1 bg-slate-50 absolute top-0 -translate-y-1/5 rounded-full"
        style={{left: `${highestPercent}%`}}
      ></div>
    </div>
  );
}
