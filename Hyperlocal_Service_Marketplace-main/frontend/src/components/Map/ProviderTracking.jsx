import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker, DirectionsRenderer } from '@react-google-maps/api';
import io from 'socket.io-client';

const ProviderTracking = ({ bookingId, initialUserLocation, initialProviderLocation }) => {
  const [directions, setDirections] = useState(null);
  const [providerLocation, setProviderLocation] = useState(initialProviderLocation);
  const [estimatedTime, setEstimatedTime] = useState(null);
  const [socket, setSocket] = useState(null);

  const mapStyles = {
    height: '400px',
    width: '100%',
  };

  // Initialize socket connection
  useEffect(() => {
    const newSocket = io(process.env.REACT_APP_BACKEND_URL);
    setSocket(newSocket);

    return () => newSocket.close();
  }, []);

  // Listen for provider location updates
  useEffect(() => {
    if (socket) {
      socket.emit('join-tracking-room', { bookingId });

      socket.on('provider-location-update', (data) => {
        setProviderLocation({
          lat: data.location.lat,
          lng: data.location.lng,
        });
        updateRoute();
      });
    }
  }, [socket, bookingId]);

  // Calculate and update route
  const updateRoute = () => {
    const directionsService = new window.google.maps.DirectionsService();

    directionsService.route(
      {
        origin: providerLocation,
        destination: initialUserLocation,
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          setDirections(result);
          // Update estimated arrival time
          const duration = result.routes[0].legs[0].duration.text;
          setEstimatedTime(duration);
        }
      }
    );
  };

  useEffect(() => {
    if (providerLocation) {
      updateRoute();
    }
  }, [providerLocation]);

  return (
    <div className="tracking-container">
      <div className="tracking-info">
        <h3>Service Provider is on the way!</h3>
        {estimatedTime && (
          <p>Estimated arrival time: {estimatedTime}</p>
        )}
      </div>
      
      <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={14}
          center={providerLocation}
        >
          {/* Provider's current location */}
          <Marker
            position={providerLocation}
            icon={{
              url: '/provider-location.png',
              scaledSize: { width: 40, height: 40 },
            }}
          />

          {/* User's location */}
          <Marker
            position={initialUserLocation}
            icon={{
              url: '/user-location.png',
              scaledSize: { width: 40, height: 40 },
            }}
          />

          {/* Route between provider and user */}
          {directions && (
            <DirectionsRenderer
              directions={directions}
              options={{
                suppressMarkers: true,
              }}
            />
          )}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default ProviderTracking;