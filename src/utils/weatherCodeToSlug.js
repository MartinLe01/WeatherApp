export function weatherCodeToSlug(code) {
  const map = {
    0: 'clear-day',
    1: 'mostly-clear-day',
    2: 'partly-cloudy-day',
    3: 'overcast',
    45: 'fog',
    48: 'fog',
    51: 'drizzle',
    53: 'drizzle',
    55: 'drizzle',
    56: 'sleet',
    57: 'sleet',
    61: 'rain',
    63: 'rain',
    65: 'rain',
    66: 'sleet',
    67: 'sleet',
    71: 'snow',
    73: 'snow',
    75: 'snow',
    77: 'snow',
    80: 'rain',
    81: 'rain',
    82: 'rain',
    85: 'snow',
    86: 'snow',
    95: 'thunderstorms',
    96: 'thunderstorms-hail',
    99: 'thunderstorms-hail',
  };

  return map[code];
}
