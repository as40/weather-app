import React from 'react';
import { useWeather } from '../appContext/WeatherContext';

function getOutfitSuggestion(temp, condition) {
  if (!condition) return '';
  if (condition.toLowerCase().includes('rain')) return 'Take an umbrella and wear waterproof shoes.';
  if (condition.toLowerCase().includes('snow')) return 'Wear a warm coat, boots, and gloves.';
  if (temp <= 5) return 'Bundle up with a heavy jacket, scarf, and gloves.';
  if (temp <= 15) return 'Wear a jacket or sweater.';
  if (temp >= 30) return 'Light clothes and stay hydrated. Sunglasses suggested!';
  if (condition.toLowerCase().includes('clear') || condition.toLowerCase().includes('sun')) return 'Sunglasses suggested!';
  if (condition.toLowerCase().includes('cloud')) return 'A light jacket might be needed.';
  return 'Dress comfortably for the weather.';
}

export default function OutfitRecommendation() {
  const { weather } = useWeather();
  if (!weather) return null;

  const temp = weather.main.temp;
  const condition = weather.weather && weather.weather[0] ? weather.weather[0].main : '';
  const suggestion = getOutfitSuggestion(temp, condition);

  return (
    <div className="w-full max-w-md mx-auto p-4 rounded-xl bg-yellow-50 dark:bg-gray-700 shadow animate-fadeIn">
      <h3 className="text-lg font-semibold text-yellow-700 dark:text-yellow-200 mb-1">Outfit Recommendation</h3>
      <p className="text-gray-800 dark:text-gray-100 text-base">{suggestion}</p>
    </div>
  );
} 