import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiScissors, FiSmile, FiUser, FiTool, FiDroplet } from 'react-icons/fi';
import { MdOutlineCleaningServices, MdOutlineElectricalServices } from 'react-icons/md';

function Hero() {
  const navigate = useNavigate();

  // Service categories data - 9 services with routes
  const serviceCategories = [
    { id: 1, name: 'Salon', icon: <FiScissors size={28} />, color: 'bg-pink-100', route: '/services' },
    { id: 2, name: 'Spa', icon: <FiSmile size={28} />, color: 'bg-purple-100', route: '/services' },
    { id: 3, name: 'Hair', icon: <FiUser size={28} />, color: 'bg-blue-100', route: '/services' },
    { id: 4, name: 'Grooming', icon: <FiScissors size={28} />, color: 'bg-green-100', route: '/services' },
    { id: 5, name: 'Massage', icon: <FiSmile size={28} />, color: 'bg-yellow-100', route: '/services' },
    { id: 6, name: 'Repairs', icon: <FiTool size={28} />, color: 'bg-red-100', route: '/services' },
    { id: 7, name: 'Cleaning', icon: <MdOutlineCleaningServices size={28} />, color: 'bg-indigo-100', route: '/services' },
    { id: 8, name: 'Plumber', icon: <FiDroplet size={28} />, color: 'bg-teal-100', route: '/services' },
    { id: 9, name: 'Electrician', icon: <MdOutlineElectricalServices size={28} />, color: 'bg-orange-100', route: '/services' }
  ];

  // Right side images
  const rightSideImages = [
    'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    'https://images.unsplash.com/photo-1519699047748-de8e457a634e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  ];

  const handleServiceClick = (route) => {
    navigate(route);
  };

  return (
    <div className="bg-emerald-50 py-20">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-emerald-800 mb-10 text-center">Home services at your doorstep</h1>
        
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left Side - 3x3 Services Grid (50% width) */}
          <div className="w-full md:w-1/2 border border-emerald-200 rounded-lg">
            <h1 className='text-2xl pl-10 py-3 text-emerald-800'>What are you looking for?</h1>
            <div className="grid grid-cols-3 gap-3 m-3">
              {serviceCategories.map((service) => (
                <div 
                  key={service.id}
                  className="flex flex-col items-center p-3 bg-white rounded-lg cursor-pointer hover:shadow-md transition-all h-32"
                  onClick={() => handleServiceClick(service.route)}
                >
                  <div className={`${service.color} p-3 rounded-full mb-2`}>
                    {service.icon}
                  </div>
                  <span className="text-s font-medium text-center text-emerald-800">{service.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - 2x2 Images Grid (50% width) */}
          <div className="w-full md:w-1/2">
            <div className="grid grid-cols-2 gap-3 h-full">
              {rightSideImages.map((image, index) => (
                <div 
                  key={index} 
                  className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all h-48"
                >
                  <img 
                    src={image} 
                    alt={`Service ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Hero;