import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getServicesByCategory } from '../utils/api';

const ServiceCategoryComponent = ({ category }) => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await getServicesByCategory(category);
        setServices(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.response?.data?.message || 'Failed to fetch services');
        setLoading(false);
      }
    };

    fetchServices();
  }, [category]);

  const handleBookService = (serviceId) => {
    navigate(`/book-service/${serviceId}`);
  };

  if (loading) {
    return <div className="text-center p-4">Loading services...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 p-4">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-center capitalize">
        {category.split('-').join(' ')} Services
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <div
            key={service._id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <img
              src={service.image}
              alt={service.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-gray-600 mb-4">{service.description}</p>
              <div className="flex justify-between items-center mb-4">
                <span className="text-2xl font-bold text-primary">
                  ₹{service.price}
                </span>
                <span className="text-gray-500">
                  {service.duration} mins
                </span>
              </div>
              <div className="space-y-2">
                {service.features.map((feature, index) => (
                  <div key={index} className="flex items-center text-gray-600">
                    <svg
                      className="w-5 h-5 text-green-500 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {feature}
                  </div>
                ))}
              </div>
              <button
                onClick={() => handleBookService(service._id)}
                className="mt-4 w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-dark transition-colors duration-300"
              >
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceCategoryComponent;