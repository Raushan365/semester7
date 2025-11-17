console.log('🧪 Complete Payment Flow Test\n');

const http = require('http');

// Test 1: Check who is logged in with a token
function checkAuth(token) {
  return new Promise((resolve) => {
    console.log('1️⃣ Checking authentication...');
    const req = http.get({
      hostname: 'localhost',
      port: 5000,
      path: '/api/user/is-auth',
      headers: { 'Cookie': `token=${token}` }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode === 200) {
          try {
            const user = JSON.parse(data);
            console.log('   ✅ Logged in as:', user.email || user.userId);
            console.log('   User ID:', user.userId);
            console.log('');
            resolve(user);
          } catch (e) {
            console.log('   ⚠️  Could not parse user data');
            resolve(null);
          }
        } else {
          console.log('   ❌ Not authenticated (status:', res.statusCode, ')');
          console.log('');
          resolve(null);
        }
      });
    });
    req.on('error', () => {
      console.log('   ❌ Auth check failed');
      resolve(null);
    });
  });
}

// Test 2: Get bookings for this user
function getUserBookings(token) {
  return new Promise((resolve) => {
    console.log('2️⃣ Fetching your bookings...');
    const req = http.get({
      hostname: 'localhost',
      port: 5000,
      path: '/api/bookings/user',
      headers: { 'Cookie': `token=${token}` }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const bookings = JSON.parse(data);
          if (Array.isArray(bookings) && bookings.length > 0) {
            console.log(`   Found ${bookings.length} booking(s):\n`);
            bookings.forEach((b, i) => {
              console.log(`   Booking ${i + 1}:`);
              console.log(`      ID: ${b._id}`);
              console.log(`      Status: ${b.status}`);
              console.log(`      Payment: ${b.paymentStatus}`);
              console.log(`      Amount: ${b.totalAmount}`);
              console.log('');
            });
            resolve(bookings);
          } else {
            console.log('   No bookings found for this user\n');
            resolve([]);
          }
        } catch (e) {
          console.log('   ⚠️  Error fetching bookings');
          resolve([]);
        }
      });
    });
    req.on('error', () => resolve([]));
  });
}

// Main test
async function runTest() {
  console.log('━'.repeat(60));
  console.log('INSTRUCTIONS:');
  console.log('━'.repeat(60));
  console.log('1. Open your browser where you have the app open');
  console.log('2. Press F12 to open DevTools');
  console.log('3. Go to Application tab → Cookies → localhost:5173 (or localhost:5000)');
  console.log('4. Copy the value of the "token" cookie');
  console.log('5. Run: node test-full-flow.cjs YOUR_TOKEN_HERE\n');
  console.log('━'.repeat(60));
  console.log('');
  
  const token = process.argv[2];
  
  if (!token) {
    console.log('❌ No token provided. Please run:');
    console.log('   node test-full-flow.cjs YOUR_TOKEN_HERE\n');
    return;
  }
  
  console.log('Testing with provided token...\n');
  
  const user = await checkAuth(token);
  if (!user) {
    console.log('❌ Token is invalid or expired. Please login again and get a new token.\n');
    return;
  }
  
  const bookings = await getUserBookings(token);
  
  const targetBooking = bookings.find(b => b._id === '6907e12ce2b4fd65c8e515da');
  
  if (targetBooking) {
    console.log('✅ Found the booking you\'re trying to pay for!');
    console.log('   This means you ARE the owner of this booking.\n');
    console.log('   The 500 error is likely a Stripe API issue.');
    console.log('   Check the backend terminal logs for "Checkout Session Error"\n');
  } else if (bookings.length > 0) {
    console.log('⚠️  The booking 6907e12ce2b4fd65c8e515da does NOT belong to you.');
    console.log('   You cannot pay for someone else\'s booking.\n');
    console.log('   Instead, try paying for one of YOUR bookings listed above.\n');
  } else {
    console.log('⚠️  You have no bookings yet.');
    console.log('   Please create a booking first before trying to pay.\n');
  }
}

runTest();
