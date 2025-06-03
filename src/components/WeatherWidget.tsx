
import React, { useState, useEffect } from 'react';
import { Cloud, Sun, CloudRain, Wind, Thermometer, MapPin, Eye, Droplets } from 'lucide-react';

const WeatherWidget = () => {
  const [currentDay, setCurrentDay] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const weekDays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  
  const weatherData = [
    { day: 'SUN', temp: '14°C', icon: '☁️', desc: 'Cloudy' },
    { day: 'MON', temp: '16°C', icon: '🌤️', desc: 'Partly Cloudy' },
    { day: 'TUE', temp: '18°C', icon: '☀️', desc: 'Sunny' },
    { day: 'WED', temp: '15°C', icon: '🌧️', desc: 'Rainy' },
    { day: 'THU', temp: '17°C', icon: '⛅', desc: 'Cloudy' },
    { day: 'FRI', temp: '19°C', icon: '☀️', desc: 'Sunny' },
    { day: 'SAT', temp: '16°C', icon: '🌤️', desc: 'Partly Cloudy' }
  ];

  const [currentWeather, setCurrentWeather] = useState({
    location: 'Johannesburg',
    temperature: 14,
    condition: 'Cloudy',
    humidity: 68,
    windSpeed: 12,
    visibility: 10,
    pressure: 1013
  });

  // Auto-cycle through days with animation
  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentDay((prev) => (prev + 1) % 7);
        setCurrentWeather(prev => ({
          ...prev,
          temperature: Math.floor(Math.random() * 8) + 12,
          humidity: Math.floor(Math.random() * 30) + 50,
          windSpeed: Math.floor(Math.random() * 10) + 8,
          visibility: Math.floor(Math.random() * 5) + 8
        }));
        setIsAnimating(false);
      }, 300);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const WeatherIcon = ({ iconText, size = "text-2xl" }: { iconText: string; size?: string }) => {
    return (
      <div className={`${size} ${isAnimating ? 'animate-spin' : 'animate-pulse'} transition-all duration-500`}>
        {iconText}
      </div>
    );
  };

  return (
    <div className="bg-gradient-to-br from-blue-600/95 via-blue-700/95 to-blue-800/95 backdrop-blur-lg rounded-2xl p-4 border border-blue-400/30 shadow-lg hover:shadow-blue-400/40 transition-all duration-300 hover:scale-105 group relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-0 right-0 w-16 h-16 bg-blue-400/10 rounded-full animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-12 h-12 bg-white/5 rounded-full animate-bounce" style={{ animationDuration: '3s' }}></div>
      
      {/* Header */}
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-ping"></div>
            <span className="text-white/90 text-xs font-medium">Live Weather</span>
          </div>
          <div className="flex items-center gap-1 text-white/80 text-xs">
            <MapPin className="h-3 w-3" />
            {currentWeather.location}
          </div>
        </div>

        {/* Main Weather Display */}
        <div className="text-center mb-4">
          <div className="flex items-center justify-center mb-2">
            <WeatherIcon iconText={weatherData[currentDay].icon} />
          </div>
          <div className={`text-3xl font-bold text-white mb-1 transition-all duration-500 ${isAnimating ? 'animate-pulse scale-110' : ''}`}>
            {weatherData[currentDay].temp}
          </div>
          <div className="text-white/80 text-xs font-medium">
            {weatherData[currentDay].desc}
          </div>
        </div>

        {/* Weekly Forecast */}
        <div className="grid grid-cols-7 gap-1 mb-4 bg-white/10 rounded-xl p-2 backdrop-blur-sm">
          {weatherData.map((day, index) => (
            <div 
              key={day.day}
              className={`text-center p-1.5 rounded-lg transition-all duration-300 cursor-pointer hover:scale-105 ${
                index === currentDay 
                  ? 'bg-white/20 shadow-md transform scale-105' 
                  : 'hover:bg-white/10'
              }`}
              onClick={() => setCurrentDay(index)}
            >
              <div className={`text-xs font-bold mb-1 ${
                index === currentDay ? 'text-yellow-300' : 'text-white/80'
              }`}>
                {day.day}
              </div>
              <div className="text-sm mb-1">
                <WeatherIcon iconText={day.icon} size="text-sm" />
              </div>
              <div className={`text-xs font-medium ${
                index === currentDay ? 'text-white' : 'text-white/70'
              }`}>
                {day.temp}
              </div>
            </div>
          ))}
        </div>

        {/* Weather Details */}
        <div className="grid grid-cols-3 gap-2">
          <div className="text-center bg-white/10 rounded-lg p-2 hover:bg-white/15 transition-all duration-300">
            <Droplets className="h-3 w-3 text-blue-300 mx-auto mb-1" />
            <div className="text-xs text-white/70">Humidity</div>
            <div className={`text-xs font-bold text-white ${isAnimating ? 'animate-bounce' : ''}`}>
              {currentWeather.humidity}%
            </div>
          </div>
          
          <div className="text-center bg-white/10 rounded-lg p-2 hover:bg-white/15 transition-all duration-300">
            <Wind className="h-3 w-3 text-blue-300 mx-auto mb-1" />
            <div className="text-xs text-white/70">Wind</div>
            <div className={`text-xs font-bold text-white ${isAnimating ? 'animate-bounce' : ''}`}>
              {currentWeather.windSpeed}km/h
            </div>
          </div>
          
          <div className="text-center bg-white/10 rounded-lg p-2 hover:bg-white/15 transition-all duration-300">
            <Eye className="h-3 w-3 text-blue-300 mx-auto mb-1" />
            <div className="text-xs text-white/70">Visibility</div>
            <div className={`text-xs font-bold text-white ${isAnimating ? 'animate-bounce' : ''}`}>
              {currentWeather.visibility}km
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;
