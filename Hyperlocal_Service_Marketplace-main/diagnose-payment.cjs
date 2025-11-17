const http = require('http');

console.log('🔍 Payment Issue Diagnostic Tool\n');
console.log('This will help us identify the exact problem.\n');

// Step 1: Check if backend is running
function checkBackend() {
  return new Promise((resolve, reject) => {
    console.log('1️⃣ Checking if backend is running...');
    const req = http.get('http://localhost:5000/', (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        console.log('   ✅ Backend is running\n');
        resolve();
      });
    });
    req.on('error', (err) => {
      console.log('   ❌ Backend is NOT running!');
      console.log('   Please start backend with: cd backend && npm run dev\n');
      reject(err);
    });
  });
}

// Step 2: Check booking details
function checkBooking(adminToken) {
  return new Promise((resolve, reject) => {
    console.log('2️⃣ Fetching booking details...');
    const req = http.get({
      hostname: 'localhost',
      port: 5000,
      path: '/api/admin/bookings',
      headers: { 'Cookie': `token=${adminToken}` }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const response = JSON.parse(data);
          if (response.bookings && response.bookings.length > 0) {
            const targetBooking = response.bookings.find(b => b._id === '6907e12ce2b4fd65c8e515da');
            if (targetBooking) {
              console.log('   📋 Booking Details:');
              console.log('      ID:', targetBooking._id);
              console.log('      Status:', targetBooking.status);
              console.log('      Payment Status:', targetBooking.paymentStatus);
              console.log('      Amount:', targetBooking.totalAmount);
              console.log('      Owner ID:', targetBooking.user?._id);
              console.log('      Owner Name:', targetBooking.user?.name);
              console.log('      Owner Email:', targetBooking.user?.email);
              console.log('');
              resolve(targetBooking);
            } else {
              console.log('   ⚠️  Booking 6907e12ce2b4fd65c8e515da not found in admin bookings');
              resolve(null);
            }
          } else {
            console.log('   ⚠️  No bookings found');
            resolve(null);
          }
        } catch (e) {
          console.log('   ❌ Error parsing response:', e.message);
          reject(e);
        }
      });
    });
    req.on('error', reject);
  });
}

// Step 3: Test payment with user's token
function testPayment(userToken, bookingId, amount) {
  return new Promise((resolve, reject) => {
    console.log('3️⃣ Testing payment session creation...');
    console.log('   Using booking ID:', bookingId);
    console.log('   Amount:', amount);
    
    const postData = JSON.stringify({ bookingId, amount });
    
    const options = {
      hostname: 'localhost',
      port: 5000,
      path: '/api/payment/create-session',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData),
        'Cookie': `token=${userToken}`
      }
    };
    
    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        console.log('   Response Status:', res.statusCode);
        console.log('   Response:', data);
        
        if (res.statusCode === 200) {
          try {
            const parsed = JSON.parse(data);
            if (parsed.url) {
              console.log('   ✅ SUCCESS! Payment session created');
              console.log('   Stripe URL:', parsed.url);
            }
          } catch (e) {
            console.log('   ⚠️  Could not parse response');
          }
        } else {
          console.log('   ❌ ERROR! Status:', res.statusCode);
          try {
            const parsed = JSON.parse(data);
            if (parsed.error) console.log('   Error:', parsed.error);
            if (parsed.message) console.log('   Message:', parsed.message);
            if (parsed.details) console.log('   Details:', parsed.details);
          } catch (e) {
            // Response is not JSON
          }
        }
        console.log('');
        resolve({ status: res.statusCode, data });
      });
    });
    
    req.on('error', (err) => {
      console.log('   ❌ Request failed:', err.message);
      reject(err);
    });
    
    req.write(postData);
    req.end();
  });
}

// Main execution
async function diagnose() {
  try {
    // Admin token from previous tests
    const adminToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OTFhZWRhMjM2MDFkYjJjMWJiNzk1MjYiLCJpYXQiOjE3MzE4MzM3NjIsImV4cCI6MTczMjQzODU2Mn0.FfIAKAUa4wZo-G9pwnjbB1g8fQZMxZv2LpNDp8_qZR4';
    
    await checkBackend();
    const booking = await checkBooking(adminToken);
    
    if (!booking) {
      console.log('⚠️  Cannot proceed without booking information');
      return;
    }
    
    console.log('━'.repeat(60));
    console.log('🎯 INSTRUCTIONS TO FIX:');
    console.log('━'.repeat(60));
    console.log('\n📝 TO TEST PAYMENT, you need to:');
    console.log('\n1. Open browser where you\'re logged in');
    console.log('2. Press F12 → Application tab → Cookies → localhost:5173');
    console.log('3. Copy the "token" cookie value');
    console.log('4. Replace TOKEN_HERE in the command below with your token:\n');
    console.log('   node test-payment-with-token.cjs TOKEN_HERE\n');
    
    console.log('🔑 IMPORTANT: You must be logged in as:');
    console.log('   Email:', booking.user?.email);
    console.log('   Name:', booking.user?.name);
    console.log('\n   If you\'re logged in as a different user, the payment will fail!');
    console.log('\n💡 To login as this user, logout and login with:');
    console.log('   Email:', booking.user?.email);
    console.log('   (You need to know the password for this account)\n');
    
  } catch (error) {
    console.error('❌ Diagnostic failed:', error.message);
  }
}

// Create a companion script for token-based testing
const tokenTestScript = `const http = require('http');

const userToken = process.argv[2];

if (!userToken) {
  console.error('❌ Please provide token as argument:');
  console.error('   node test-payment-with-token.cjs YOUR_TOKEN_HERE');
  process.exit(1);
}

const bookingId = '6907e12ce2b4fd65c8e515da';
const amount = 1998;

const postData = JSON.stringify({ bookingId, amount });

const options = {
  hostname: 'localhost',
  port: 5000,
  path: '/api/payment/create-session',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(postData),
    'Cookie': \`token=\${userToken}\`
  }
};

console.log('🧪 Testing payment with your token...\\n');

const req = http.request(options, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('Status Code:', res.statusCode);
    console.log('Response Body:', data);
    console.log('');
    
    if (res.statusCode === 200) {
      const parsed = JSON.parse(data);
      console.log('✅ SUCCESS! Stripe URL:', parsed.url);
    } else {
      console.log('❌ FAILED!');
      try {
        const parsed = JSON.parse(data);
        console.log('Error:', parsed.error);
        console.log('Message:', parsed.message);
      } catch (e) {}
    }
  });
});

req.on('error', (error) => {
  console.error('Request failed:', error.message);
});

req.write(postData);
req.end();
`;

require('fs').writeFileSync(
  __dirname + '/test-payment-with-token.cjs',
  tokenTestScript
);

diagnose();
