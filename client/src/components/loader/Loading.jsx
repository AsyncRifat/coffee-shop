import React from 'react';

const Loading = () => {
  return (
    <div className="flex items-center justify-center space-x-2 mt-10">
      <div className="w-4 h-4 rounded-full animate-pulse bg-[#D2B48C]"></div>
      <div className="w-4 h-4 rounded-full animate-pulse bg-[#D2B48C]"></div>
      <div className="w-4 h-4 rounded-full animate-pulse bg-[#D2B48C]"></div>
    </div>
  );
};

export default Loading;
