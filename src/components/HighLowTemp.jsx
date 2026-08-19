import {useEffect, useState} from 'react';

export function HighLowTemp({weather}) {
  const [low, setLow] = useState(0);
  const [high, setHigh] = useState(50);

  useEffect(() => {
    console.log('change');
  }, [weather]);

  if (!weather) return null;

  return (
    <div className="bg-linear-to-r from-blue-500 via-amber-300 to-red-500 w-full h-3 rounded-full"></div>
  );
}
