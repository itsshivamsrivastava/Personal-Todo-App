// client/src/components/LoadingSpinner.js
import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="animate-spin rounded-full h-24 w-24 border-t-4 border-b-4 border-blue-500"></div>
      <p className="mt-4 text-xl text-gray-700 font-semibold">Loading...</p>
    </div>
  );
};

export default LoadingSpinner;