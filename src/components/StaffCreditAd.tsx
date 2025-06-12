
import React from 'react';

const StaffCreditAd = () => {
  return (
    <div className="fixed left-0 top-1/2 transform -translate-y-1/2 z-40 hidden lg:block">
      <a 
        href="https://staffcredit.co.za" 
        target="_blank" 
        rel="noopener noreferrer"
        className="block group"
      >
        <div className="bg-gradient-to-br from-teal-500 via-teal-600 to-teal-700 p-6 shadow-2xl border border-teal-400/30 hover:shadow-teal-500/20 transition-all duration-500 hover:scale-105 animate-pulse-slow w-32 h-80">
          <div className="flex flex-col items-center justify-center space-y-4 h-full">
            <div className="relative">
              <img 
                src="/lovable-uploads/1dd250cd-1c83-41ef-90bb-c3cfa338a50d.png" 
                alt="Staff Credit Logo" 
                className="w-20 h-20 object-contain animate-float group-hover:animate-bounce"
              />
              <div className="absolute inset-0 bg-teal-400/20 rounded-full animate-ping"></div>
            </div>
            <div className="text-center">
              <h3 className="text-white font-bold text-lg group-hover:text-teal-100 transition-colors">
                Staff Credit
              </h3>
              <p className="text-teal-100 text-sm mt-2 group-hover:text-white transition-colors">
                Financial Solutions
              </p>
            </div>
            <div className="w-full h-2 bg-gradient-to-r from-teal-300 to-white rounded-full animate-pulse"></div>
            <div className="text-sm text-teal-100 font-medium group-hover:text-white transition-colors animate-fade-in text-center">
              Click to Learn More
            </div>
          </div>
        </div>
      </a>
    </div>
  );
};

export default StaffCreditAd;
