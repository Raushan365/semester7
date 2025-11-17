const http = require('http');

const testPayment = async () => {
  const data = JSON.stringify({
    bookingId: '691aefc37abd5e1c2e3b239b',
    amount: 1299
  });

  const opts = {
    hostname: 'localhost',
    port: 5000,
    path: '/api/payment/create-session',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(data),
      'Cookie': 'token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5MWFlZmEwN2FiZDVlMWMyZTNiMjM3ZCIsImlhdCI6MTc2MzM3Mjk2MCwiZXhwIjoxNzYzOTc3NzYwfQ.yfWHcvUPEaFPheJseg4eci7K3OIuF9SLoxpYPJ4NRQI'
    }
  };

  const req = http.request(opts, (res) => {
    console.log('Payment status:', res.statusCode);
    let d = '';
    res.on('data', (c) => d += c);
    res.on('end', () => {
      try {
        const json = JSON.parse(d);
        console.log('Has Stripe URL:', !!json.url);
        if (json.url) {
          console.log('Stripe URL:', json.url.substring(0, 80) + '...');
        }
        if (json.error) {
          console.log('Error:', json.error);
          if (json.message) console.log('Message:', json.message);
        }
      } catch (e) {
        console.log('Response:', d);
      }
    });
  });

  req.on('error', (e) => console.error('ERR', e.message));
  req.write(data);
  req.end();
};

testPayment();
