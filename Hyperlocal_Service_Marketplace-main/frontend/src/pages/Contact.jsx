import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaPaperPlane,
  FaChevronDown,
  FaChevronUp
} from 'react-icons/fa';
import { useState } from 'react';

const Contact = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-18 bg-emerald-50">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-4xl font-bold text-emerald-800 mb-4">Contact Us</h1>
        <p className="text-xl text-emerald-700 max-w-3xl mx-auto">
          At Urban Elite, we believe in providing exceptional customer service. Our dedicated support team is available to assist you.
        </p>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Information Section */}
        <div className="space-y-8">
          <h2 className="text-2xl font-bold text-emerald-800">Direct Communication Channels</h2>
          <p className="text-emerald-700">
            For immediate assistance, we recommend using our direct contact methods. Our customer support team operates 24/7.
          </p>

          {/* Contact Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Phone Card */}
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-emerald-100">
              <div className="bg-amber-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <FaPhone className="text-amber-600 text-xl" />
              </div>
              <h3 className="text-xl font-semibold text-emerald-800 mb-2">Phone Support</h3>
              <p className="text-emerald-700 mb-2">Available 24/7 for urgent inquiries</p>
              <a href="tel:+18001234567" className="text-amber-600 font-medium hover:text-amber-700">
                +1 (800) 123-4567
              </a>
            </div>

            {/* Email Card */}
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-emerald-100">
              <div className="bg-amber-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <FaEnvelope className="text-amber-600 text-xl" />
              </div>
              <h3 className="text-xl font-semibold text-emerald-800 mb-2">Email Support</h3>
              <p className="text-emerald-700 mb-2">Response within 24 hours</p>
              <a href="mailto:support@urbancompany.com" className="text-amber-600 font-medium hover:text-amber-700">
                support@urbanelite.com
              </a>
            </div>

            {/* Location Card */}
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-emerald-100">
              <div className="bg-amber-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <FaMapMarkerAlt className="text-amber-600 text-xl" />
              </div>
              <h3 className="text-xl font-semibold text-emerald-800 mb-2">Corporate Office</h3>
              <p className="text-emerald-700">
                123, Sector 34<br />
                Noida, UP 201301
              </p>
            </div>

            {/* Hours Card */}
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-emerald-100">
              <div className="bg-amber-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <FaClock className="text-amber-600 text-xl" />
              </div>
              <h3 className="text-xl font-semibold text-emerald-800 mb-2">Business Hours</h3>
              <p className="text-emerald-700">
                Monday - Friday: 9am - 6pm<br />
                Saturday: 10am - 4pm<br />
                Sunday: 9am - 8pm
              </p>
            </div>
          </div>

          {/* Social Media Section */}
          <div className="bg-white p-6 rounded-xl shadow-md border border-emerald-100">
            <h3 className="text-xl font-semibold text-emerald-800 mb-4">Connect on Social Media</h3>
            <p className="text-emerald-700 mb-4">
              Follow us for updates, service tips, and special offers.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="bg-emerald-100 w-10 h-10 rounded-full flex items-center justify-center text-emerald-600 hover:bg-emerald-200 transition">
                <FaFacebook className="text-xl" />
              </a>
              <a href="#" className="bg-emerald-100 w-10 h-10 rounded-full flex items-center justify-center text-emerald-500 hover:bg-emerald-200 transition">
                <FaTwitter className="text-xl" />
              </a>
              <a href="#" className="bg-emerald-100 w-10 h-10 rounded-full flex items-center justify-center text-pink-500 hover:bg-emerald-200 transition">
                <FaInstagram className="text-xl" />
              </a>
              <a href="#" className="bg-emerald-100 w-10 h-10 rounded-full flex items-center justify-center text-emerald-700 hover:bg-emerald-200 transition">
                <FaLinkedin className="text-xl" />
              </a>
            </div>
          </div>

          {/* Map Section */}
          <div className="bg-white p-6 rounded-xl shadow-md border border-emerald-100">
            <h3 className="text-xl font-semibold text-emerald-800 mb-4">Visit Our Headquarters</h3>
            <p className="text-emerald-700 mb-4">
              While we primarily operate online, you're welcome to visit our corporate office in Noida.
            </p>
            <div className="aspect-w-16 aspect-h-9">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3504.716112060885!2d77.32551031508094!3d28.54554498245028!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce5a16f5f3f0d%3A0x9a4e8a7a9a6b1b8e!2sSector%2034%2C%20Noida%2C%20Uttar%20Pradesh%20201301!5e0!3m2!1sen!2sin!4v1629997982547!5m2!1sen!2sin"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                className="rounded-lg"
                title="Urban Elite Headquarters in Noida"
              ></iframe>
            </div>
            <div className="mt-4 text-emerald-700">
              <p><strong>Address:</strong> Sector 34, Noida, Uttar Pradesh 201307</p>
            </div>
          </div>
        </div>

        {/* Contact Form Section */}
        <div className="bg-white p-8 rounded-xl shadow-md border border-emerald-100">
          <h2 className="text-2xl font-bold text-emerald-800 mb-2">Send Us a Message</h2>
          <p className="text-emerald-700 mb-6">
            Have a specific question or request? Fill out the form below.
          </p>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-emerald-800 font-medium mb-2">Full Name*</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-300"
                  required
                />
              </div>
              <div>
                <label className="block text-emerald-800 font-medium mb-2">Email*</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-300"
                  required
                />
              </div>
            </div>
            <div className="mb-6">
              <label className="block text-emerald-800 font-medium mb-2">Subject*</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-300"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-emerald-800 font-medium mb-2">Message*</label>
              <textarea
                name="message"
                rows="5"
                value={formData.message}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-300"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-amber-500 text-white py-3 px-4 rounded-lg font-medium hover:bg-amber-600 transition flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
            >
              <FaPaperPlane />
              Send Message
            </button>
          </form>
        </div>
      </div>

      {/* FAQ Section */}
      <section className="mt-20">
        <h2 className="text-3xl font-bold text-emerald-800 mb-2 text-center">Frequently Asked Questions</h2>
        <p className="text-emerald-700 mb-8 text-center max-w-3xl mx-auto">
          Here are answers to common questions. Can't find what you need? Contact us directly.
        </p>
        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-emerald-100">
          {[
            {
              question: "How can I book a service?",
              answer: "Book through our website or mobile app by selecting your service, time slot, and completing payment."
            },
            {
              question: "What payment methods do you accept?",
              answer: "We accept credit/debit cards, UPI, net banking, and digital wallets through secure payment gateways."
            },
            {
              question: "Can I reschedule my appointment?",
              answer: "Yes, reschedule up to 2 hours before your appointment via your account dashboard."
            },
            {
              question: "Are service professionals verified?",
              answer: "All professionals undergo rigorous 5-step verification including background checks."
            },
            {
              question: "What is your cancellation policy?",
              answer: "Free cancellation up to 2 hours before service. Later cancellations may incur a small fee."
            }
          ].map((item, index) => (
            <div key={index} className="border-b border-emerald-100 last:border-b-0">
              <button
                className="flex justify-between items-center w-full p-6 text-left font-medium text-emerald-800 hover:bg-emerald-50 transition"
                onClick={() => toggleFAQ(index)}
              >
                <span className="text-lg">{item.question}</span>
                {activeIndex === index ? (
                  <FaChevronUp className="text-amber-500" />
                ) : (
                  <FaChevronDown className="text-amber-500" />
                )}
              </button>
              <div className={`px-6 pb-6 pt-0 text-emerald-700 ${activeIndex === index ? 'block' : 'hidden'}`}>
                {item.answer}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Contact;