
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

const LoadingGrid = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="glass-effect border border-green-400/20 overflow-hidden animate-pulse">
            <div className="w-full h-48 bg-gray-700"></div>
            <CardContent className="p-6">
              <div className="h-4 bg-gray-700 rounded mb-2"></div>
              <div className="h-6 bg-gray-700 rounded mb-4"></div>
              <div className="h-16 bg-gray-700 rounded"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default LoadingGrid;
