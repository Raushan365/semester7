import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePainting = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center px-4">
      <div 
        className="w-full max-w-[1200px] bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg my-5"
        onClick={() => navigate('/services')}
      >
        <div className="w-full h-[300px] md:h-[400px] flex justify-center items-center bg-gray-100">
          <img 
            src="/images/home-painting.jpg" 
            alt="Home Painting Services"
            className="h-full w-auto object-contain"
          />
        </div>
      </div>
    </div>
  );
};
export default HomePainting;