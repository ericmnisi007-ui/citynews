
import React from 'react';

const Plot49Ad = () => {
  return (
    <div className="fixed right-0 top-1/2 transform -translate-y-1/2 z-40 hidden lg:block">
      <a 
        href="https://plot49.co.za" 
        target="_blank" 
        rel="noopener noreferrer"
        className="block group"
      >
        <div className="bg-gradient-to-br from-red-500 via-red-600 to-red-700 p-6 shadow-2xl border border-red-400/30 hover:shadow-red-500/20 transition-all duration-500 hover:scale-105 animate-pulse-slow w-32 h-80">
          <div className="flex flex-col items-center justify-center space-y-4 h-full">
            <div className="relative">
              <img 
                src="/lovable-uploads/49c12c6a-cdd3-4345-a752-011417c19ee2.png" 
                alt="Plot 49 Logo" 
                className="w-20 h-20 object-contain animate-float group-hover:animate-bounce"
              />
              <div className="absolute inset-0 bg-red-400/20 rounded-full animate-ping"></div>
            </div>
            <div className="text-center">
              <h3 className="text-white font-bold text-lg group-hover:text-red-100 transition-colors">
                Plot 49
              </h3>
              <p className="text-red-100 text-sm mt-2 group-hover:text-white transition-colors">
                Premium Venue
              </p>
            </div>
            <div className="w-full h-2 bg-gradient-to-r from-red-300 to-white rounded-full animate-pulse"></div>
            <div className="text-sm text-red-100 font-medium group-hover:text-white transition-colors animate-fade-in text-center">
              Book Your Event
            </div>
          </div>
        </div>
      </a>
    </div>
  );
};

export default Plot49Ad;
