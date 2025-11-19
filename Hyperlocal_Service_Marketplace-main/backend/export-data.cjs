const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

const exportData = async () => {
  try {
    // Import models dynamically
    const User = (await import('./models/User.js')).default;
    const Service = (await import('./models/Service.js')).default;
    const Booking = (await import('./models/Booking.js')).default;
    const Cart = (await import('./models/Cart.js')).default;

    await connectDB();

    // Fetch all data from all collections
    const users = await User.find({}).lean();
    const services = await Service.find({}).lean();
    const bookings = await Booking.find({}).lean();
    const carts = await Cart.find({}).lean();

    const data = {
      users,
      services,
      bookings,
      carts,
      exportDate: new Date().toISOString(),
      exportCount: {
        users: users.length,
        services: services.length,
        bookings: bookings.length,
        carts: carts.length
      }
    };

    // Write to JSON file
    const filename = `database-export-${new Date().toISOString().split('T')[0]}.json`;
    const filepath = path.join(__dirname, filename);
    
    fs.writeFileSync(filepath, JSON.stringify(data, null, 2));
    
    console.log('\n✅ Data exported successfully!');
    console.log(`📄 File: ${filepath}`);
    console.log(`\nExport Summary:`);
    console.log(`  Users: ${data.exportCount.users}`);
    console.log(`  Services: ${data.exportCount.services}`);
    console.log(`  Bookings: ${data.exportCount.bookings}`);
    console.log(`  Carts: ${data.exportCount.carts}`);
    console.log(`  Exported: ${data.exportDate}`);

    await mongoose.connection.close();
  } catch (error) {
    console.error('Error exporting data:', error);
    process.exit(1);
  }
};

exportData();
