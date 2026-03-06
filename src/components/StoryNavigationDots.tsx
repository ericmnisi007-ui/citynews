
import React from "react";

interface StoryNavigationDotsProps {
  totalStories: number;
  currentSlide: number;
  onSlideChange: (index: number) => void;
}

const StoryNavigationDots = ({ totalStories, currentSlide, onSlideChange }: StoryNavigationDotsProps) => {
  return (
    <div className="flex justify-center mt-8 gap-3">
      {Array.from({ length: totalStories }, (_, index) => (
        <button
          key={index}
          onClick={() => onSlideChange(index)}
          className={`w-3 h-3 rounded-full transition-all duration-300 ${
            index === currentSlide 
              ? 'bg-green-400 w-8 glow-green' 
              : 'bg-gray-600 hover:bg-gray-500'
          }`}
        />
      ))}
    </div>
  );
};

export default StoryNavigationDots;
