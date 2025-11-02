import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomeRepair = () => {
  const navigate = useNavigate();

  const services = [
    {
      id: 1,
      name: "Plumbing",
      image: "https://images.unsplash.com/photo-1706033915017-b1313a8e5c18?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      id: 2,
      name: "Electrical",
      image: "https://images.unsplash.com/photo-1649038780045-235e4b6e40b4?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      id: 3,
      name: "Carpentry",
      image: "https://images.unsplash.com/photo-1603712725038-e9334ae8f39f?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      id: 4,
      name: "Painting",
      image: "https://images.unsplash.com/photo-1721901953926-8c40ac4f6494?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      id: 5,
      name: "AC Repair",
      image: "https://images.unsplash.com/photo-1709432767122-d3cb5326911a?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    }
  ];

  const handleCardClick = () => {
    navigate('/services');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-emerald-800 mb-4">Professional Home Repair Services</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Trust our skilled professionals to handle all your home maintenance and repair needs with quality service and expertise.
        </p>
      </div>

      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-emerald-800">Our Top Services</h2>
        <button 
          onClick={handleCardClick}
          className="text-amber-600 hover:text-amber-800 font-medium flex items-center transition-all duration-300 transform hover:translate-x-1 border p-2 rounded-lg cursor-pointer"
        >
          See All
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
        </button>
      </div>

      <div onClick={handleCardClick} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 cursor-pointer">
        {services.map((service) => (
          <div 
            key={service.id} 
            className="relative rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 group"
          >
            <div className="relative overflow-hidden">
              <img 
                src={service.image} 
                alt={service.name} 
                className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
            <div className="absolute top-0 left-0 bg-amber-600 text-white px-3 py-1 rounded-br-lg transition-all duration-300 group-hover:bg-amber-700">
              <span className="font-medium">{service.name}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeRepair;