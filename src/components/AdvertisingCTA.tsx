
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Megaphone, Sparkles, Zap, TrendingUp, Users } from 'lucide-react';

const AdvertisingCTA = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    advertisement: '',
    budget: ''
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "🎉 Inquiry Submitted!",
      description: "We'll contact you soon about advertising opportunities.",
    });
    setIsOpen(false);
    setFormData({ name: '', email: '', company: '', advertisement: '', budget: '' });
  };

  // Floating animation effect
  useEffect(() => {
    const timer = setInterval(() => {
      if (!isHovered) {
        // Trigger a subtle pulse animation
      }
    }, 3000);
    return () => clearInterval(timer);
  }, [isHovered]);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button 
            className="relative bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 hover:from-green-600 hover:via-emerald-600 hover:to-teal-600 text-white rounded-full p-6 shadow-2xl transition-all duration-500 transform hover:scale-110 hover:rotate-2 group animate-float"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Animated background glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full opacity-30 animate-ping"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full opacity-20 animate-pulse"></div>
            
            <div className="relative flex items-center gap-3">
              <div className="relative">
                <Megaphone className="h-7 w-7 group-hover:scale-125 transition-transform duration-300 animate-bounce" />
                <div className="absolute -top-1 -right-1">
                  <Sparkles className="h-4 w-4 text-yellow-300 animate-spin" style={{ animationDuration: '2s' }} />
                </div>
              </div>
              
              <div className="hidden lg:block">
                <div className="font-bold text-lg group-hover:text-yellow-200 transition-colors duration-300">
                  Advertise With Us
                </div>
                <div className="text-xs opacity-90 group-hover:opacity-100 transition-opacity duration-300">
                  Boost Your Business
                </div>
              </div>
              
              <div className="flex flex-col gap-1">
                <TrendingUp className="h-4 w-4 animate-pulse" />
                <Users className="h-4 w-4 animate-pulse" style={{ animationDelay: '0.5s' }} />
              </div>
            </div>
            
            {/* Floating particles effect */}
            <div className="absolute -top-2 -left-2 w-2 h-2 bg-yellow-400 rounded-full animate-ping opacity-60"></div>
            <div className="absolute -bottom-1 -right-1 w-1.5 h-1.5 bg-blue-400 rounded-full animate-ping opacity-60" style={{ animationDelay: '1s' }}></div>
            <div className="absolute top-1/2 -left-3 w-1 h-1 bg-green-300 rounded-full animate-ping opacity-60" style={{ animationDelay: '0.5s' }}></div>
          </Button>
        </DialogTrigger>
        
        <DialogContent className="sm:max-w-lg bg-gradient-to-br from-slate-900 to-slate-800 border-green-400/30 shadow-2xl backdrop-blur-lg animate-scale-in-center">
          <DialogHeader>
            <DialogTitle className="text-white text-center flex items-center gap-3 justify-center text-xl">
              <div className="relative">
                <Megaphone className="h-6 w-6 text-green-400 animate-bounce" />
                <Zap className="absolute -top-1 -right-1 h-3 w-3 text-yellow-400 animate-pulse" />
              </div>
              <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent font-bold">
                Advertise on City News ZA
              </span>
              <Sparkles className="h-5 w-5 text-green-400 animate-spin" style={{ animationDuration: '3s' }} />
            </DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-6 mt-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="group">
                <Input
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="bg-slate-800/70 border-slate-600 text-white placeholder-gray-400 transition-all duration-300 focus:border-green-400 focus:ring-green-400 focus:scale-105"
                  required
                />
              </div>
              <div className="group">
                <Input
                  type="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="bg-slate-800/70 border-slate-600 text-white placeholder-gray-400 transition-all duration-300 focus:border-green-400 focus:ring-green-400 focus:scale-105"
                  required
                />
              </div>
            </div>
            
            <Input
              placeholder="Company/Business Name"
              value={formData.company}
              onChange={(e) => setFormData({...formData, company: e.target.value})}
              className="bg-slate-800/70 border-slate-600 text-white placeholder-gray-400 transition-all duration-300 focus:border-green-400 focus:ring-green-400 focus:scale-105"
            />
            
            <Textarea
              placeholder="What would you like to advertise? Tell us about your business..."
              value={formData.advertisement}
              onChange={(e) => setFormData({...formData, advertisement: e.target.value})}
              className="bg-slate-800/70 border-slate-600 text-white placeholder-gray-400 transition-all duration-300 focus:border-green-400 focus:ring-green-400 resize-none"
              rows={4}
              required
            />
            
            <Input
              placeholder="Estimated Budget (Optional)"
              value={formData.budget}
              onChange={(e) => setFormData({...formData, budget: e.target.value})}
              className="bg-slate-800/70 border-slate-600 text-white placeholder-gray-400 transition-all duration-300 focus:border-green-400 focus:ring-green-400"
            />
            
            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl relative group"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                <Zap className="h-4 w-4 group-hover:animate-bounce" />
                Submit Inquiry
                <TrendingUp className="h-4 w-4 group-hover:animate-bounce" style={{ animationDelay: '0.1s' }} />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-400 opacity-0 group-hover:opacity-20 rounded-lg transition-opacity duration-300"></div>
            </Button>
          </form>
          
          <div className="mt-4 text-center">
            <p className="text-gray-400 text-sm">
              🚀 Join thousands of businesses reaching South African audiences
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdvertisingCTA;
