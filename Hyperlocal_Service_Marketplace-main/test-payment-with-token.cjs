const http = require('http');

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
    'Cookie': `token=${userToken}`
  }
};

console.log('🧪 Testing payment with your token...\n');

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
