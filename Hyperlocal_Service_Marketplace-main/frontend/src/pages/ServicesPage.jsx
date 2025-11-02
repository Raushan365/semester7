import { useState, useEffect } from "react";
import { useAppContext } from "../context/AppContext";
import { FiShoppingCart, FiClock, FiCheckCircle } from "react-icons/fi";
import { Link } from "react-router-dom";

const ServicesPage = () => {
  const { cart, addToCart, searchQuery, setSearchQuery } = useAppContext();
  const [activeCategory, setActiveCategory] = useState("all");
  const [filteredServices, setFilteredServices] = useState([]);

  // Service data with more services and proper image paths
  const services = [
    // Plumbing Services
    {
      id: 1,
      name: "Basic Plumbing Repair",
      category: "plumbing",
      price: 499,
      duration: "30-60 mins",
      description: "Fix leaking pipes, taps, and basic plumbing issues",
      image: "https://images.unsplash.com/photo-1706033915017-b1313a8e5c18?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      id: 2,
      name: "Bathroom Fitting Installation",
      category: "plumbing",
      price: 1299,
      duration: "2-3 hours",
      description: "Install new bathroom fittings including taps, showers, etc.",
      image: "https://images.unsplash.com/photo-1664227430687-9299c593e3da?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      id: 3,
      name: "Water Tank Cleaning",
      category: "plumbing",
      price: 999,
      duration: "2-3 hours",
      description: "Professional cleaning of overhead and underground water tanks",
      image: "https://images.unsplash.com/photo-1509886246223-cd7fd68f5372?q=80&w=1176&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      id: 21,
      name: "Drain Unclogging",
      category: "plumbing",
      price: 799,
      duration: "1-2 hours",
      description: "Clear blocked drains and pipes using professional equipment",
      image: "https://images.unsplash.com/photo-1603815211005-3d9edec72049?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      id: 22,
      name: "Water Heater Installation",
      category: "plumbing",
      price: 1499,
      duration: "3-4 hours",
      description: "Installation of new water heaters with safety checks",
      image: "https://images.unsplash.com/photo-1632576201861-28d241b46ceb?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },

    // Electrical Services
    {
      id: 4,
      name: "Switchboard Repair",
      category: "electrical",
      price: 699,
      duration: "1-2 hours",
      description: "Fixing faulty switches, circuit breakers and fuse boxes",
      image: "https://images.unsplash.com/photo-1623707430101-9e74cefe05e2?q=80&w=2067&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      id: 5,
      name: "Wiring Installation",
      category: "electrical",
      price: 1999,
      duration: "4-6 hours",
      description: "Complete wiring installation for new construction or renovation",
      image: "https://images.unsplash.com/photo-1650322376275-09fc5c420a5e?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      id: 6,
      name: "Light Fixture Installation",
      category: "electrical",
      price: 399,
      duration: "30-60 mins",
      description: "Installation of ceiling lights, chandeliers, and wall lights",
      image: "https://images.unsplash.com/photo-1565874322538-cefe281fd9ed?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      id: 23,
      name: "Generator Repair",
      category: "electrical",
      price: 1199,
      duration: "2-3 hours",
      description: "Diagnosis and repair of home generator issues",
      image: "https://images.unsplash.com/photo-1649038780045-235e4b6e40b4?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      id: 24,
      name: "Inverter Installation",
      category: "electrical",
      price: 2499,
      duration: "3-4 hours",
      description: "Professional installation of home inverter systems",
      image: "https://images.unsplash.com/photo-1715163792252-4a29d2d956f6?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },

    // Salon Services - Male
    {
      id: 7,
      name: "Men's Haircut",
      category: "salon-male",
      price: 199,
      duration: "30 mins",
      description: "Professional haircut with styling for men",
      image: "https://images.unsplash.com/photo-1514336937476-a5b961020a5c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      id: 9,
      name: "Men's Shave & Beard Trim",
      category: "salon-male",
      price: 299,
      duration: "45 mins",
      description: "Traditional shave with hot towel and beard grooming",
      image: "https://images.unsplash.com/photo-1654097803253-d481b6751f29?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      id: 25,
      name: "Men's Facial",
      category: "salon-male",
      price: 499,
      duration: "1 hour",
      description: "Deep cleansing facial with massage for men",
      image: "https://images.unsplash.com/photo-1728949202468-c37fdbd76856?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      id: 26,
      name: "Men's Hair Color",
      category: "salon-male",
      price: 699,
      duration: "1.5 hours",
      description: "Professional hair coloring for men",
      image: "https://images.unsplash.com/photo-1571454870742-43c314f3a81a?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },

    // Salon Services - Female
    {
      id: 8,
      name: "Women's Haircut",
      category: "salon-female",
      price: 399,
      duration: "1 hour",
      description: "Professional haircut with styling for women",
      image: "https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      id: 10,
      name: "Women's Hair Color",
      category: "salon-female",
      price: 999,
      duration: "2-3 hours",
      description: "Professional hair coloring service",
      image: "https://images.unsplash.com/photo-1617391654484-2894196c2cc9?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      id: 27,
      name: "Bridal Makeup",
      category: "salon-female",
      price: 2999,
      duration: "3-4 hours",
      description: "Complete bridal makeup with trials",
      image: "https://images.unsplash.com/photo-1684867952634-1f89c58fe31d?q=80&w=1172&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      id: 28,
      name: "Spa Pedicure",
      category: "salon-female",
      price: 799,
      duration: "1.5 hours",
      description: "Luxurious foot spa and pedicure treatment",
      image: "https://images.unsplash.com/photo-1513007696757-908340e0ad67?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },

    // Carpenter Services
    {
      id: 11,
      name: "Furniture Repair",
      category: "carpenter",
      price: 599,
      duration: "1-2 hours",
      description: "Repair of wooden furniture including chairs, tables, etc.",
      image: "https://images.unsplash.com/photo-1647426994723-ab685e4b8c77?q=80&w=1223&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      id: 12,
      name: "Custom Woodwork",
      category: "carpenter",
      price: 1999,
      duration: "Varies",
      description: "Custom furniture and woodwork as per requirements",
      image: "https://images.unsplash.com/photo-1603789798149-08161fab410f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      id: 13,
      name: "Door/Window Repair",
      category: "carpenter",
      price: 799,
      duration: "1-3 hours",
      description: "Repair and alignment of doors and windows",
      image: "https://images.unsplash.com/photo-1554584003-b0286242664a?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      id: 29,
      name: "Kitchen Cabinet Installation",
      category: "carpenter",
      price: 3499,
      duration: "1-2 days",
      description: "Custom kitchen cabinet design and installation",
      image: "https://images.unsplash.com/photo-1728163807511-5cac5ea7d909?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      id: 30,
      name: "Wood Polishing",
      category: "carpenter",
      price: 1299,
      duration: "4-6 hours",
      description: "Professional polishing for wooden furniture and floors",
      image: "https://images.unsplash.com/photo-1602856805912-5dab4ce4b618?q=80&w=1174&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },

    // Cleaning Services
    {
      id: 14,
      name: "Kitchen Deep Cleaning",
      category: "cleaning",
      price: 1299,
      duration: "3-4 hours",
      description: "Complete kitchen cleaning including appliances, cabinets, etc.",
      image: "https://images.unsplash.com/photo-1737372805905-be0b91ec86fb?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      id: 15,
      name: "Bathroom Deep Cleaning",
      category: "cleaning",
      price: 999,
      duration: "2-3 hours",
      description: "Thorough bathroom cleaning including tiles, fixtures, etc.",
      image: "https://images.unsplash.com/photo-1711361234578-1845b58b20c0?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      id: 31,
      name: "Full Home Deep Cleaning",
      category: "cleaning",
      price: 3999,
      duration: "6-8 hours",
      description: "Complete deep cleaning for entire home (2BHK)",
      image: "https://images.unsplash.com/photo-1572229798801-f71d3737680a?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      id: 32,
      name: "Sofa Cleaning",
      category: "cleaning",
      price: 1499,
      duration: "2-3 hours",
      description: "Professional sofa cleaning with steam and chemicals",
      image: "https://images.unsplash.com/photo-1686178827149-6d55c72d81df?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      id: 33,
      name: "Carpet Cleaning",
      category: "cleaning",
      price: 899,
      duration: "1-2 hours",
      description: "Deep cleaning for carpets and rugs",
      image: "https://images.unsplash.com/photo-1603712725038-e9334ae8f39f?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },

    // Painting Services
    {
      id: 16,
      name: "Full Home Painting",
      category: "painting",
      price: 9999,
      duration: "3-5 days",
      description: "Complete interior/exterior painting for 2BHK homes",
      image: "https://images.unsplash.com/photo-1651407825607-15c585d433c8?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      id: 17,
      name: "Single Room Painting",
      category: "painting",
      price: 2999,
      duration: "1-2 days",
      description: "Painting service for one room including walls and ceiling",
      image: "https://images.unsplash.com/photo-1721901953926-8c40ac4f6494?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      id: 34,
      name: "Wallpaper Installation",
      category: "painting",
      price: 1999,
      duration: "1 day",
      description: "Professional wallpaper installation per room",
      image: "https://images.unsplash.com/photo-1586335925834-44121c1679c6?q=80&w=1176&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      id: 35,
      name: "Wood Staining",
      category: "painting",
      price: 1799,
      duration: "1 day",
      description: "Staining service for wooden doors and furniture",
      image: "https://images.unsplash.com/photo-1607202563214-fa528b3f7263?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },

    // Tech Services
    {
      id: 18,
      name: "Laptop Repair",
      category: "tech",
      price: 999,
      duration: "1-2 days",
      description: "Diagnosis and repair of laptop hardware/software issues",
      image: "https://images.unsplash.com/photo-1658240527554-9cf987b4de49?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      id: 19,
      name: "RO Service",
      category: "tech",
      price: 599,
      duration: "1-2 hours",
      description: "RO water purifier servicing and filter replacement",
      image: "https://images.unsplash.com/photo-1665074208264-235604aa4187?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      id: 20,
      name: "AC Service",
      category: "tech",
      price: 799,
      duration: "1-2 hours",
      description: "Complete AC servicing including gas refill and cleaning",
      image: "https://images.unsplash.com/photo-1709432767122-d3cb5326911a?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      id: 36,
      name: "TV Repair",
      category: "tech",
      price: 1199,
      duration: "1-3 hours",
      description: "Diagnosis and repair of television issues",
      image: "https://images.unsplash.com/photo-1646821804389-9778ce2a4fd7?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      id: 37,
      name: "Smart Home Setup",
      category: "tech",
      price: 2499,
      duration: "3-4 hours",
      description: "Installation and configuration of smart home devices",
      image: "https://images.unsplash.com/photo-1647077341225-04c8b49ed74d?q=80&w=1183&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      id: 38,
      name: "CCTV Installation",
      category: "tech",
      price: 2999,
      duration: "4-6 hours",
      description: "Professional CCTV camera installation with DVR setup",
      image: "https://images.unsplash.com/photo-1728971975421-50f3dc9663a4?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    }
  ];

  // Categories for filtering
  const categories = [
    { id: "all", name: "All Services" },
    { id: "plumbing", name: "Plumbing" },
    { id: "electrical", name: "Electrical" },
    { id: "salon-male", name: "Men's Salon" },
    { id: "salon-female", name: "Women's Salon" },
    { id: "carpenter", name: "Carpentry" },
    { id: "cleaning", name: "Cleaning" },
    { id: "painting", name: "Painting" },
    { id: "tech", name: "Tech Services" }
  ];

  // Filter services based on active category and search query
  useEffect(() => {
    let filtered = activeCategory === "all"
      ? services
      : services.filter(service => service.category === activeCategory);

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(service =>
        service.name.toLowerCase().includes(query) ||
        service.description.toLowerCase().includes(query)
      );
    }

    setFilteredServices(filtered);
  }, [activeCategory, searchQuery]);

  const handleAddToCart = (service) => {
    addToCart(service);
  };

  // Clear search query when leaving the page
  useEffect(() => {
    return () => {
      setSearchQuery("");
    };
  }, [setSearchQuery]);

  const clearSearch = () => {
    setSearchQuery("");
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Professional Home Services
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            Book trusted professionals for all your home service needs
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-10">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer ${activeCategory === category.id
                  ? "bg-emerald-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
                  }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
            >
              <div className="h-48 bg-gray-200 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-full h-full object-contain bg-white"
                />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {service.name}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {service.description}
                </p>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center text-sm text-gray-500">
                    <FiClock className="mr-1" />
                    <span>{service.duration}</span>
                  </div>
                  <div className="text-lg font-bold text-emerald-600">
                    ₹{service.price}
                  </div>
                </div>
                <button
                  onClick={() => handleAddToCart(service)}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-4 rounded-md font-medium flex items-center justify-center cursor-pointer transition-colors"
                >
                  <FiShoppingCart className="mr-2" />
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* View Cart Button (shown only when cart has items) */}
        {cart.length > 0 && (
          <div className="mt-8 text-center">
            <Link
              to="/cart"
              className="inline-flex items-center bg-emerald-600 hover:bg-emerald-700 text-white py-3 px-6 rounded-md font-medium cursor-pointer transition-colors"
            >
              <FiShoppingCart className="mr-2" />
              Proceed to Cart ({cart.reduce((sum, item) => sum + item.quantity, 0)})
            </Link>
          </div>
        )}

        {filteredServices.length === 0 && (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center bg-gray-100 rounded-full h-16 w-16 mb-4">
              <FiCheckCircle className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No services found
            </h3>
            <p className="text-gray-500">
              {searchQuery ? (
                <>
                  No services match your search for "{searchQuery}".<br />
                  Try different keywords or browse all services.
                </>
              ) : (
                "Try selecting a different category or check back later for new services"
              )}
            </p>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="mt-4 bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-4 rounded-md font-medium"
              >
                Clear Search
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ServicesPage;