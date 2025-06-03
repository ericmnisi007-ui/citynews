
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Megaphone, Sparkles } from 'lucide-react';

const AdvertisingCTA = () => {
  const [isOpen, setIsOpen] = useState(false);
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
      title: "Inquiry Submitted!",
      description: "We'll contact you soon about advertising opportunities.",
    });
    setIsOpen(false);
    setFormData({ name: '', email: '', company: '', advertisement: '', budget: '' });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-full p-4 shadow-lg animate-bounce hover:animate-none transition-all duration-300 group">
            <div className="flex items-center gap-2">
              <Megaphone className="h-6 w-6 group-hover:scale-110 transition-transform" />
              <span className="hidden md:block font-semibold">Advertise With Us</span>
              <Sparkles className="h-4 w-4 animate-pulse" />
            </div>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md bg-slate-900 border-green-400/20">
          <DialogHeader>
            <DialogTitle className="text-white text-center flex items-center gap-2 justify-center">
              <Megaphone className="h-5 w-5 text-green-400" />
              Advertise on City News ZA
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Input
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="bg-slate-800 border-slate-700 text-white"
                  required
                />
              </div>
              <div>
                <Input
                  type="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="bg-slate-800 border-slate-700 text-white"
                  required
                />
              </div>
            </div>
            <Input
              placeholder="Company/Business Name"
              value={formData.company}
              onChange={(e) => setFormData({...formData, company: e.target.value})}
              className="bg-slate-800 border-slate-700 text-white"
            />
            <Textarea
              placeholder="What would you like to advertise?"
              value={formData.advertisement}
              onChange={(e) => setFormData({...formData, advertisement: e.target.value})}
              className="bg-slate-800 border-slate-700 text-white"
              rows={3}
              required
            />
            <Input
              placeholder="Estimated Budget (Optional)"
              value={formData.budget}
              onChange={(e) => setFormData({...formData, budget: e.target.value})}
              className="bg-slate-800 border-slate-700 text-white"
            />
            <Button 
              type="submit" 
              className="w-full bg-green-500 hover:bg-green-600 text-white"
            >
              Submit Inquiry
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdvertisingCTA;
