import { Link } from 'react-router-dom';
import { FaHome, FaExclamationTriangle } from 'react-icons/fa';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-emerald-50 to-amber-50 p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
        <div className="flex justify-center mb-6">
          <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center">
            <FaExclamationTriangle className="text-amber-600 text-2xl" />
          </div>
        </div>
        
        <h1 className="text-3xl font-bold text-emerald-800 mb-4">404 - Page Not Found</h1>
        <p className="text-emerald-700 mb-6">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 bg-amber-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-amber-600 transition shadow-md hover:shadow-lg"
        >
          <FaHome />
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;