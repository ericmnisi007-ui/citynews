
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, Search, Globe, Zap } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useToast } from "@/hooks/use-toast";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { toast } = useToast();
  const categories = ["Headlines", "Politics", "Business", "Sports", "Technology"];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCategoryClick = (category: string) => {
    toast({
      title: `${category} Selected`,
      description: `Browsing ${category} news stories`,
    });
  };

  const handleSearchClick = () => {
    toast({
      title: "Search",
      description: "Search functionality activated",
    });
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${
      isScrolled 
        ? 'glass-effect shadow-2xl' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center space-x-4 animate-slide-in-left">
            <div className="relative">
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-3 rounded-xl glow-green">
                <Globe className="h-7 w-7 text-white animate-pulse-slow" />
              </div>
              <div className="absolute -top-1 -right-1">
                <Zap className="h-4 w-4 text-green-400 animate-pulse" />
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent text-glow">
                ZA News Hub
              </h1>
              <p className="text-xs text-gray-400 font-medium">South African Headlines</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            {categories.map((category, index) => (
              <Button
                key={category}
                variant="ghost"
                onClick={() => handleCategoryClick(category)}
                className={`text-gray-300 hover:text-green-400 hover:bg-green-400/10 transition-all duration-300 border border-transparent hover:border-green-400/30 rounded-xl animate-slide-up stagger-${index + 1}`}
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Search and Mobile Menu */}
          <div className="flex items-center space-x-4 animate-slide-in-right">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleSearchClick}
              className="hidden sm:flex glass-effect border-green-400/30 text-green-400 hover:bg-green-400/10 hover:text-green-300 glow-green"
            >
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
            
            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="md:hidden glass-effect border-green-400/30 text-green-400 hover:bg-green-400/10">
                  <Menu className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent className="glass-effect border-l border-green-400/30">
                <div className="flex flex-col space-y-4 mt-8">
                  {categories.map((category, index) => (
                    <Button 
                      key={category} 
                      variant="ghost" 
                      onClick={() => handleCategoryClick(category)}
                      className={`justify-start text-gray-300 hover:text-green-400 hover:bg-green-400/10 animate-slide-in-right stagger-${index + 1}`}
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
