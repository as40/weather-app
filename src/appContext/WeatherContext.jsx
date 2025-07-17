import React, { createContext, useContext, useState } from 'react';

const WeatherContext = createContext();

export function WeatherProvider({ children }) {
  const [weather, setWeather] = useState(null); // Current weather data
  const [error, setError] = useState(null); // Error state
  const [loading, setLoading] = useState(false); // Loading state

  // Clear error
  const clearError = () => setError(null);

  return (
    <WeatherContext.Provider
      value={{ weather, setWeather, error, setError, clearError, loading, setLoading }}
    >
      {children}
    </WeatherContext.Provider>
  );
}

export function useWeather() {
  return useContext(WeatherContext);
} 