import React, { useState, useEffect } from 'react';
import ServiceLocationMap from '../components/Map/ServiceLocationMap';
import useLocation from '../hooks/useLocation';
import axios from 'axios';

const NearbyServices = () => {
  const { location, error: locationError, loading: locationLoading } = useLocation();
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchRadius, setSearchRadius] = useState(5000); // 5km default radius

  useEffect(() => {
    const fetchNearbyProviders = async () => {
      if (!location) return;

      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/providers/nearby`, {
          params: {
            lat: location.lat,
            lng: location.lng,
            radius: searchRadius / 1000, // Convert to km
          },
        });
        setProviders(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch nearby service providers');
        setLoading(false);
      }
    };

    fetchNearbyProviders();
  }, [location, searchRadius]);

  if (locationLoading || loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (locationError) {
    return (
      <div className="text-center text-red-600">
        Error: {locationError}. Please enable location services to find nearby providers.
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-600">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Nearby Service Providers</h2>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Search Radius</label>
        <select
          value={searchRadius}
          onChange={(e) => setSearchRadius(Number(e.target.value))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value={2000}>2 km</option>
          <option value={5000}>5 km</option>
          <option value={10000}>10 km</option>
          <option value={20000}>20 km</option>
        </select>
      </div>

      <div className="mb-8">
        <ServiceLocationMap
          userLocation={location}
          serviceProviders={providers}
          radius={searchRadius}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {providers.map((provider) => (
          <div
            key={provider._id}
            className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
          >
            <h3 className="font-semibold text-lg">{provider.name}</h3>
            <p className="text-gray-600">{provider.services.join(', ')}</p>
            <p className="text-sm text-gray-500">
              {provider.distance.toFixed(1)} km away
            </p>
            <div className="mt-4">
              <button
                onClick={() => window.location.href = `/book/${provider._id}`}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
              >
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {providers.length === 0 && (
        <div className="text-center text-gray-600">
          No service providers found in your area. Try increasing the search radius.
        </div>
      )}
    </div>
  );
};

export default NearbyServices;