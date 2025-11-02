import React from 'react';
import { useNavigate } from 'react-router-dom';

const WallPanel = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center px-4">
      {/* Card Container - Responsive width */}
      <div 
        className="w-full max-w-[1200px] bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg my-5"
        onClick={() => navigate('/services')}
      >
        {/* Image Container - Responsive with full image display */}
        <div className="w-full flex justify-center bg-gray-100">
          {/* Wall Image - Responsive but never cropped */}
          <img 
            src="/images/WallPanelCard.jpg" 
            alt="Premium Wall Panels"
            className="max-h-[80vh] w-auto object-contain"
            style={{ maxWidth: '100%' }}
          />
        </div>
      </div>
    </div>
  );
};

export default WallPanel;