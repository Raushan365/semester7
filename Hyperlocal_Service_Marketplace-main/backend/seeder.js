import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Service from './models/Service.js';
import connectDB from './config/db.js';

dotenv.config();

const services = [
  {
    title: "Bathroom Fitting Installation",
    category: "home-repair",
    price: 1299,
    duration: 180,
    description: "Install new bathroom fittings including taps, showers, etc.",
    image: "https://images.unsplash.com/photo-1664227430687-9299c593e3da",
    features: ["Professional installation", "Quality fittings", "Expert plumbers"]
  },
  {
    title: "Water Tank Cleaning",
    category: "home-cleaning",
    price: 999,
    duration: 180,
    description: "Professional cleaning of overhead and underground water tanks",
    image: "https://images.unsplash.com/photo-1509886246223-cd7fd68f5372",
    features: ["Deep cleaning", "Sanitization", "Safety equipment"]
  },
  {
    title: "Drain Unclogging",
    category: "home-repair",
    price: 799,
    duration: 90,
    description: "Clear blocked drains and pipes using professional equipment",
    image: "https://images.unsplash.com/photo-1603815211005-3d9edec72049",
    features: ["High-pressure cleaning", "Professional tools", "Quick service"]
  },
  {
    title: "Water Heater Installation",
    category: "home-repair",
    price: 1499,
    duration: 210,
    description: "Installation of new water heaters with safety checks",
    image: "https://images.unsplash.com/photo-1632576201861-28d241b46ceb",
    features: ["Safety testing", "Professional installation", "Warranty support"]
  },
  {
    title: "Switchboard Repair",
    category: "home-repair",
    price: 699,
    duration: 90,
    description: "Fixing faulty switches, circuit breakers and fuse boxes",
    image: "https://images.unsplash.com/photo-1623707430101-9e74cefe05e2",
    features: ["Safety checks", "Quality parts", "Expert electricians"]
  },
  {
    title: "Wiring Installation",
    category: "home-repair",
    price: 1999,
    duration: 300,
    description: "Complete wiring installation for new construction or renovation",
    image: "https://images.unsplash.com/photo-1650322376275-09fc5c420a5e",
    features: ["Safety standards", "Quality materials", "Professional work"]
  },
  {
    title: "Light Fixture Installation",
    category: "home-repair",
    price: 399,
    duration: 45,
    description: "Installation of ceiling lights, chandeliers, and wall lights",
    image: "https://images.unsplash.com/photo-1565874322538-cefe281fd9ed",
    features: ["Safe installation", "Expert service", "All fixture types"]
  },
  {
    title: "Men's Haircut",
    category: "men-salon",
    price: 199,
    duration: 30,
    description: "Professional haircut with styling for men",
    image: "https://images.unsplash.com/photo-1514336937476-a5b961020a5c",
    features: ["Styling", "Hair wash", "Professional tools"]
  },
  {
    title: "Men's Shave & Beard Trim",
    category: "men-salon",
    price: 299,
    duration: 45,
    description: "Traditional shave with hot towel and beard grooming",
    image: "https://images.unsplash.com/photo-1654097803253-d481b6751f29",
    features: ["Hot towel service", "Premium products", "Precise trimming"]
  },
  {
    title: "Women's Haircut",
    category: "women-salon",
    price: 399,
    duration: 60,
    description: "Professional haircut with styling for women",
    image: "https://images.unsplash.com/photo-1562322140-8baeececf3df",
    features: ["Consultation", "Styling", "Premium products"]
  },
  {
    title: "Kitchen Deep Cleaning",
    category: "home-cleaning",
    price: 1299,
    duration: 210,
    description: "Complete kitchen cleaning including appliances, cabinets, etc.",
    image: "https://images.unsplash.com/photo-1737372805905-be0b91ec86fb",
    features: ["Deep cleaning", "Sanitization", "Eco-friendly products"]
  },
  {
    title: "Bathroom Deep Cleaning",
    category: "home-cleaning",
    price: 999,
    duration: 150,
    description: "Thorough bathroom cleaning including tiles, fixtures, etc.",
    image: "https://images.unsplash.com/photo-1711361234578-1845b58b20c0",
    features: ["Deep sanitization", "Tile cleaning", "Fixture polishing"]
  },
  {
    title: "Full Home Deep Cleaning",
    category: "home-cleaning",
    price: 3999,
    duration: 420,
    description: "Complete deep cleaning for entire home (2BHK)",
    image: "https://images.unsplash.com/photo-1572229798801-f71d3737680a",
    features: ["Complete cleaning", "All rooms covered", "Premium products"]
  },
  {
    title: "Smart Home Setup",
    category: "smart-home",
    price: 2499,
    duration: 240,
    description: "Installation and configuration of smart home devices",
    image: "https://images.unsplash.com/photo-1647077341225-04c8b49ed74d",
    features: ["Device setup", "Network configuration", "App setup"]
  },
  {
    title: "RO Service",
    category: "ro-purifier",
    price: 599,
    duration: 90,
    description: "RO water purifier servicing and filter replacement",
    image: "https://images.unsplash.com/photo-1665074208264-235604aa4187",
    features: ["Filter replacement", "Quality check", "Performance testing"]
  },
  {
    title: "AC Service",
    category: "appliance-service",
    price: 799,
    duration: 90,
    description: "Complete AC servicing including gas refill and cleaning",
    image: "https://images.unsplash.com/photo-1709432767122-d3cb5326911a",
    features: ["Gas check", "Deep cleaning", "Performance optimization"]
  }
];

const seedDB = async () => {
  try {
    // Connect to database
    await connectDB();
    console.log('Connected to database');

    // Delete existing services
    await Service.deleteMany({});
    console.log('Deleted existing services');

    // Insert new services
    const createdServices = await Service.insertMany(services);
    console.log(`Added ${createdServices.length} services to the database`);

    // Close database connection
    await mongoose.connection.close();
    console.log('Database connection closed');

  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDB();