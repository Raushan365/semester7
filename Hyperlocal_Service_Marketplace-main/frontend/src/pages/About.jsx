import {
  FaUserTie,
  FaChartLine,
  FaGlobe,
  FaUsers,
  FaLinkedin,
  FaInstagram,
  FaTwitter,
  FaHandshake,
  FaLightbulb,
  FaGem,
  FaStar,
  FaUserShield,
  FaRocket
} from 'react-icons/fa';

const About = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-18">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-4xl font-bold text-emerald-800 mb-6">Who We Are</h1>
        <p className="text-xl text-emerald-700 max-w-3xl mx-auto">
          Urban Elite is Asia's largest online home services platform. We're on a mission to empower millions of service professionals by connecting them with millions of customers looking for quality services.
        </p>
      </section>

      {/* Stats Section */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20 text-center">
        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-emerald-100">
          <FaUsers className="text-4xl text-amber-500 mx-auto mb-4" />
          <h3 className="text-3xl font-bold text-emerald-800 mb-2">48,000+</h3>
          <p className="text-emerald-700">Active Service Professionals*</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-emerald-100">
          <FaUserTie className="text-4xl text-amber-500 mx-auto mb-4" />
          <h3 className="text-3xl font-bold text-emerald-800 mb-2">13 Million+</h3>
          <p className="text-emerald-700">Consumers**</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-emerald-100">
          <FaGlobe className="text-4xl text-amber-500 mx-auto mb-4" />
          <h3 className="text-3xl font-bold text-emerald-800 mb-2">59</h3>
          <p className="text-emerald-700">Cities**</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-emerald-100">
          <FaChartLine className="text-4xl text-amber-500 mx-auto mb-4" />
          <h3 className="text-3xl font-bold text-emerald-800 mb-2">4</h3>
          <p className="text-emerald-700">Countries**</p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="mb-20">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="md:w-1/2">
            <img
              src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf"
              alt="Our Story"
              className="rounded-xl shadow-lg w-full h-auto border border-emerald-100"
            />
          </div>
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold text-emerald-800 mb-6">Our Story</h2>
            <p className="text-emerald-700 mb-4">
              Founded in 2014, Urban Elite (formerly Urban Company) set out to solve the trust deficit in the home services sector. What started as a platform to connect customers with reliable service professionals has now transformed into a full-stack managed marketplace.
            </p>
            <p className="text-emerald-700 mb-4">
              We've built technology that enables service professionals to grow their businesses while delivering standardized, high-quality services to customers.
            </p>
            <p className="text-emerald-700">
              Today, we're present in multiple countries across Asia and the Middle East, serving millions of customers with hundreds of services.
            </p>
          </div>
        </div>
      </section>

      {/* Leadership Team Section */}
      <section className="mb-20">
        <h2 className="text-3xl font-bold text-emerald-800 mb-12 text-center">Our Leadership Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              name: "Eline kew",
              role: "Co-Founder & CEO",
              image: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
              linkedin: "#",
              instagram: "#",
              twitter: "#",
            },
            {
              name: "Dina silu",
              role: "Co-Founder & CTO",
              image: "https://images.unsplash.com/photo-1513097633097-329a3a64e0d4?q=80&w=1096&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
              linkedin: "#",
              instagram: "#",
              twitter: "#",
            },
            {
              name: "ristu neli",
              role: "Chief Operating Officer",
              image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
              linkedin: "#",
              instagram: "#",
              twitter: "#",
            },
            {
              name: "komni skey",
              role: "Chief Financial Officer",
              image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
              linkedin: "#",
              instagram: "#",
              twitter: "#",
            },
            {
              name: "tlpis seyu",
              role: "Chief Product Officer",
              image: "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
              linkedin: "#",
              instagram: "#",
              twitter: "#",
            },
            {
              name: "Vinko keni",
              role: "Chief Marketing Officer",
              image: "https://images.unsplash.com/photo-1544095790-c820fc8c7077?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
              linkedin: "#",
              instagram: "#",
              twitter: "#",
            },
          ].map((member, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-xl border border-emerald-100">
              <div className="relative">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold text-emerald-800 mb-1">{member.name}</h3>
                <p className="text-amber-500 font-medium mb-4">{member.role}</p>

                <div className="flex justify-center space-x-3">
                  {member.linkedin && (
                    <a href={member.linkedin} className="text-emerald-700 hover:text-emerald-900 transition-colors">
                      <FaLinkedin className="text-xl" />
                    </a>
                  )}
                  {member.instagram && (
                    <a href={member.instagram} className="text-pink-600 hover:text-pink-800 transition-colors">
                      <FaInstagram className="text-xl" />
                    </a>
                  )}
                  {member.twitter && (
                    <a href={member.twitter} className="text-blue-400 hover:text-blue-600 transition-colors">
                      <FaTwitter className="text-xl" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Investors Section - Text Version */}
      <section className="mb-20">
        <h2 className="text-3xl font-bold text-emerald-800 mb-12 text-center">Our Investors</h2>
        <div className="flex flex-wrap justify-center gap-8">
          {[
            { name: "Steadview Capital", color: "bg-blue-600" },
            { name: "Vy Capital", color: "bg-purple-600" },
            { name: "Tiger Global", color: "bg-orange-500" },
            { name: "Accel", color: "bg-red-600" },
            { name: "Elevation Capital", color: "bg-green-600" },
          ].map((investor, index) => (
            <div key={index} className={`${investor.color} text-white p-6 rounded-xl shadow-md flex items-center justify-center hover:shadow-lg transition-shadow min-w-[200px] h-20`}>
              <span className="text-lg font-bold">{investor.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Values Section */}
      <section className="mb-20">
        <h2 className="text-3xl font-bold text-emerald-800 mb-12 text-center">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Customer First",
              description: "We obsess over customer experience and measure our success by customer satisfaction.",
              icon: <FaUserShield className="text-4xl text-amber-500 mb-4" />
            },
            {
              title: "Ownership",
              description: "We act like owners - we're accountable for our results and take pride in our work.",
              icon: <FaGem className="text-4xl text-amber-500 mb-4" />
            },
            {
              title: "Excellence",
              description: "We strive for excellence in everything we do, setting high standards for ourselves.",
              icon: <FaStar className="text-4xl text-amber-500 mb-4" />
            },
            {
              title: "Transparency",
              description: "We believe in open communication and honest feedback at all levels.",
              icon: <FaHandshake className="text-4xl text-amber-500 mb-4" />
            },
            {
              title: "Innovation",
              description: "We challenge the status quo and continuously look for better ways to solve problems.",
              icon: <FaLightbulb className="text-4xl text-amber-500 mb-4" />
            },
            {
              title: "Collaboration",
              description: "We work together across teams to achieve our common goals.",
              icon: <FaRocket className="text-4xl text-amber-500 mb-4" />
            },
          ].map((value, index) => (
            <div key={index} className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow text-center border border-emerald-100">
              <div className="flex justify-center">
                {value.icon}
              </div>
              <h3 className="text-xl font-semibold text-emerald-800 mb-3">{value.title}</h3>
              <p className="text-emerald-700">{value.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-emerald-700 to-emerald-800 text-white rounded-xl p-12 text-center shadow-lg">
        <h2 className="text-3xl font-bold mb-4">Join Us in Transforming the Services Industry</h2>
        <p className="text-xl mb-8 max-w-3xl mx-auto">
          Whether you're looking for a reliable service provider or want to grow your service business, we've got you covered.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button className="bg-amber-500 text-white px-8 py-3 rounded-lg font-medium hover:bg-amber-600 transition hover:shadow-lg cursor-pointer">
            Book a Service
          </button>
          <button className="border-2 border-white px-8 py-3 rounded-lg font-medium hover:bg-emerald-700 transition hover:shadow-lg cursor-pointer">
            Partner With Us
          </button>
        </div>
      </section>

      {/* Footer Note */}
      <div className="mt-12 text-center text-emerald-600 text-sm">
        <p>*Active service professionals who have completed at least one job in the last 6 months</p>
        <p>**As of last quarter</p>
      </div>
    </div>
  );
};

export default About;