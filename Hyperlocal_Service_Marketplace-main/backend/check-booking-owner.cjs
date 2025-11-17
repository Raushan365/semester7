const http = require('http');

// Check who owns booking 6907e12ce2b4fd65c8e515da
http.get({
  hostname: 'localhost',
  port: 5000,
  path: '/api/admin/bookings',
  headers: {
    Cookie: 'token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5MWFlZGEyMzYwMWRiMmMxYmI3OTUyNiIsImlhdCI6MTc2MzM3MjU4NCwiZXhwIjoxNzYzOTc3Mzg0fQ.afi0EQiRU1XPmYjK2SG-kFkAQp7reZhSNI4QR7APEWU'
  }
}, (res) => {
  let data = '';
  res.on('data', (chunk) => data += chunk);
  res.on('end', () => {
    const result = JSON.parse(data);
    const booking = result.bookings?.find(b => b._id === '6907e12ce2b4fd65c8e515da');
    if (booking) {
      console.log('Booking found:');
      console.log('  ID:', booking._id);
      console.log('  Status:', booking.status);
      console.log('  User ID:', booking.user._id);
      console.log('  User Name:', booking.user.name);
      console.log('  User Email:', booking.user.email);
      console.log('  Amount:', booking.totalAmount);
    } else {
      console.log('Booking not found');
    }
  });
});
