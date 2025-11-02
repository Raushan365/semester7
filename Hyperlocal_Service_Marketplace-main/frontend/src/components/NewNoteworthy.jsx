import React from 'react';
import { useNavigate } from 'react-router-dom';

const cardData = [
  {
    id: 1,
    title: 'Insta Help',
    route: "/services",
    image: 'https://images.unsplash.com/photo-1634906344066-2c9dfd5e8ef7?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    id: 2,
    title: 'Wall Panel',
    route: "/services",
    image: 'https://images.unsplash.com/photo-1701422522251-332666e37ed3?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    id: 3,
    title: 'Native Water Purifier',
    route: "/services",
    image: 'https://images.unsplash.com/photo-1570615541379-e6b7ab6d4eb9?q=80&w=1173&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    id: 4,
    title: 'Native Smart Locks',
    route: "/services",
    image: 'https://images.unsplash.com/photo-1646753002835-74296cb27a83?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    id: 5,
    title: 'Kitchen Cleaning',
    route: "/services",
    image: 'https://images.unsplash.com/photo-1736433622548-4adbbc1c2cf2?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    id: 6,
    title: 'Full Home Painting',
    route: "/services",
    image: 'https://images.unsplash.com/photo-1633466985376-01a6457f3176?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    id: 7,
    title: 'Laptop',
    route: "/services",
    image: 'https://images.unsplash.com/photo-1658240527554-9cf987b4de49?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    id: 8,
    title: 'Spa Ayurveda',
    route: "/services",
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3BhJTIwYXl1cnZlZGF8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60'
  },
  {
    id: 9,
    title: 'Hair Studio for Women',
    route: "/services",
    image: 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aGFpciUyMHN0dWRpb3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60'
  },
  {
    id: 10,
    title: 'Ac Services & Repair',
    route: "/services",
    image: 'https://images.unsplash.com/photo-1709432767122-d3cb5326911a?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  }
];

const NewNoteworthy = () => {
  const navigate = useNavigate();

  const handleCardClick = (route) => {
    navigate(route);
  };

  return (
    <div className="max-w-6xl mx-auto px-5 py-8">
      <h2 className="text-3xl font-bold text-emerald-800 mb-8">New and noteworthy</h2>
      
      {/* Desktop Grid (2 rows of 5 columns) */}
      <div className="hidden md:grid md:grid-cols-5 gap-6">
        {cardData.map((card) => (
          <div 
            key={card.id} 
            className="bg-white rounded-xl shadow-md overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-lg cursor-pointer border border-emerald-100"
            onClick={() => handleCardClick(card.route)}
          >
            <div className="h-40 overflow-hidden">
              <img 
                src={card.image} 
                alt={card.title} 
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
              />
            </div>
            <div className="p-4 text-center font-semibold text-emerald-800">
              {card.title}
            </div>
          </div>
        ))}
      </div>

      {/* Mobile Horizontal Scroll */}
      <div className="md:hidden flex overflow-x-auto pb-4 gap-4 scroll-smooth snap-x snap-mandatory">
        {cardData.map((card) => (
          <div 
            key={card.id} 
            className="flex-shrink-0 w-48 snap-start bg-white rounded-xl shadow-md overflow-hidden transition-transform duration-300 hover:scale-105 cursor-pointer border border-emerald-100"
            onClick={() => handleCardClick(card.route)}
          >
            <div className="h-32 overflow-hidden">
              <img 
                src={card.image} 
                alt={card.title} 
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
              />
            </div>
            <div className="p-3 text-center font-semibold text-emerald-800 text-sm">
              {card.title}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewNoteworthy;