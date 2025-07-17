import React from 'react';
import { useTheme } from './appContext/ThemeContext';
import CitySearch from './components/CitySearch';

function App() {
  const { theme, toggleTheme } = useTheme();
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      <div className="w-full max-w-md p-6 rounded-3xl shadow-2xl bg-white/90 dark:bg-gray-800/90 flex flex-col gap-6">
        <header className="flex justify-between items-center mb-2">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800 dark:text-white leading-tight">
            Weather-<br />Based Outfit<br />Recommender
          </h1>
          <button onClick={toggleTheme} aria-label="Toggle theme" className="theme-toggle ml-2 text-2xl cursor-pointer">
            {theme === 'dark' ? '🌙' : '☀️'}
          </button>
        </header>
        <CitySearch/>
      </div>
    </div>
  );
}

export default App;
