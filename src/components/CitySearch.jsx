import React, { useState, useRef } from 'react';
import { useWeather } from '../appContext/WeatherContext.jsx';
import useDebounce from '../hooks/useDebounce.js';
import { MOCK_CITIES, MOCK_WEATHER } from '../mockData/cityMockData.js';

export default function CitySearch() {
  const [city, setCity] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [lastFailedCity, setLastFailedCity] = useState(null);
  const { setWeather, setError, clearError, setLoading, error, addToHistory } = useWeather();
  const inputRef = useRef();

  // Mocked fetchWeather
  const fetchWeather = async (cityName) => {
    setLoading(true);
    clearError();
    setLastFailedCity(null);
    setTimeout(() => {
      if (MOCK_WEATHER[cityName]) {
        setWeather(MOCK_WEATHER[cityName]);
        addToHistory(cityName);
      } else {
        setError('City not found');
        setLastFailedCity(cityName);
      }
      setLoading(false);
    }, 500);
  };

  // Mocked fetchSuggestions
  const fetchSuggestions = useDebounce((query) => {
    if (!query) {
      setSuggestions([]);
      return;
    }
    const filtered = MOCK_CITIES.filter((c) =>
      c.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 5);
    setTimeout(() => setSuggestions(filtered), 300);
  }, 300);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setCity(value);
    setShowSuggestions(true);
    fetchSuggestions(value);
  };

  const handleSuggestionClick = (suggestion) => {
    setCity(suggestion);
    setShowSuggestions(false);
    fetchWeather(suggestion);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedCity = city.trim();
    if (!trimmedCity) return;

    // Find all matching cities
    const filtered = MOCK_CITIES.filter((c) =>
      c.toLowerCase().includes(trimmedCity.toLowerCase())
    );

    if (filtered.length === 1) {
      // Only one match, fetch weather
      setShowSuggestions(false);
      fetchWeather(filtered[0]);
      setCity(filtered[0]); // Optionally update input to full city name
    } else if (filtered.length > 1) {
      // Multiple matches, show suggestions
      setSuggestions(filtered.slice(0, 5));
      setShowSuggestions(true);
    } else {
      // No matches, show error or do nothing
      setSuggestions([]);
      setShowSuggestions(false);
      setError('City not found');
      setLastFailedCity(trimmedCity);
    }
  };

  const handleRetry = () => {
    if (lastFailedCity) {
      fetchWeather(lastFailedCity);
    }
  };

  return (
    <div className="relative w-full">
      <form onSubmit={handleSubmit} className="flex gap-2" autoComplete="off">
        <input
          type="text"
          value={city}
          onChange={handleInputChange}
          placeholder="Enter city name"
          aria-label="City name"
          ref={inputRef}
          onFocus={() => city && setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
          className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg bg-white dark:bg-gray-900 dark:text-white transition-colors"
        />
        <button
          type="submit"
          className="px-5 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors cursor-pointer"
        >
          Search
        </button>
      </form>
      {showSuggestions && suggestions.length > 0 && (
        <ul className="city-suggestions absolute left-0 right-0 top-full z-20 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-b-lg shadow-lg mt-1 max-h-44 overflow-y-auto">
          {suggestions.map((s, idx) => (
            <li key={s + idx}>
              <button
                type="button"
                onMouseDown={() => handleSuggestionClick(s)}
                className="w-full text-left px-4 py-2 hover:bg-blue-50 dark:hover:bg-gray-800 text-gray-800 dark:text-white cursor-pointer"
              >
                {s}
              </button>
            </li>
          ))}
        </ul>
      )}
      {error && lastFailedCity && (
        <div className="bg-red-100 text-red-800 rounded-md px-3 py-2 mt-2 text-center text-sm font-medium flex items-center justify-center gap-2">
          <span>{error === 'City not found' ? 'Invalid city name. Please try again.' : 'API failure. Please try again later.'}</span>
          <button
            onClick={handleRetry}
            className="bg-red-500 text-white rounded px-3 py-1 text-sm hover:bg-red-700 transition-colors cursor-pointer"
          >
            Retry
          </button>
        </div>
      )}
    </div>
  );
} 