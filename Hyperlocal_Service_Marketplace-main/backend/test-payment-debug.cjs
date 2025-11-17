const http = require('http');

const testPayment = async () => {
  const data = JSON.stringify({
    bookingId: '6907e12ce2b4fd65c8e515da',
    amount: 1998
  });

  // You'll need to get the actual logged-in user's token from the browser
  // For now using the admin token - replace with actual user token
  const opts = {
    hostname: 'localhost',
    port: 5000,
    path: '/api/payment/create-session',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(data),
      // Get this token from browser DevTools -> Application -> Cookies
      'Cookie': 'token=YOUR_TOKEN_HERE'
    }
  };

  const req = http.request(opts, (res) => {
    console.log('Status:', res.statusCode);
    let d = '';
    res.on('data', (c) => d += c);
    res.on('end', () => {
      console.log('Response:', d);
    });
  });

  req.on('error', (e) => console.error('Error:', e.message));
  req.write(data);
  req.end();
};

testPayment();
