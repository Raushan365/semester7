import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const Beauty = () => {
  const navigate = useNavigate();

  // Service categories data
  const serviceCategories = [
    { id: 1, name: 'Salon Women', image: 'https://res.cloudinary.com/urbanclap/image/upload/t_high_res_category/w_56,dpr_2,fl_progressive:steep,q_auto:low,f_auto,c_limit/images/supply/customer-app-supply/1678864013225-bfc1de.jpeg' },
    { id: 2, name: 'Spa for Women', image: 'https://res.cloudinary.com/urbanclap/image/upload/t_high_res_category/w_56,dpr_2,fl_progressive:steep,q_auto:low,f_auto,c_limit/images/supply/customer-app-supply/1680184207789-5d7c6e.jpeg' },
    { id: 3, name: 'Hair Studio', image: 'https://res.cloudinary.com/urbanclap/image/upload/t_high_res_category/w_56,dpr_2,fl_progressive:steep,q_auto:low,f_auto,c_limit/images/supply/customer-app-supply/1741326936056-c3a39a.jpeg' },
    { id: 4, name: 'Makeup & Styling', image: 'https://res.cloudinary.com/urbanclap/image/upload/t_high_res_category/w_56,dpr_2,fl_progressive:steep,q_auto:low,f_auto,c_limit/images/growth/luminosity/1699869110346-61ab83.jpeg' },
    { id: 5, name: 'Salon Men', image: 'https://res.cloudinary.com/urbanclap/image/upload/t_high_res_category/w_56,dpr_2,fl_progressive:steep,q_auto:low,f_auto,c_limit/images/growth/luminosity/1710241114433-5cfa7c.jpeg' },
    { id: 6, name: 'Massage for Men', image: 'https://res.cloudinary.com/urbanclap/image/upload/t_high_res_category/w_56,dpr_2,fl_progressive:steep,q_auto:low,f_auto,c_limit/images/growth/luminosity/1710241114433-5cfa7c.jpeg' },
    { id: 7, name: 'Waxing', image: 'https://res.cloudinary.com/urbanclap/image/upload/t_high_res_category/w_56,dpr_2,fl_progressive:steep,q_auto:low,f_auto,c_limit/images/growth/luminosity/1705340729734-0a23f7.jpeg' },
    { id: 8, name: 'Facials', image: 'https://res.cloudinary.com/urbanclap/image/upload/t_high_res_category/w_56,dpr_2,fl_progressive:steep,q_auto:low,f_auto,c_limit/images/growth/luminosity/1699869110346-61ab83.jpeg' },
    { id: 9, name: 'Manicure', image: 'https://res.cloudinary.com/urbanclap/image/upload/t_high_res_category/w_56,dpr_2,fl_progressive:steep,q_auto:low,f_auto,c_limit/images/growth/luminosity/1705340729734-0a23f7.jpeg' }
  ];

  const services = [
    {
      id: 1,
      name: "Hair Styling",
      image: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80"
    },
    {
      id: 2,
      name: "Makeup",
      image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
    },
    {
      id: 3,
      name: "Manicure",
      image: "https://images.unsplash.com/photo-1604656853579-4f35850f7b77?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
    },
    {
      id: 4,
      name: "Facial",
      image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
    },
    {
      id: 5,
      name: "Waxing",
      image: "https://images.unsplash.com/photo-1600334129128-685c5582fd35?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
    }
  ];

  const mostBookedServices = [
    {
      id: 1,
      name: 'Pest control (includes utensil removal)',
      rating: '4.79 (109K)',
      price: '₹1,098',
      image: 'https://res.cloudinary.com/urbanclap/image/upload/t_high_res_template/w_233,dpr_2,fl_progressive:steep,q_auto:low,f_auto,c_limit/images/growth/luminosity/1731504272013-0ef836.jpeg',
      link: '/pest-control'
    },
    {
      id: 2,
      name: 'Apartment pest control (includes utensil removal)',
      rating: '4.80 (42K)',
      price: '₹1,498',
      image: 'https://res.cloudinary.com/urbanclap/image/upload/t_high_res_template/w_233,dpr_2,fl_progressive:steep,q_auto:low,f_auto,c_limit/images/growth/luminosity/1738258955021-96e8b0.jpeg',
      link: '/apartment-pest-control'
    },
    {
      id: 3,
      name: 'Full home painting consultation',
      rating: '4.79 (50K)',
      price: '₹49',
      image: 'https://res.cloudinary.com/urbanclap/image/upload/t_high_res_template/w_233,dpr_2,fl_progressive:steep,q_auto:low,f_auto,c_limit/images/supply/customer-app-supply/1727776714128-a28056.jpeg',
      link: '/painting-consultation'
    },
    {
      id: 4,
      name: 'Apartment termite control',
      rating: '4.83 (15K)',
      price: '₹3,999',
      image: 'https://res.cloudinary.com/urbanclap/image/upload/t_high_res_template/w_233,dpr_2,fl_progressive:steep,q_auto:low,f_auto,c_limit/images/growth/luminosity/1729772247309-29d7b5.jpeg',
      link: '/termite-control'
    },
    {
      id: 5,
      name: 'Foam-jet AC service',
      rating: '4.78 (1.7M)',
      price: '₹599',
      image: 'https://res.cloudinary.com/urbanclap/image/upload/t_high_res_template/w_233,dpr_2,fl_progressive:steep,q_auto:low,f_auto,c_limit/images/supply/customer-app-supply/1742297680488-bd6caf.jpeg',
      link: '/ac-service'
    },
    {
      id: 6,
      name: 'Bed bugs control',
      rating: '4.77 (23K)',
      price: '₹1,599',
      image: 'https://res.cloudinary.com/urbanclap/image/upload/t_high_res_template/w_233,dpr_2,fl_progressive:steep,q_auto:low,f_auto,c_limit/images/growth/luminosity/1652173244440-fbfe7b.png',
      link: '/bed-bugs-control'
    },
    {
      id: 7,
      name: 'Swedish stress relief massage',
      rating: '4.84 (178K)',
      price: '₹1,299',
      image: 'https://res.cloudinary.com/urbanclap/image/upload/t_high_res_template/w_233,dpr_2,fl_progressive:steep,q_auto:low,f_auto,c_limit/images/growth/luminosity/1731066064017-84baf7.jpeg',
      link: '/massage'
    }
  ];

  const sliderRef = useRef(null);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(true);

  const checkScrollPosition = () => {
    const slider = sliderRef.current;
    if (!slider) return;

    setShowLeftButton(slider.scrollLeft > 0);
    setShowRightButton(
      slider.scrollLeft < slider.scrollWidth - slider.clientWidth - 1
    );
  };

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: -300,
        behavior: 'smooth'
      });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: 300,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    const slider = sliderRef.current;
    if (slider) {
      slider.addEventListener('scroll', checkScrollPosition);
      checkScrollPosition(); // Check initial position
    }

    return () => {
      if (slider) {
        slider.removeEventListener('scroll', checkScrollPosition);
      }
    };
  }, []);

  const handleSeeAllClick = () => {
    navigate('/about');
  };

  return (
    <div className="bg-gray-50 py-25">
      {/* Hero Section - Urban Company Style */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8 items-stretch">
          {/* Left Section - 3x3 Grid */}
          <div className="lg:w-1/2">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">
              Beauty services at your doorstep
            </h1>

            {/* 3x3 Category Grid */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">What are you looking for?</h2>
              <div className="grid grid-cols-3 gap-3">
                {serviceCategories.slice(0, 9).map((service) => (
                  <div
                    key={service.id}
                    className="bg-white rounded-lg shadow-sm overflow-hidden transition-transform duration-300 hover:scale-105 cursor-pointer text-center border border-gray-100"
                    onClick={() => console.log(`Navigating to ${service.name} page`)}
                  >
                    <div className="p-4">
                      <img
                        src={service.image}
                        alt={service.name}
                        className="w-12 h-12 object-contain mx-auto"
                      />
                    </div>
                    <div className="p-2 bg-gray-50">
                      <p className="text-xs font-medium text-gray-800">{service.name}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Trust Markers - Centered in Left Section */}
            <div className="flex justify-center gap-8 mt-8">
              <div className="flex items-center bg-white p-3 rounded-lg shadow-sm">
                <img
                  src="https://res.cloudinary.com/urbanclap/image/upload/t_high_res_category/w_48,dpr_2,fl_progressive:steep,q_auto:low,f_auto,c_limit/images/growth/home-screen/1693570188661-dba2e7.jpeg"
                  alt="4.8 Service Rating"
                  className="w-10 h-10 mr-3"
                />
                <div>
                  <p className="text-lg font-bold">4.8</p>
                  <p className="text-xs text-gray-600">Service Rating*</p>
                </div>
              </div>

              <div className="flex items-center bg-white p-3 rounded-lg shadow-sm">
                <img
                  src="https://res.cloudinary.com/urbanclap/image/upload/t_high_res_template,q_auto:low,f_auto/w_48,dpr_2,fl_progressive:steep,q_auto:low,f_auto,c_limit/images/growth/home-screen/1693491890812-e86755.jpeg"
                  alt="12M+ Customers"
                  className="w-10 h-10 mr-3"
                />
                <div>
                  <p className="text-lg font-bold">12M+</p>
                  <p className="text-xs text-gray-600">Customers Globally*</p>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2 relative">
            <div className="grid grid-cols-2 gap-3 sm:gap-5">
              <img
                src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
                alt="Beauty Services"
                className="w-full h-40 sm:h-48 md:h-56 object-cover rounded-lg shadow-lg transform rotate-1"
              />
              <img
                src="https://images.unsplash.com/photo-1519699047748-de8e457a634e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
                alt="Beauty Services"
                className="w-full h-40 sm:h-48 md:h-56 object-cover rounded-lg shadow-lg transform -rotate-1"
              />
              <img
                src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
                alt="Beauty Services"
                className="w-full h-40 sm:h-48 md:h-56 object-cover rounded-lg shadow-lg transform -rotate-2"
              />
              <img
                src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
                alt="Beauty Services"
                className="w-full h-40 sm:h-48 md:h-56 object-cover rounded-lg shadow-lg transform rotate-2"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Home Repair Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-emerald-800">Home Repair</h2>
          <button
            onClick={handleSeeAllClick}
            className="text-amber-600 hover:text-amber-800 font-medium flex items-center transition-all duration-300 transform hover:translate-x-1 border p-2 rounded-lg cursor-pointer"
          >
            See All
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        <div onClick={handleSeeAllClick} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 cursor-pointer">
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

      {/* Most Booked Services Section */}
      <div className="max-w-7xl mx-auto px-4 py-12 relative">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Most booked services
        </h2>

        <div className="relative">
          {/* Left Button */}
          {showLeftButton && (
            <button
              onClick={scrollLeft}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full shadow-md w-12 h-12 flex items-center justify-center hover:bg-gray-100 transition-colors duration-300 border border-gray-200"
              aria-label="Scroll left"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#0F0F0F" viewBox="0 0 16 16">
                <path fill="#0F0F0F" fillRule="evenodd" d="M6.47 2.97l-4.5 4.5a.75.75 0 000 1.06l4.5 4.5 1.06-1.06-3.22-3.22h9.19v-1.5H4.31l3.22-3.22-1.06-1.06z" clipRule="evenodd"></path>
              </svg>
            </button>
          )}

          {/* Slider */}
          <div
            ref={sliderRef}
            className="flex overflow-x-auto space-x-4 py-4 px-2 scrollbar-hide"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            {mostBookedServices.map((service) => (
              <a
                key={service.id}
                href={service.link}
                className="flex-shrink-0 w-64 bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-lg"
              >
                <div className="h-64 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{service.name}</h3>
                  <div className="flex items-center mb-2">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="#545454" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12.923 2.616a1 1 0 00-1.846 0l-2.41 5.795-6.257.502a1 1 0 00-.571 1.756l4.767 4.084-1.457 6.105a1 1 0 001.494 1.086L12 18.672l5.357 3.272a1 1 0 001.494-1.086l-1.457-6.105 4.767-4.084a1 1 0 00-.57-1.756l-6.257-.502-2.41-5.795z" fill="#545454"></path>
                    </svg>
                    <span className="text-sm text-gray-600 ml-1">{service.rating}</span>
                  </div>
                  <p className="text-indigo-600 font-bold">{service.price}</p>
                </div>
              </a>
            ))}
          </div>

          {/* Right Button */}
          {showRightButton && (
            <button
              onClick={scrollRight}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full shadow-md w-12 h-12 flex items-center justify-center hover:bg-gray-100 transition-colors duration-300 border border-gray-200"
              aria-label="Scroll right"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#0F0F0F" viewBox="0 0 16 16">
                <path fill="#0F0F0F" fillRule="evenodd" d="M11.69 8.75H2.5v-1.5h9.19L8.47 4.03l1.06-1.06 4.5 4.5a.75.75 0 010 1.06l-4.5 4.5-1.06-1.06 3.22-3.22z" clipRule="evenodd"></path>
              </svg>
            </button>
          )}
        </div>

        {/* Hide scrollbar for WebKit browsers */}
        <style jsx>{`
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
        `}</style>
      </div>
    </div>
  );
};

export default Beauty;