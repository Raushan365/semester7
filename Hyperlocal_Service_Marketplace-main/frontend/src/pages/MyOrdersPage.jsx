import React, { useState } from 'react';
import { FiSearch, FiChevronDown } from 'react-icons/fi';

const MyOrdersPage = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Sample booking data
  const bookings = [
    {
      id: 'BK001',
      serviceType: 'plumber',
      serviceName: 'Emergency Pipe Repair',
      provider: 'John Plumbing Services',
      date: '2023-06-15',
      time: '10:00 AM',
      status: 'completed',
      amount: 120,
      rating: 4.5,
      address: '123 Main St, Apt 4B, New York'
    },
    {
      id: 'BK002',
      serviceType: 'electrician',
      serviceName: 'Wiring Installation',
      provider: 'Spark Electric',
      date: '2023-06-18',
      time: '2:30 PM',
      status: 'upcoming',
      amount: 200,
      rating: null,
      address: '123 Main St, Apt 4B, New York'
    },
    {
      id: 'BK003',
      serviceType: 'salon',
      serviceName: 'Haircut & Styling',
      provider: 'Glamour Salon',
      date: '2023-06-10',
      time: '11:00 AM',
      status: 'completed',
      amount: 45,
      rating: 5,
      address: '456 Beauty Ave, Suite 2, New York'
    },
    {
      id: 'BK004',
      serviceType: 'cleaning',
      serviceName: 'Deep Home Cleaning',
      provider: 'CleanPro Services',
      date: '2023-06-22',
      time: '9:00 AM',
      status: 'cancelled',
      amount: 150,
      rating: null,
      address: '123 Main St, Apt 4B, New York'
    },
  ];

  // Filter bookings based on active tab and search query
  const filteredBookings = bookings.filter(booking => {
    const matchesTab = activeTab === 'all' || booking.serviceType === activeTab || booking.status === activeTab;
    const matchesSearch = booking.serviceName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.provider.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  // Get service icon based on type
  const getServiceIcon = (type) => {
    switch (type) {
      case 'plumber': return '🛠️';
      case 'electrician': return '🔌';
      case 'salon': return '✂️';
      case 'cleaning': return '🧹';
      default: return '📅';
    }
  };

  // Get status badge style - updated to match navbar color scheme
  const getStatusBadge = (status) => {
    switch (status) {
      case 'completed': return 'bg-emerald-100 text-emerald-800';
      case 'upcoming': return 'bg-amber-100 text-amber-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-emerald-800">My Bookings</h1>
          <p className="mt-2 text-lg text-emerald-700">
            View your service booking history
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              placeholder="Search bookings..."
              className="w-full pl-10 pr-4 py-2 border border-emerald-300 rounded-full focus:ring-2 focus:ring-amber-300 focus:border-amber-300 text-emerald-800"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="absolute left-3 top-2.5 text-emerald-500">
              <FiSearch className="h-5 w-5" />
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeTab === 'all' 
                  ? 'bg-emerald-700 text-white hover:bg-emerald-800' 
                  : 'bg-white text-emerald-700 border border-emerald-300 hover:bg-emerald-50'
              }`}
            >
              All Bookings
            </button>
            <button
              onClick={() => setActiveTab('plumber')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeTab === 'plumber' 
                  ? 'bg-emerald-700 text-white hover:bg-emerald-800' 
                  : 'bg-white text-emerald-700 border border-emerald-300 hover:bg-emerald-50'
              }`}
            >
              Plumber
            </button>
            <button
              onClick={() => setActiveTab('electrician')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeTab === 'electrician' 
                  ? 'bg-emerald-700 text-white hover:bg-emerald-800' 
                  : 'bg-white text-emerald-700 border border-emerald-300 hover:bg-emerald-50'
              }`}
            >
              Electrician
            </button>
            <button
              onClick={() => setActiveTab('salon')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeTab === 'salon' 
                  ? 'bg-emerald-700 text-white hover:bg-emerald-800' 
                  : 'bg-white text-emerald-700 border border-emerald-300 hover:bg-emerald-50'
              }`}
            >
              Salon
            </button>
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeTab === 'upcoming' 
                  ? 'bg-amber-500 text-white hover:bg-amber-600' 
                  : 'bg-white text-amber-600 border border-amber-300 hover:bg-amber-50'
              }`}
            >
              Upcoming
            </button>
          </div>
        </div>

        {/* Bookings List */}
        {filteredBookings.length > 0 ? (
          <div className="space-y-4">
            {filteredBookings.map((booking) => (
              <div 
                key={booking.id} 
                className="bg-white shadow-md overflow-hidden rounded-lg hover:shadow-lg transition-shadow duration-300 border border-emerald-100"
              >
                <div className="px-4 py-5 sm:px-6 flex flex-col sm:flex-row sm:items-center justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="text-3xl">{getServiceIcon(booking.serviceType)}</div>
                    <div>
                      <h3 className="text-lg leading-6 font-medium text-emerald-800">{booking.serviceName}</h3>
                      <p className="mt-1 text-sm text-emerald-600">{booking.provider}</p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        <span className={`px-2 py-1 text-xs rounded-full ${getStatusBadge(booking.status)}`}>
                          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                        </span>
                        {booking.rating && (
                          <span className="flex items-center px-2 py-1 text-xs rounded-full bg-amber-100 text-amber-800">
                            ⭐ {booking.rating}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 sm:mt-0 text-right">
                    <p className="text-sm text-emerald-600">{booking.date} at {booking.time}</p>
                    <p className="mt-1 text-lg font-semibold text-emerald-800">${booking.amount}</p>
                  </div>
                </div>
                <div className="border-t border-emerald-100 px-4 py-4 sm:px-6 bg-emerald-50">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                      <p className="text-sm text-emerald-700">
                        <span className="font-medium">Address:</span> {booking.address}
                      </p>
                    </div>
                    <div className="flex space-x-3">
                      <button className="px-4 py-2 border border-emerald-300 rounded-full text-sm font-medium text-emerald-700 hover:bg-emerald-100 transition-colors">
                        View Details
                      </button>
                      {booking.status === 'upcoming' && (
                        <button className="px-4 py-2 border border-transparent rounded-full text-sm font-medium text-white bg-amber-500 hover:bg-amber-600 transition-colors shadow hover:shadow-md">
                          Reschedule
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white shadow-md overflow-hidden rounded-lg text-center py-12 border border-emerald-100">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="mx-auto h-12 w-12 text-emerald-400" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
              />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-emerald-800">No bookings found</h3>
            <p className="mt-1 text-sm text-emerald-600">
              {activeTab === 'all'
                ? "You don't have any bookings yet."
                : `You don't have any ${activeTab} bookings.`}
            </p>
            <div className="mt-6">
              <button className="inline-flex items-center px-6 py-2 border border-transparent text-sm font-medium rounded-full shadow-sm text-white bg-amber-500 hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-colors">
                Book a Service
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrdersPage;