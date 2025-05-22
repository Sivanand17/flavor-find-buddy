
import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex justify-center items-center py-20">
      <div className="flex space-x-2">
        <div className="loading-dot w-3 h-3 rounded-full bg-primary"></div>
        <div className="loading-dot w-3 h-3 rounded-full bg-primary"></div>
        <div className="loading-dot w-3 h-3 rounded-full bg-primary"></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
