import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getServiceById, createBooking } from '../utils/api';
import Payment from './Payment';

const BookingForm = () => {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bookingData, setBookingData] = useState({
    scheduledDate: '',
    scheduledTime: '',
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      coordinates: {
        lat: null,
        lng: null
      }
    },
    specialInstructions: ''
  });
  const [showPayment, setShowPayment] = useState(false);
  const [bookingId, setBookingId] = useState(null);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const response = await getServiceById(serviceId);
        setService(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.response?.data?.message || 'Failed to fetch service details');
        setLoading(false);
      }
    };

    fetchService();
  }, [serviceId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setBookingData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setBookingData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createBooking({
        service: serviceId,
        ...bookingData,
        totalAmount: service.price
      });
      setBookingId(response.data._id);
      setShowPayment(true);
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to create booking');
    }
  };

  const handlePaymentSuccess = async () => {
    navigate('/bookings');
  };

  if (loading) {
    return <div className="text-center p-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 p-4">{error}</div>;
  }

  if (!service) {
    return <div className="text-center p-4">Service not found</div>;
  }

  if (showPayment) {
    return (
      <div className="max-w-2xl mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Complete Payment</h2>
        <Payment amount={service.price} onSuccess={handlePaymentSuccess} bookingId={bookingId} />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Book {service.title}</h2>
      <div className="bg-gray-50 p-4 rounded-lg mb-6">
        <p className="font-semibold">Service Details:</p>
        <p>Price: ₹{service.price}</p>
        <p>Duration: {service.duration} mins</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2">Date</label>
          <input
            type="date"
            name="scheduledDate"
            value={bookingData.scheduledDate}
            onChange={handleInputChange}
            min={new Date().toISOString().split('T')[0]}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-2">Time</label>
          <input
            type="time"
            name="scheduledTime"
            value={bookingData.scheduledTime}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-2">Street Address</label>
          <input
            type="text"
            name="address.street"
            value={bookingData.address.street}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-2">City</label>
            <input
              type="text"
              name="address.city"
              value={bookingData.address.city}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block mb-2">State</label>
            <input
              type="text"
              name="address.state"
              value={bookingData.address.state}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
        </div>
        <div>
          <label className="block mb-2">ZIP Code</label>
          <input
            type="text"
            name="address.zipCode"
            value={bookingData.address.zipCode}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-2">Special Instructions (Optional)</label>
          <textarea
            name="specialInstructions"
            value={bookingData.specialInstructions}
            onChange={handleInputChange}
            className="w-full p-2 border rounded h-24"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-dark transition-colors duration-300"
        >
          Proceed to Payment
        </button>
      </form>
    </div>
  );
};

export default BookingForm;