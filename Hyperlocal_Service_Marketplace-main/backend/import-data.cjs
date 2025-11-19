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

const importData = async (filename) => {
  try {
    // Import models dynamically
    const User = (await import('./models/User.js')).default;
    const Service = (await import('./models/Service.js')).default;
    const Booking = (await import('./models/Booking.js')).default;
    const Cart = (await import('./models/Cart.js')).default;

    await connectDB();

    if (!filename) {
      // Find the most recent export file
      const files = fs.readdirSync(__dirname).filter(f => f.startsWith('database-export-') && f.endsWith('.json'));
      if (files.length === 0) {
        throw new Error('No export files found. Run export-data.cjs first.');
      }
      filename = files.sort().pop(); // Get the most recent file
    }

    const filepath = path.join(__dirname, filename);
    
    if (!fs.existsSync(filepath)) {
      throw new Error(`File not found: ${filepath}`);
    }

    console.log(`📂 Importing from: ${filename}`);
    
    const data = JSON.parse(fs.readFileSync(filepath, 'utf8'));

    // Clear existing collections
    console.log('\n🗑️  Clearing existing data...');
    await User.deleteMany({});
    await Service.deleteMany({});
    await Booking.deleteMany({});
    await Cart.deleteMany({});

    // Import data
    console.log('\n📥 Importing data...');
    
    if (data.users && data.users.length > 0) {
      await User.insertMany(data.users);
      console.log(`  ✓ Imported ${data.users.length} users`);
    }

    if (data.services && data.services.length > 0) {
      await Service.insertMany(data.services);
      console.log(`  ✓ Imported ${data.services.length} services`);
    }

    if (data.bookings && data.bookings.length > 0) {
      await Booking.insertMany(data.bookings);
      console.log(`  ✓ Imported ${data.bookings.length} bookings`);
    }

    if (data.carts && data.carts.length > 0) {
      await Cart.insertMany(data.carts);
      console.log(`  ✓ Imported ${data.carts.length} carts`);
    }

    console.log('\n✅ Data imported successfully!');
    console.log(`📊 Import Summary:`);
    console.log(`  Users: ${data.exportCount?.users || data.users?.length || 0}`);
    console.log(`  Services: ${data.exportCount?.services || data.services?.length || 0}`);
    console.log(`  Bookings: ${data.exportCount?.bookings || data.bookings?.length || 0}`);
    console.log(`  Carts: ${data.exportCount?.carts || data.carts?.length || 0}`);
    console.log(`  Original Export: ${data.exportDate}`);

    await mongoose.connection.close();
  } catch (error) {
    console.error('❌ Error importing data:', error.message);
    process.exit(1);
  }
};

// Get filename from command line arguments
const filename = process.argv[2];
importData(filename);
