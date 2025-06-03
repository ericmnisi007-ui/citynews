
import React, { useState, useEffect } from 'react';
import { Cloud, Sun, CloudRain, Wind, Thermometer, MapPin, Droplets } from 'lucide-react';

const WeatherWidget = () => {
  const [weather, setWeather] = useState({
    location: 'Johannesburg, SA',
    temperature: 22,
    condition: 'Partly Cloudy',
    humidity: 65,
    windSpeed: 12,
    pressure: 1013
  });

  const [isAnimating, setIsAnimating] = useState(false);

  // Simulate weather updates with animation trigger
  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setWeather(prev => ({
          ...prev,
          temperature: Math.floor(Math.random() * 10) + 18,
          humidity: Math.floor(Math.random() * 40) + 40,
          windSpeed: Math.floor(Math.random() * 15) + 8,
          pressure: Math.floor(Math.random() * 50) + 990
        }));
        setIsAnimating(false);
      }, 500);
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const WeatherIcon = () => {
    const iconClass = `h-10 w-10 ${isAnimating ? 'animate-spin' : ''}`;
    
    switch (weather.condition) {
      case 'Sunny':
        return <Sun className={`${iconClass} text-yellow-400 animate-pulse`} style={{ animationDuration: '2s' }} />;
      case 'Rainy':
        return <CloudRain className={`${iconClass} text-blue-400 animate-bounce`} style={{ animationDuration: '1.5s' }} />;
      default:
        return <Cloud className={`${iconClass} text-gray-400 animate-float`} />;
    }
  };

  return (
    <div className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-lg rounded-xl p-6 border border-green-400/30 shadow-2xl hover:shadow-blue-400/20 transition-all duration-500 hover:scale-105 hover:-rotate-1 group animate-float animate-slide-in-right">
      {/* Header with location */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Thermometer className="h-5 w-5 text-green-400 animate-pulse" />
          <h3 className="text-white font-bold group-hover:text-blue-300 transition-colors duration-300">
            Weather
          </h3>
        </div>
        <div className="transform group-hover:scale-110 transition-transform duration-300">
          <WeatherIcon />
        </div>
      </div>
      
      {/* Main temperature display */}
      <div className="text-center mb-6">
        <div className={`text-4xl font-bold text-white mb-2 transition-all duration-500 ${isAnimating ? 'animate-pulse scale-110' : ''} group-hover:text-blue-300`}>
          {weather.temperature}°C
        </div>
        <div className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
          {weather.condition}
        </div>
        <div className="flex items-center justify-center gap-1 text-xs text-green-400 mt-2 group-hover:text-green-300 transition-colors duration-300">
          <MapPin className="h-3 w-3 animate-pulse" />
          {weather.location}
        </div>
      </div>
      
      {/* Weather details grid */}
      <div className="grid grid-cols-2 gap-4">
        <div className="text-center group/item hover:scale-110 transition-transform duration-300">
          <div className="flex items-center justify-center gap-1 text-sm text-gray-400 group-hover/item:text-blue-300 transition-colors duration-300">
            <Droplets className="h-3 w-3 animate-pulse" />
            Humidity
          </div>
          <div className={`text-lg font-semibold text-white group-hover/item:text-blue-300 transition-all duration-300 ${isAnimating ? 'animate-bounce' : ''}`}>
            {weather.humidity}%
          </div>
        </div>
        
        <div className="text-center group/item hover:scale-110 transition-transform duration-300">
          <div className="flex items-center justify-center gap-1 text-sm text-gray-400 group-hover/item:text-green-300 transition-colors duration-300">
            <Wind className="h-3 w-3 animate-pulse" />
            Wind
          </div>
          <div className={`text-lg font-semibold text-white group-hover/item:text-green-300 transition-all duration-300 ${isAnimating ? 'animate-bounce' : ''}`}>
            {weather.windSpeed} km/h
          </div>
        </div>
      </div>
      
      {/* Animated weather indicator bar */}
      <div className="mt-4 pt-4 border-t border-slate-700/50">
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-500">Live Weather</span>
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
            <div className="w-2 h-2 bg-yellow-400 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;
