
import React, { useState, useEffect } from 'react';
import { Cloud, Sun, CloudRain, Wind, Thermometer, MapPin, Eye, Droplets } from 'lucide-react';

const WeatherWidget = () => {
  const [currentDay, setCurrentDay] = useState(4); // Start with Friday (FRI)
  const [isAnimating, setIsAnimating] = useState(false);

  const weekDays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  
  const weatherData = [
    { day: 'SUN', temp: '14°C', icon: '☁️', desc: 'Cloudy' },
    { day: 'MON', temp: '16°C', icon: '☀️', desc: 'Sunny' },
    { day: 'TUE', temp: '18°C', icon: '☀️', desc: 'Sunny' },
    { day: 'WED', temp: '15°C', icon: '☁️', desc: 'Cloudy' },
    { day: 'THU', temp: '17°C', icon: '⛅', desc: 'Partly Cloudy' },
    { day: 'FRI', temp: '19°C', icon: '☀️', desc: 'Sunny' },
    { day: 'SAT', temp: '16°C', icon: '☀️', desc: 'Sunny' }
  ];

  const [currentWeather, setCurrentWeather] = useState({
    location: 'Johannesburg',
    temperature: 19,
    condition: 'Sunny',
    humidity: 66,
    windSpeed: 14,
    visibility: 9
  });

  // Auto-cycle through days with animation
  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentDay((prev) => (prev + 1) % 7);
        setCurrentWeather(prev => ({
          ...prev,
          temperature: Math.floor(Math.random() * 8) + 14,
          humidity: Math.floor(Math.random() * 20) + 60,
          windSpeed: Math.floor(Math.random() * 8) + 10,
          visibility: Math.floor(Math.random() * 3) + 8
        }));
        setIsAnimating(false);
      }, 300);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const WeatherIcon = ({ iconText, size = "text-3xl" }: { iconText: string; size?: string }) => {
    return (
      <div className={`${size} ${isAnimating ? 'animate-pulse scale-110' : ''} transition-all duration-500`}>
        {iconText}
      </div>
    );
  };

  return (
    <div className="bg-gradient-to-br from-blue-600/95 via-blue-700/95 to-blue-800/95 backdrop-blur-lg rounded-2xl p-6 border border-blue-400/30 shadow-xl hover:shadow-blue-400/40 transition-all duration-300 hover:scale-105 group relative overflow-hidden min-w-[320px]">
      {/* Animated background elements */}
      <div className="absolute top-2 right-2 w-12 h-12 bg-blue-400/10 rounded-full animate-pulse"></div>
      <div className="absolute bottom-2 left-2 w-8 h-8 bg-white/5 rounded-full animate-bounce" style={{ animationDuration: '4s' }}></div>
      
      {/* Header */}
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
            <span className="text-white/90 text-sm font-medium">Today's Weather</span>
          </div>
          <div className="flex items-center gap-1 text-white/80 text-sm">
            <MapPin className="h-4 w-4" />
            {currentWeather.location}
          </div>
        </div>

        {/* Main Weather Display */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center mb-3">
            <WeatherIcon iconText={weatherData[currentDay].icon} />
          </div>
          <div className={`text-4xl font-bold text-white mb-2 transition-all duration-500 ${isAnimating ? 'animate-pulse scale-110' : ''}`}>
            {weatherData[currentDay].temp}
          </div>
          <div className="text-white/90 text-base font-medium">
            {weatherData[currentDay].desc}
          </div>
        </div>

        {/* Weekly Forecast */}
        <div className="grid grid-cols-7 gap-2 mb-6 bg-white/10 rounded-xl p-3 backdrop-blur-sm">
          {weatherData.map((day, index) => (
            <div 
              key={day.day}
              className={`text-center p-2 rounded-lg transition-all duration-300 cursor-pointer hover:scale-105 ${
                index === currentDay 
                  ? 'bg-yellow-400/20 shadow-md transform scale-105 border border-yellow-400/30' 
                  : 'hover:bg-white/10'
              }`}
              onClick={() => setCurrentDay(index)}
            >
              <div className={`text-xs font-bold mb-1 ${
                index === currentDay ? 'text-yellow-300' : 'text-white/80'
              }`}>
                {day.day}
              </div>
              <div className="text-lg mb-1">
                <WeatherIcon iconText={day.icon} size="text-lg" />
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
        <div className="grid grid-cols-3 gap-3">
          <div className="text-center bg-white/10 rounded-xl p-3 hover:bg-white/15 transition-all duration-300">
            <Droplets className="h-4 w-4 text-blue-300 mx-auto mb-2" />
            <div className="text-xs text-white/70 mb-1">Humidity</div>
            <div className={`text-sm font-bold text-white ${isAnimating ? 'animate-bounce' : ''}`}>
              {currentWeather.humidity}%
            </div>
          </div>
          
          <div className="text-center bg-white/10 rounded-xl p-3 hover:bg-white/15 transition-all duration-300">
            <Wind className="h-4 w-4 text-blue-300 mx-auto mb-2" />
            <div className="text-xs text-white/70 mb-1">Wind</div>
            <div className={`text-sm font-bold text-white ${isAnimating ? 'animate-bounce' : ''}`}>
              {currentWeather.windSpeed}km/h
            </div>
          </div>
          
          <div className="text-center bg-white/10 rounded-xl p-3 hover:bg-white/15 transition-all duration-300">
            <Eye className="h-4 w-4 text-blue-300 mx-auto mb-2" />
            <div className="text-xs text-white/70 mb-1">Visibility</div>
            <div className={`text-sm font-bold text-white ${isAnimating ? 'animate-bounce' : ''}`}>
              {currentWeather.visibility}km
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;
