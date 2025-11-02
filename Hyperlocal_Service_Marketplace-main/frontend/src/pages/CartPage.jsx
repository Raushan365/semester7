import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { FiX, FiClock, FiCalendar, FiMapPin, FiPhone, FiShoppingCart } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";

const CartPage = () => {
  const {
    user,
    cart,
    removeFromCart,
    updateQuantity,
    totalPrice,
    clearCart,
    login
  } = useAppContext();

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    address: "",
    date: "",
    time: "",
    mobile: "",
    instructions: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!user) {
      // Redirect to login with return URL
      navigate('/cart', { state: { from: '/login' } });
      return;
    }

    // In a real app, this would send the booking to your backend
    console.log("Booking submitted:", { cart, formData });
    alert("Booking submitted successfully!");
    clearCart();
    navigate("/");
  };

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6 text-center">
            <div className="inline-flex items-center justify-center bg-gray-100 rounded-full h-16 w-16 mb-4">
              <FiShoppingCart className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Please login to view your cart
            </h3>
            <p className="text-gray-500 mb-6">
              Your cart items will be saved once you login
            </p>
            <button
              onClick={() => navigate('/login', { state: { from: '/cart' } })}
              className="inline-flex items-center bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-4 rounded-md font-medium cursor-pointer"
            >
              Login to Continue
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Cart</h1>

        {cart.length === 0 ? (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center bg-gray-100 rounded-full h-16 w-16 mb-4">
              <FiShoppingCart className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Your cart is empty
            </h3>
            <p className="text-gray-500 mb-6">
              Add some services to get started
            </p>
            <Link
              to="/services"
              className="inline-flex items-center bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-4 rounded-md font-medium cursor-pointer"
            >
              Browse Services
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">
                Selected Services ({cart.reduce((sum, item) => sum + item.quantity, 0)})
              </h2>

              <div className="space-y-4">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between py-4 border-b border-gray-200"
                  >
                    <div className="flex items-center">
                      <div className="w-20 h-20 bg-gray-200 rounded-md overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="ml-4">
                        <h3 className="font-medium text-gray-800">
                          {item.name}
                        </h3>
                        <p className="text-gray-600 text-sm">{item.duration}</p>
                        <p className="text-emerald-600 font-medium">
                          ₹{item.price * item.quantity}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="flex items-center border border-gray-300 rounded-md">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-2 py-1 text-gray-600 hover:bg-gray-100 cursor-pointer"
                        >
                          -
                        </button>
                        <span className="px-2">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-2 py-1 text-gray-600 hover:bg-gray-100 cursor-pointer"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="ml-4 text-gray-400 hover:text-red-500 cursor-pointer"
                      >
                        <FiX className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 border-t border-gray-200 pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-medium text-gray-800">
                    Total
                  </span>
                  <span className="text-xl font-bold text-emerald-600">
                    ₹{totalPrice}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-6">
              <form onSubmit={handleSubmit}>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Booking Details
                </h2>

                <div className="mb-4">
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    <div className="flex items-center">
                      <FiMapPin className="mr-1" />
                      <span>Address</span>
                    </div>
                  </label>
                  <textarea
                    id="address"
                    name="address"
                    rows={3}
                    required
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-text"
                    placeholder="Enter your complete address"
                  ></textarea>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label
                      htmlFor="date"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      <div className="flex items-center">
                        <FiCalendar className="mr-1" />
                        <span>Date</span>
                      </div>
                    </label>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      required
                      value={formData.date}
                      onChange={handleChange}
                      min={new Date().toISOString().split("T")[0]}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="time"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      <div className="flex items-center">
                        <FiClock className="mr-1" />
                        <span>Time</span>
                      </div>
                    </label>
                    <select
                      id="time"
                      name="time"
                      required
                      value={formData.time}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
                    >
                      <option value="">Select time</option>
                      <option value="09:00-12:00">Morning (9AM-12PM)</option>
                      <option value="12:00-15:00">Afternoon (12PM-3PM)</option>
                      <option value="15:00-18:00">Evening (3PM-6PM)</option>
                      <option value="18:00-21:00">Night (6PM-9PM)</option>
                    </select>
                  </div>
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="mobile"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    <div className="flex items-center">
                      <FiPhone className="mr-1" />
                      <span>Mobile Number</span>
                    </div>
                  </label>
                  <input
                    type="tel"
                    id="mobile"
                    name="mobile"
                    required
                    value={formData.mobile}
                    onChange={handleChange}
                    pattern="[0-9]{10}"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-text"
                    placeholder="Enter 10-digit mobile number"
                  />
                </div>

                <div className="mb-6">
                  <label
                    htmlFor="instructions"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Special Instructions
                  </label>
                  <textarea
                    id="instructions"
                    name="instructions"
                    rows={2}
                    value={formData.instructions}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-text"
                    placeholder="Any special requirements or notes"
                  ></textarea>
                </div>

                <div className="flex justify-between items-center">
                  <Link
                    to="/services"
                    className="text-emerald-600 hover:text-emerald-700 font-medium cursor-pointer"
                  >
                    ← Continue Adding Services
                  </Link>
                  <button
                    type="submit"
                    className="bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-6 rounded-md font-medium cursor-pointer"
                  >
                    Confirm Booking
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;