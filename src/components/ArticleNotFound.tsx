
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Home, Search } from 'lucide-react';

const ArticleNotFound = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 pt-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-slate-900/50 backdrop-blur-sm border border-red-400/20 rounded-xl p-8">
          <h1 className="text-4xl font-bold text-white mb-4">Article Not Found</h1>
          <p className="text-gray-400 mb-2">
            {id ? `The article with ID "${id}" doesn't exist or has been removed.` : 'No article ID was provided.'}
          </p>
          <p className="text-gray-500 text-sm mb-8">
            This might happen if the article was deleted or the link is incorrect.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => navigate('/')} 
              className="bg-green-500 hover:bg-green-600 text-white"
            >
              <Home className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
            
            <Button 
              onClick={() => navigate(-1)} 
              variant="outline" 
              className="border-gray-600 text-gray-300 hover:bg-gray-700"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Go Back
            </Button>
            
            <Button 
              onClick={() => navigate('/search')} 
              variant="outline" 
              className="border-gray-600 text-gray-300 hover:bg-gray-700"
            >
              <Search className="h-4 w-4 mr-2" />
              Search Articles
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleNotFound;
