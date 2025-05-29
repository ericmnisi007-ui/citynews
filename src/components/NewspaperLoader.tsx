
import React from "react";

const NewspaperLoader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950">
      <div className="newspaper-container">
        <div className="newspaper">
          <div className="newspaper-page page-1">
            <div className="newspaper-header">
              <div className="logo">CNZA</div>
              <div className="title">City News ZA</div>
            </div>
            <div className="newspaper-content">
              <div className="headline">Loading Latest News...</div>
              <div className="article-line"></div>
              <div className="article-line short"></div>
              <div className="article-line"></div>
            </div>
          </div>
          <div className="newspaper-page page-2">
            <div className="newspaper-header">
              <div className="logo">CNZA</div>
              <div className="title">City News ZA</div>
            </div>
            <div className="newspaper-content">
              <div className="headline">Independent & Authentic</div>
              <div className="article-line"></div>
              <div className="article-line short"></div>
              <div className="article-line"></div>
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .newspaper-container {
          perspective: 1000px;
          width: 300px;
          height: 400px;
        }

        .newspaper {
          position: relative;
          width: 100%;
          height: 100%;
          transform-style: preserve-3d;
          animation: flip 2s infinite ease-in-out;
        }

        .newspaper-page {
          position: absolute;
          width: 100%;
          height: 100%;
          background: white;
          border: 2px solid #22C55E;
          border-radius: 8px;
          padding: 20px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
          backface-visibility: hidden;
        }

        .page-1 {
          z-index: 2;
        }

        .page-2 {
          transform: rotateY(180deg);
        }

        .newspaper-header {
          text-align: center;
          border-bottom: 2px solid #22C55E;
          padding-bottom: 10px;
          margin-bottom: 20px;
        }

        .logo {
          background: #22C55E;
          color: white;
          font-weight: bold;
          font-size: 18px;
          padding: 5px 10px;
          border-radius: 4px;
          display: inline-block;
          margin-bottom: 5px;
        }

        .title {
          font-size: 16px;
          font-weight: bold;
          color: #1e293b;
        }

        .headline {
          font-size: 20px;
          font-weight: bold;
          color: #1e293b;
          margin-bottom: 15px;
          text-align: center;
        }

        .article-line {
          height: 12px;
          background: linear-gradient(90deg, #e2e8f0 0%, #cbd5e1 50%, #e2e8f0 100%);
          margin-bottom: 8px;
          border-radius: 2px;
          animation: shimmer 1.5s infinite;
        }

        .article-line.short {
          width: 70%;
        }

        @keyframes flip {
          0% { transform: rotateY(0deg); }
          50% { transform: rotateY(180deg); }
          100% { transform: rotateY(360deg); }
        }

        @keyframes shimmer {
          0% { opacity: 0.6; }
          50% { opacity: 1; }
          100% { opacity: 0.6; }
        }
      `}</style>
    </div>
  );
};

export default NewspaperLoader;
