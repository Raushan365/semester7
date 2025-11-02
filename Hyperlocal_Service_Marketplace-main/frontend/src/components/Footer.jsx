import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa';
import { IoMdMail } from 'react-icons/io';
import { FiPhone } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-8 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="mb-6">
            <h3 className="text-xl font-bold mb-4">Urban Company</h3>
            <p className="text-gray-400 mb-4">
              Asia's largest online home services platform. Trusted by 20 million+ happy customers.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <FaFacebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <FaLinkedin size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <FaYoutube size={20} />
              </a>
            </div>
          </div>

          {/* Services */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4">SERVICES</h3>
            <ul className="space-y-2">
              <li><Link to={"/services"} className="text-gray-400 hover:text-white">Home Cleaning</Link></li>
              <li><Link to={"/services"} className="text-gray-400 hover:text-white">AC Service & Repair</Link></li>
              <li><Link to={"/services"} className="text-gray-400 hover:text-white">Plumbing</Link></li>
              <li><Link to={"/services"} className="text-gray-400 hover:text-white">Electrical</Link></li>
              <li><Link to={"/services"} className="text-gray-400 hover:text-white">Carpentry</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4">COMPANY</h3>
            <ul className="space-y-2">
              <li><Link to={"#"} className="text-gray-400 hover:text-white">About Us</Link></li>
              <li><Link to={"#"} className="text-gray-400 hover:text-white">Careers</Link></li>
              <li><Link to={"#"} className="text-gray-400 hover:text-white">Blog</Link></li>
              <li><Link to={"#"} className="text-gray-400 hover:text-white">Press</Link></li>
              <li><Link to={"#"} className="text-gray-400 hover:text-white">Contact Us</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4">CONTACT US</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <IoMdMail className="text-gray-400" />
                <span className="text-gray-400"><a href="mailto:support@urbancompany.com">support@urbancompany.com</a></span>
              </div>
              <div className="flex items-center space-x-2">
                <FiPhone className="text-gray-400" />
                <span className="text-gray-400">+91 800-123-4567</span>
              </div>
<div>
              <h4 className="text-lg font-semibold mb-4">Download App</h4>
              <div className="space-y-3">
                <button className="flex items-center bg-black text-white px-4 py-2 rounded">
                  <span className="mr-2"><a href="#">App Store</a></span>
                  <span>→</span>
                </button>
                <button className="flex items-center bg-black text-white px-4 py-2 rounded">
                  <span className="mr-2"><a href="#">Google Play</a></span>
                  <span>→</span>
                </button>
              </div>
            </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 my-6"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Urban Elite. All rights reserved.
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to={"#"} className="text-gray-400 hover:text-white text-sm">Terms of Service</Link>
            <Link to={"#"} className="text-gray-400 hover:text-white text-sm">Privacy Policy</Link>
            <Link to={"#"} className="text-gray-400 hover:text-white text-sm">Trust & Safety</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;