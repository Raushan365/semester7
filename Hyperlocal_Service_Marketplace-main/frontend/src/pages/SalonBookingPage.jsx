import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';

const SalonBookingPage = () => {
  const { addToCart } = useAppContext();
  const [activeCategory, setActiveCategory] = useState('men');

  // Service categories
  const categories = [
    { id: 'men', name: 'Men\'s Services' },
    { id: 'women', name: 'Women\'s Services' },
    { id: 'unisex', name: 'Unisex Services' }
  ];

  // Services data with images and pricing in INR
  const services = {
    men: [
      { 
        id: 1, 
        name: 'Men\'s Haircut', 
        duration: '30 mins', 
        price: 300,
        image: 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
      },
      { 
        id: 2, 
        name: 'Beard Trim', 
        duration: '20 mins', 
        price: 200,
        image: 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
      },
      { 
        id: 3, 
        name: 'Men\'s Facial', 
        duration: '45 mins', 
        price: 600,
        image: 'https://images.unsplash.com/photo-1589984662646-e7b2e4962f18?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
      }
    ],
    women: [
      { 
        id: 4, 
        name: 'Women\'s Haircut', 
        duration: '45 mins', 
        price: 500,
        image: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
      },
      { 
        id: 5, 
        name: 'Hair Coloring', 
        duration: '2 hours', 
        price: 1500,
        image: 'https://images.unsplash.com/photo-1559599101-f09722fb4948?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
      },
      { 
        id: 6, 
        name: 'Bridal Makeup', 
        duration: '2 hours', 
        price: 2500,
        image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
      }
    ],
    unisex: [
      { 
        id: 7, 
        name: 'Manicure', 
        duration: '45 mins', 
        price: 400,
        image: 'https://images.unsplash.com/photo-1596704017256-dfb4c3b571b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
      },
      { 
        id: 8, 
        name: 'Pedicure', 
        duration: '1 hour', 
        price: 600,
        image: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
      },
      { 
        id: 9, 
        name: 'Waxing', 
        duration: '30 mins', 
        price: 700,
        image: 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 mt-16">
      <div className="max-w-7xl mx-auto">
        {/* Salon Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Urban Style Salon
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Professional grooming services for everyone
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex overflow-x-auto pb-2 mb-6 scrollbar-hide">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 mr-2 rounded-full font-medium whitespace-nowrap ${activeCategory === category.id ? 'bg-pink-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services[activeCategory].map((service) => (
              <div 
                key={service.id}
                className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105"
              >
                <div className="relative h-48">
                  <img 
                    src={service.image} 
                    alt={service.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800">{service.name}</h3>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-gray-600">{service.duration}</span>
                    <span className="text-lg font-bold text-pink-600">₹{service.price}</span>
                  </div>
                  <button
                    onClick={() => addToCart(service)}
                    className="mt-4 w-full bg-pink-600 hover:bg-pink-700 text-white py-2 px-4 rounded-md font-medium"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalonBookingPage;