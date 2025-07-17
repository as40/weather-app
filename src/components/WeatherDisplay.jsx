import React from 'react';
import { useWeather } from '../appContext/WeatherContext';

// Simple SVG/emoji icons for weather conditions
const weatherIcons = {
  Clouds: <span role="img" aria-label="Clouds" className="text-3xl">☁️</span>,
  Rain: <span role="img" aria-label="Rain" className="text-3xl">🌧️</span>,
  Clear: <span role="img" aria-label="Clear" className="text-3xl">☀️</span>,
  Snow: <span role="img" aria-label="Snow" className="text-3xl">❄️</span>,
  Default: <span role="img" aria-label="Weather" className="text-3xl">🌡️</span>,
};

export default function WeatherDisplay() {
  const { weather, loading, error } = useWeather();

  if (loading) return <div className="w-full max-w-md mx-auto p-4 rounded-xl bg-blue-50 dark:bg-gray-700 text-center text-lg font-semibold animate-pulse">Loading...</div>;
  if (error) return null;
  if (!weather) return null;

  const { name, main, weather: weatherArr, wind } = weather;
  const condition = weatherArr && weatherArr[0] ? weatherArr[0].main : '';
  const icon = weatherIcons[condition] || weatherIcons.Default;

  return (
    <div className="w-full max-w-md mx-auto p-4 rounded-xl bg-blue-50 dark:bg-gray-700 shadow flex flex-col items-center gap-2 animate-fadeIn">
      <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-1">{name}</h2>
      <div className="flex items-center gap-4">
        <div>{icon}</div>
        <div>
          <div className="text-3xl font-extrabold text-blue-700 dark:text-blue-200">{Math.round(main.temp)}°C</div>
          <div className="capitalize text-gray-600 dark:text-gray-300">{condition}</div>
        </div>
      </div>
      <div className="flex justify-between w-full mt-2 text-gray-700 dark:text-gray-200 text-sm">
        <div>Wind: {wind.speed} m/s</div>
        <div>Humidity: {main.humidity}%</div>
      </div>
    </div>
  );
} 