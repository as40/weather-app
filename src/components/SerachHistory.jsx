import React from 'react';
import { useWeather } from '../appContext/WeatherContext.jsx';
import { MOCK_WEATHER } from '../mockData/cityMockData.js';

export default function SearchHistory() {
  const { history, setWeather, addToHistory, setError, clearError, setLoading } = useWeather();

  // Mocked fetchWeather
  const fetchWeather = async (cityName) => {
    setLoading(true);
    clearError();
    setTimeout(() => {
      if (MOCK_WEATHER[cityName]) {
        setWeather(MOCK_WEATHER[cityName]);
        addToHistory(cityName);
      } else {
        setError('City not found');
      }
      setLoading(false);
    }, 700);
  };

  if (!history.length) return null;

  return (
    <div className="w-full max-w-md mx-auto p-4 rounded-xl bg-gray-100 dark:bg-gray-800 shadow animate-fadeIn">
      <h4 className="text-base font-semibold text-gray-700 dark:text-gray-200 mb-2">Recent Searches</h4>
      <ul className="flex flex-wrap gap-2 justify-center">
        {history.map((city, idx) => (
          <li key={city + idx}>
            <button
              onClick={() => fetchWeather(city)}
              className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded px-3 py-1 text-sm font-medium hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors cursor-pointer"
            >
              {city}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
} 