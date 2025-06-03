
import React from 'react';

const SimpleLoader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500 rounded-full animate-spin">
          <div className="w-8 h-8 bg-white rounded-full animate-pulse"></div>
        </div>
        <div className="text-white font-semibold text-lg animate-pulse">
          Loading CNZA...
        </div>
      </div>
    </div>
  );
};

export default SimpleLoader;
