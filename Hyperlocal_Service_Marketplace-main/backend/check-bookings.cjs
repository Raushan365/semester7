const http = require('http');

http.get({
  hostname: 'localhost',
  port: 5000,
  path: '/api/bookings/user',
  headers: {
    Cookie: 'token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5MWFlZmEwN2FiZDVlMWMyZTNiMjM3ZCIsImlhdCI6MTc2MzM3Mjk2MCwiZXhwIjoxNzYzOTc3NzYwfQ.yfWHcvUPEaFPheJseg4eci7K3OIuF9SLoxpYPJ4NRQI'
  }
}, (res) => {
  let data = '';
  res.on('data', (chunk) => data += chunk);
  res.on('end', () => {
    const bookings = JSON.parse(data);
    console.log('Total bookings:', bookings.length);
    bookings.forEach((b, i) => {
      console.log(`\nBooking ${i + 1}:`);
      console.log('  ID:', b._id);
      console.log('  Status:', b.status);
      console.log('  Payment Status:', b.paymentStatus);
      console.log('  Service:', b.service?.title || 'N/A');
      console.log('  Amount:', b.totalAmount);
    });
  });
});
