
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, Clock, Eye } from "lucide-react";

const QuickStats = () => {
  const stats = [
    { label: "Breaking Stories", value: "24", icon: TrendingUp },
    { label: "Live Updates", value: "156", icon: Clock },
    { label: "Daily Readers", value: "45k+", icon: Eye }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
      {stats.map((stat, index) => (
        <Card key={stat.label} className={`glass-effect border border-green-400/20 text-center p-6 hover-lift animate-slide-up stagger-${index + 1}`}>
          <CardContent className="p-0">
            <stat.icon className="h-8 w-8 text-green-400 mx-auto mb-3" />
            <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
            <div className="text-gray-400 text-sm">{stat.label}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default QuickStats;
