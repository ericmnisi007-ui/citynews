
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const ArticleDetailHeader = () => {
  const navigate = useNavigate();

  return (
    <Button 
      onClick={() => navigate('/')}
      variant="ghost"
      className="text-green-400 hover:text-green-300 mb-6"
    >
      <ArrowLeft className="h-4 w-4 mr-2" />
      Back to Home
    </Button>
  );
};

export default ArticleDetailHeader;
