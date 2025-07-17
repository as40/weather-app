import React, { createContext, useContext, useState } from 'react';

const WeatherContext = createContext();

export function WeatherProvider({ children }) {
  const [weather, setWeather] = useState(null); // Current weather data
  const [error, setError] = useState(null); // Error state
  const [loading, setLoading] = useState(false); // Loading state
  const [history, setHistory] = useState([]); // Last 5 searched cities

  // Clear error
  const clearError = () => setError(null);

  // Add a city to history (max 5, no duplicates)
  const addToHistory = (city) => {
    setHistory((prev) => {
      const filtered = prev.filter((c) => c.toLowerCase() !== city.toLowerCase());
      return [city, ...filtered].slice(0, 5);
    });
  };

  return (
    <WeatherContext.Provider
      value={{ weather, setWeather, error, setError, clearError, loading, setLoading, history, addToHistory }}
    >
      {children}
    </WeatherContext.Provider>
  );
}

export function useWeather() {
  return useContext(WeatherContext);
} 