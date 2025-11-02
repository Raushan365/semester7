import { useState, useEffect } from "react";
import {
  FiSearch,
  FiShoppingCart,
  FiUser,
  FiMenu,
  FiX,
  FiChevronDown
} from "react-icons/fi";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const Navbar = () => {
  const {
    user,
    logout,
    cart,
    setSearchQuery,
    searchQuery
  } = useAppContext();

  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery || "");
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Wall Panels', path: '/homes' },
    { name: 'Contact', path: '/contact' },
    { name: 'About', path: '/about' },
  ];

  const handleSearch = (query) => {
    setLocalSearchQuery(query);
    setShowSearchDropdown(query.length > 0);
    setSearchQuery(query); // Update global search query immediately
  };

  const handleSearchSubmit = () => {
    setSearchQuery(localSearchQuery);
    if (location.pathname !== "/services") {
      navigate("/services");
    }
    setShowSearchDropdown(false);
  };

  const handleLogout = async () => {
    try {
      await logout();
      setIsMenuOpen(false);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    if (searchQuery && location.pathname === "/services") {
      setLocalSearchQuery(searchQuery);
    }
  }, [searchQuery, location.pathname]);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-emerald-700 to-emerald-800 text-white shadow-md">
      <div className="container mx-auto px-4 py-3 md:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-amber-300 hover:text-amber-200 flex items-center">
            <span className="mr-1">🌿</span> UrbanElite
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <div className="flex space-x-6">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="relative group font-medium px-2 py-1 hover:text-amber-200"
                >
                  {link.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-300 group-hover:w-full transition-all duration-300"></span>
                </Link>
              ))}
            </div>

            <div className="relative mx-4">
              <input
                type="text"
                placeholder="Search services..."
                className="px-4 py-2 rounded-full text-white w-64 focus:outline-none focus:ring-2 focus:ring-amber-300"
                value={localSearchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearchSubmit()}
              />
              <FiSearch
                className="absolute right-3 top-2.5 text-gray-500 cursor-pointer"
                onClick={handleSearchSubmit}
              />
            </div>

            <Link to="/cart" className="relative p-2 hover:bg-emerald-600 rounded-full">
              <FiShoppingCart className="h-5 w-5 text-amber-300" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {user ? (
              <div className="relative group">
                <button className="flex items-center space-x-1 focus:outline-none">
                  <div className="h-8 w-8 rounded-full bg-amber-200 flex items-center justify-center text-emerald-800 font-medium">
                    {user.name?.charAt(0).toUpperCase()}
                  </div>
                  <FiChevronDown className="h-4 w-4 text-white group-hover:rotate-180 transition-transform" />
                </button>
                <div className="absolute right-0 top-10 bg-white text-gray-800 rounded-md shadow-lg py-2 w-48 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-300 z-50 border border-emerald-100">
                  <Link to="/profile" className="block px-4 py-2 hover:bg-emerald-50">
                    My Profile
                  </Link>
                  <Link to="/my-orders" className="block px-4 py-2 hover:bg-emerald-50">
                    Booking History
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-emerald-50 border-t border-emerald-100 text-emerald-700"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-amber-500 text-white px-4 py-2 rounded-full font-medium hover:bg-amber-600 flex items-center space-x-2 transition shadow hover:shadow-md"
              >
                <FiUser className="h-4 w-4" />
                <span>Login</span>
              </Link>
            )}
          </div>

          <div className="md:hidden flex items-center space-x-4">
            <Link to="/cart" className="relative p-2">
              <FiShoppingCart className="h-6 w-6 text-amber-300" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
            <button
              onClick={toggleMenu}
              className="p-2 focus:outline-none text-amber-300"
            >
              <FiMenu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-emerald-800 z-50 flex flex-col items-center justify-center space-y-8">
          <button
            onClick={toggleMenu}
            className="absolute top-6 right-6 p-2 focus:outline-none text-amber-300"
          >
            <FiX className="h-6 w-6" />
          </button>

          <div className="w-4/5 mb-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search services..."
                className="w-full px-4 py-2 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-300"
                value={localSearchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearchSubmit()}
              />
              <FiSearch
                className="absolute right-3 top-2.5 text-gray-500 cursor-pointer"
                onClick={handleSearchSubmit}
              />
            </div>
          </div>

          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={toggleMenu}
              className="text-xl font-medium px-4 py-2 hover:text-amber-300"
            >
              {link.name}
            </Link>
          ))}

          <div className="flex space-x-4 mt-8">
            {user ? (
              <>
                <Link
                  to="/profile"
                  onClick={toggleMenu}
                  className="bg-amber-500 text-white px-6 py-2 rounded-full font-medium hover:bg-amber-600 transition shadow"
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="border-2 border-amber-300 text-amber-300 px-6 py-2 rounded-full font-medium hover:bg-emerald-700 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={toggleMenu}
                  className="bg-amber-500 text-white px-6 py-2 rounded-full font-medium hover:bg-amber-600 transition shadow"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  onClick={toggleMenu}
                  className="border-2 border-amber-300 text-amber-300 px-6 py-2 rounded-full font-medium hover:bg-emerald-700 transition"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;