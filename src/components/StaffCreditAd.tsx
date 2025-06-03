
import React from 'react';

const StaffCreditAd = () => {
  return (
    <div className="fixed left-4 top-1/2 transform -translate-y-1/2 z-40 hidden lg:block">
      <a 
        href="https://staffcredit.co.za" 
        target="_blank" 
        rel="noopener noreferrer"
        className="block group"
      >
        <div className="bg-gradient-to-br from-teal-500 via-teal-600 to-teal-700 p-4 rounded-2xl shadow-2xl border border-teal-400/30 hover:shadow-teal-500/20 transition-all duration-500 hover:scale-105 animate-pulse-slow">
          <div className="flex flex-col items-center space-y-3">
            <div className="relative">
              <img 
                src="/lovable-uploads/1dd250cd-1c83-41ef-90bb-c3cfa338a50d.png" 
                alt="Staff Credit Logo" 
                className="w-16 h-16 object-contain animate-float group-hover:animate-bounce"
              />
              <div className="absolute inset-0 bg-teal-400/20 rounded-full animate-ping"></div>
            </div>
            <div className="text-center">
              <h3 className="text-white font-bold text-sm group-hover:text-teal-100 transition-colors">
                Staff Credit
              </h3>
              <p className="text-teal-100 text-xs mt-1 group-hover:text-white transition-colors">
                Financial Solutions
              </p>
            </div>
            <div className="w-full h-1 bg-gradient-to-r from-teal-300 to-white rounded-full animate-pulse"></div>
            <div className="text-xs text-teal-100 font-medium group-hover:text-white transition-colors animate-fade-in">
              Click to Learn More
            </div>
          </div>
        </div>
      </a>
    </div>
  );
};

export default StaffCreditAd;
