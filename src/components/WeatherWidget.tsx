
import React, { useState, useEffect } from 'react';
import { Cloud, Sun, CloudRain, Wind, Thermometer } from 'lucide-react';

const WeatherWidget = () => {
  const [weather, setWeather] = useState({
    location: 'Johannesburg, SA',
    temperature: 22,
    condition: 'Partly Cloudy',
    humidity: 65,
    windSpeed: 12
  });

  // Simulate weather updates
  useEffect(() => {
    const interval = setInterval(() => {
      setWeather(prev => ({
        ...prev,
        temperature: Math.floor(Math.random() * 10) + 18,
        humidity: Math.floor(Math.random() * 40) + 40
      }));
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const WeatherIcon = () => {
    switch (weather.condition) {
      case 'Sunny':
        return <Sun className="h-8 w-8 text-yellow-400 animate-spin" style={{ animationDuration: '8s' }} />;
      case 'Rainy':
        return <CloudRain className="h-8 w-8 text-blue-400 animate-bounce" />;
      default:
        return <Cloud className="h-8 w-8 text-gray-400 animate-pulse" />;
    }
  };

  return (
    <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-green-400/20 shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white font-semibold flex items-center gap-2">
          <Thermometer className="h-5 w-5 text-green-400" />
          Weather
        </h3>
        <WeatherIcon />
      </div>
      
      <div className="space-y-3">
        <div className="text-center">
          <div className="text-3xl font-bold text-white animate-pulse">
            {weather.temperature}°C
          </div>
          <div className="text-sm text-gray-400">{weather.condition}</div>
          <div className="text-xs text-green-400">{weather.location}</div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="text-center">
            <div className="text-sm text-gray-400">Humidity</div>
            <div className="text-lg font-semibold text-white">{weather.humidity}%</div>
          </div>
          <div className="text-center">
            <div className="text-sm text-gray-400 flex items-center justify-center gap-1">
              <Wind className="h-3 w-3" />
              Wind
            </div>
            <div className="text-lg font-semibold text-white">{weather.windSpeed} km/h</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;
