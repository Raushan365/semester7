import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';
import { FaCheck, FaSpinner, FaTimes, FaMoneyBill } from 'react-icons/fa';

const AdminDashboard = () => {
  const { axios } = useAppContext();
  const [bookings, setBookings] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [workCompletionData, setWorkCompletionData] = useState({
    notes: '',
    images: []
  });

  // Fetch bookings and stats
  const fetchData = async () => {
    try {
      const [bookingsRes, statsRes] = await Promise.all([
        axios.get('/admin/bookings'),
        axios.get('/admin/bookings/stats')
      ]);
      setBookings(bookingsRes.data.bookings);
      setStats(statsRes.data.stats);
    } catch (error) {
      toast.error('Error fetching dashboard data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Accept booking
  const handleAcceptBooking = async (bookingId) => {
    try {
      await axios.put(`/admin/bookings/${bookingId}/accept`, {
        adminNotes: 'Booking accepted by admin'
      });
      toast.success('Booking accepted successfully');
      fetchData();
    } catch (error) {
      toast.error('Error accepting booking');
    }
  };

  // Mark work as completed
  const handleMarkCompleted = async (bookingId) => {
    try {
      await axios.put(`/admin/bookings/${bookingId}/complete`, workCompletionData);
      toast.success('Work marked as completed');
      setSelectedBooking(null);
      setWorkCompletionData({ notes: '', images: [] });
      fetchData();
    } catch (error) {
      toast.error('Error marking work as completed');
    }
  };

  // Cancel booking
  const handleCancelBooking = async (bookingId) => {
    try {
      await axios.put(`/admin/bookings/${bookingId}/cancel`, {
        cancelReason: 'Cancelled by admin'
      });
      toast.success('Booking cancelled successfully');
      fetchData();
    } catch (error) {
      toast.error('Error cancelling booking');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <FaSpinner className="animate-spin text-4xl text-emerald-600" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {stats && stats.map((stat) => (
          <div key={stat._id} className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold capitalize">{stat._id}</h3>
            <p className="text-2xl font-bold mt-2">{stat.count}</p>
            <p className="text-sm text-gray-500">Total: ₹{stat.totalAmount}</p>
          </div>
        ))}
      </div>

      {/* Bookings List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Booking ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customer
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Service
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {bookings.map((booking) => (
              <tr key={booking._id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {booking._id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {booking.user.name}
                  </div>
                  <div className="text-sm text-gray-500">
                    {booking.user.email}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {booking.service.title}
                  </div>
                  <div className="text-sm text-gray-500">
                    {booking.scheduledDate} {booking.scheduledTime}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                    ${booking.status === 'requested' ? 'bg-yellow-100 text-yellow-800' :
                      booking.status === 'accepted' ? 'bg-blue-100 text-blue-800' :
                      booking.status === 'work_completed' ? 'bg-green-100 text-green-800' :
                      booking.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                      'bg-gray-100 text-gray-800'}`}>
                    {booking.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  ₹{booking.totalAmount}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  {booking.status === 'requested' && (
                    <button
                      onClick={() => handleAcceptBooking(booking._id)}
                      className="text-emerald-600 hover:text-emerald-900 mr-3"
                    >
                      <FaCheck className="inline mr-1" /> Accept
                    </button>
                  )}
                  {booking.status === 'accepted' && (
                    <button
                      onClick={() => setSelectedBooking(booking)}
                      className="text-blue-600 hover:text-blue-900 mr-3"
                    >
                      Mark Complete
                    </button>
                  )}
                  {['requested', 'accepted'].includes(booking.status) && (
                    <button
                      onClick={() => handleCancelBooking(booking._id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <FaTimes className="inline mr-1" /> Cancel
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Work Completion Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h2 className="text-lg font-semibold mb-4">Mark Work as Completed</h2>
            <textarea
              className="w-full p-2 border rounded mb-4"
              placeholder="Enter completion notes..."
              value={workCompletionData.notes}
              onChange={(e) => setWorkCompletionData(prev => ({
                ...prev,
                notes: e.target.value
              }))}
            />
            <div className="flex justify-end space-x-3">
              <button
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                onClick={() => setSelectedBooking(null)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700"
                onClick={() => handleMarkCompleted(selectedBooking._id)}
              >
                Mark Complete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;