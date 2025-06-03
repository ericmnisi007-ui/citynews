
import React from 'react';

const SideAdvertisements = () => {
  const handleStaffCreditClick = () => {
    window.open('https://staffcredit.co.za', '_blank');
  };

  const handlePlot49Click = () => {
    window.open('https://plot49.co.za', '_blank');
  };

  return (
    <div className="space-y-6">
      {/* Staff Credit Advertisement */}
      <div 
        onClick={handleStaffCreditClick}
        className="bg-gradient-to-br from-teal-600 to-blue-700 rounded-xl p-6 cursor-pointer transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl group animate-fade-in border border-teal-400/30"
      >
        <div className="text-center space-y-4">
          <div className="mx-auto w-20 h-20 bg-white rounded-full flex items-center justify-center group-hover:animate-bounce">
            <img 
              src="/lovable-uploads/4780e5a8-de58-48a8-ba1f-d7f7e961706e.png" 
              alt="Staff Credit Logo" 
              className="w-16 h-16 object-contain"
            />
          </div>
          <div>
            <h3 className="text-white font-bold text-lg mb-2 group-hover:text-teal-200 transition-colors">
              Staff Credit
            </h3>
            <p className="text-teal-100 text-sm mb-3">
              Quick & Easy Staff Loans
            </p>
            <div className="bg-white text-teal-600 px-4 py-2 rounded-full text-sm font-semibold group-hover:bg-teal-100 transition-colors animate-pulse">
              Apply Now →
            </div>
          </div>
        </div>
      </div>

      {/* Plot 49 Advertisement */}
      <div 
        onClick={handlePlot49Click}
        className="bg-gradient-to-br from-green-600 to-emerald-700 rounded-xl p-6 cursor-pointer transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl group animate-fade-in border border-green-400/30"
      >
        <div className="text-center space-y-4">
          <div className="mx-auto w-20 h-20 bg-white rounded-full flex items-center justify-center group-hover:animate-pulse">
            <div className="text-3xl font-bold text-green-600">P49</div>
          </div>
          <div>
            <h3 className="text-white font-bold text-lg mb-2 group-hover:text-green-200 transition-colors">
              Plot 49 Venue
            </h3>
            <p className="text-green-100 text-sm mb-3">
              Perfect Events & Functions
            </p>
            <div className="bg-white text-green-600 px-4 py-2 rounded-full text-sm font-semibold group-hover:bg-green-100 transition-colors animate-pulse">
              Book Now →
            </div>
          </div>
        </div>
      </div>

      {/* General Advertisement Slot */}
      <div className="bg-gradient-to-br from-slate-700 to-slate-800 rounded-xl p-6 border border-green-400/20 animate-fade-in">
        <div className="text-center space-y-3">
          <div className="text-green-400 font-semibold">Advertise Here</div>
          <div className="text-gray-300 text-sm">
            Reach thousands of South African readers
          </div>
          <div className="text-xs text-gray-400">
            Contact us for rates
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideAdvertisements;
