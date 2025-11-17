import net from 'net';

const host = '34.93.84.110';
const port = 27017;

const socket = new net.Socket();
socket.setTimeout(5000);

socket.on('connect', () => {
  console.log(`Connected to ${host}:${port}`);
  socket.destroy();
});

socket.on('timeout', () => {
  console.error('Connection timed out');
  socket.destroy();
});

socket.on('error', (err) => {
  console.error('Connection error:', err.message);
});

socket.connect(port, host);