import React from "react";

const LoadingGrid = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="rounded-xl bg-card border border-border overflow-hidden animate-pulse">
            <div className="w-full h-48 bg-secondary" />
            <div className="p-5">
              <div className="h-3 bg-secondary rounded w-16 mb-3" />
              <div className="h-5 bg-secondary rounded w-full mb-2" />
              <div className="h-5 bg-secondary rounded w-3/4 mb-4" />
              <div className="h-3 bg-secondary rounded w-full mb-2" />
              <div className="h-3 bg-secondary rounded w-2/3 mb-4" />
              <div className="flex justify-between">
                <div className="h-3 bg-secondary rounded w-24" />
                <div className="h-8 bg-secondary rounded w-16" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LoadingGrid;
