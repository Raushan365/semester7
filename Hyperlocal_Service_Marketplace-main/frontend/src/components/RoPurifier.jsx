import React from 'react';
import { useNavigate } from 'react-router-dom';

const RoPurifier = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center px-4">
      {/* Card Container - Responsive width */}
      <div 
        className="w-full max-w-[1200px] bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg my-5"
        onClick={() => navigate('/services')}
      >
        {/* Image Container - Shows full image without cropping */}
        <div className="w-full flex justify-center bg-gray-100">
          {/* Responsive Image - Maintains aspect ratio without cropping */}
          <img 
            src="/images/ro-purifier.jpg" 
            alt="RO Water Purifier"
            className="w-full h-auto max-h-[80vh] object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default RoPurifier;