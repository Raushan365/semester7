const http = require('http');

// Replace with your actual token from browser cookies
const userToken = 'YOUR_TOKEN_FROM_BROWSER_COOKIES_HERE';
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

console.log('Testing payment session creation...');
console.log('Booking ID:', bookingId);
console.log('Amount:', amount);

const req = http.request(options, (res) => {
  console.log('\nResponse Status:', res.statusCode);
  console.log('Response Headers:', res.headers);
  
  let responseData = '';
  
  res.on('data', (chunk) => {
    responseData += chunk;
  });
  
  res.on('end', () => {
    console.log('\nResponse Body:', responseData);
    
    try {
      const parsed = JSON.parse(responseData);
      if (parsed.url) {
        console.log('\n✅ SUCCESS! Stripe checkout URL:', parsed.url);
      } else if (parsed.error) {
        console.log('\n❌ ERROR:', parsed.error);
        if (parsed.message) console.log('Message:', parsed.message);
        if (parsed.details) console.log('Details:', parsed.details);
      }
    } catch (e) {
      console.log('Could not parse JSON response');
    }
  });
});

req.on('error', (error) => {
  console.error('Request failed:', error.message);
});

req.write(postData);
req.end();
