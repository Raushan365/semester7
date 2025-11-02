import React from 'react';
import { useNavigate } from 'react-router-dom';

const RollOnCard = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center px-4">
      {/* Card Container - Responsive width */}
      <div 
        className="w-full max-w-[1200px] bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg mt-5 mb-5"
        onClick={() => navigate('/services')}
      >
        {/* Image Container - Maintains aspect ratio */}
        <div className="relative pb-[40%] md:pb-[35%] overflow-hidden bg-gray-100">
          {/* Wall Image - Properly contained */}
          <img 
            src="/images/roll-on-waxing.jpg" 
            alt="Premium Wall Panels"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default RollOnCard;