import React from 'react';
import { useNavigate } from 'react-router-dom';

const SmartHome = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center px-4">
      {/* Card Container - Responsive width with max-width */}
      <div 
        className="w-full max-w-[1200px] bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg my-5"
        onClick={() => navigate('/services')}
      >
        {/* Image Container - Flexible height with centered image */}
        <div className="w-full flex justify-center items-center bg-gray-100 min-h-[200px]">
          {/* Responsive Image - Shows full image without cropping */}
          <img 
            src="/images/smart-home.jpg" 
            alt="Smart Home Solutions"
            className="w-full h-auto max-h-[80vh] object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default SmartHome;