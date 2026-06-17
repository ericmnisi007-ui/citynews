import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, Search, ChevronDown } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const categories = ["Headlines", "Politics", "Business", "Sports", "Technology", "Leisure"];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCategoryClick = (category: string) => {
    navigate(`/category/${category.toLowerCase()}`);
  };

  const handleSearchClick = () => {
    navigate('/search');
  };

  const handleLogoClick = () => {
    navigate('/');
  };

  const handleAdminAccess = () => {
    const adminKey = prompt("Enter admin access key:");
    if (adminKey === "admin123") {
      navigate('/admin');
    } else {
      toast({
        title: "Access Denied",
        description: "Invalid admin key",
        variant: "destructive",
      });
    }
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${
      isScrolled
        ? 'bg-[#0a0a0a]/95 backdrop-blur-xl shadow-[0_1px_0_0_rgba(255,255,255,0.06)]'
        : 'bg-[#0a0a0a]/80 backdrop-blur-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={handleLogoClick}>
            <div className="bg-primary/10 px-3 py-1.5 rounded-lg border border-primary/20">
              <span className="text-primary font-black text-lg tracking-tight">CN</span>
              <span className="text-white font-black text-lg tracking-tight">ZA</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold text-white tracking-tight">City News ZA</h1>
              <p className="text-[11px] text-muted-foreground font-medium">Independent & Authentic</p>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-1">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryClick(category)}
                className="px-3 py-2 text-sm text-muted-foreground hover:text-white transition-colors relative group"
              >
                {category}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-3/4" />
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={handleSearchClick}
              className="w-9 h-9 flex items-center justify-center rounded-lg bg-secondary hover:bg-secondary/80 text-muted-foreground hover:text-white transition-all"
            >
              <Search className="h-4 w-4" />
            </button>

            <div
              onDoubleClick={handleAdminAccess}
              className="hidden sm:block w-7 h-7 cursor-pointer opacity-0 hover:opacity-20 transition-opacity rounded bg-secondary"
              title="Double-click for admin access"
            />

            <Sheet>
              <SheetTrigger asChild>
                <button className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg bg-secondary hover:bg-secondary/80 text-muted-foreground hover:text-white transition-all">
                  <Menu className="h-4 w-4" />
                </button>
              </SheetTrigger>
              <SheetContent className="bg-[#0a0a0a] border-l border-border p-6">
                <div className="flex flex-col space-y-2 mt-8">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => handleCategoryClick(category)}
                      className="w-full text-left px-4 py-3 text-muted-foreground hover:text-white hover:bg-secondary rounded-lg transition-all"
                    >
                      {category}
                    </button>
                  ))}
                  <div
                    onDoubleClick={handleAdminAccess}
                    className="mt-6 pt-6 border-t border-border text-center text-xs text-muted-foreground"
                  >
                    Double-tap for admin access
                  </div>
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
