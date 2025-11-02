import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker, Circle } from '@react-google-maps/api';
import axios from 'axios';

const ServiceLocationMap = ({ userLocation, serviceProviders, radius = 5000 }) => {
  const [map, setMap] = useState(null);
  const [center, setCenter] = useState({
    lat: userLocation?.lat || 20.2961, // Default to India
    lng: userLocation?.lng || 85.8245,
  });

  const mapStyles = {
    height: '400px',
    width: '100%',
  };

  const circleOptions = {
    strokeColor: '#FF0000',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#FF0000',
    fillOpacity: 0.35,
    clickable: false,
    draggable: false,
    editable: false,
    visible: true,
    radius: radius,
    zIndex: 1,
  };

  useEffect(() => {
    if (userLocation) {
      setCenter({
        lat: userLocation.lat,
        lng: userLocation.lng,
      });
    }
  }, [userLocation]);

  const onLoad = React.useCallback(function callback(map) {
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  return (
      <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={13}
        center={center}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {/* User's location marker */}
        <Marker
          position={center}
          icon={{
            url: '/user-location.png',
            scaledSize: { width: 40, height: 40 },
          }}
        />

        {/* Service radius circle */}
        <Circle
          center={center}
          options={circleOptions}
        />

        {/* Service providers markers */}
        {serviceProviders?.map((provider) => (
          <Marker
            key={provider._id}
            position={{
              lat: provider.location.coordinates[1],
              lng: provider.location.coordinates[0],
            }}
            icon={{
              url: '/provider-location.png',
              scaledSize: { width: 35, height: 35 },
            }}
            onClick={() => window.location.href = `/provider/${provider._id}`}
          />
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default ServiceLocationMap;