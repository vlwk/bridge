// Minimal Socket.IO server
// Run with: npm run socket

const http = require('http');
const { Server } = require('socket.io');

const PORT = process.env.SOCKET_PORT ? Number(process.env.SOCKET_PORT) : 4001;
const NEXT_ORIGIN = process.env.NEXT_ORIGIN || 'http://localhost:3000';

const server = http.createServer();
const io = new Server(server, {
  cors: {
    origin: [NEXT_ORIGIN],
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

io.on('connection', (socket) => {
  console.log(`[socket] connected ${socket.id}`);

  socket.on('room:join', ({ roomId } = {}) => {
    if (!roomId) return;
    const room = String(roomId);
    socket.join(room);
    console.log(`[socket] ${socket.id} joined room ${room}`);
  });

  socket.on('room:leave', ({ roomId } = {}) => {
    if (!roomId) return;
    const room = String(roomId);
    socket.leave(room);
    console.log(`[socket] ${socket.id} left room ${room}`);
  });

  socket.on('disconnect', (reason) => {
    console.log(`[socket] disconnected ${socket.id} (${reason})`);
  });
});

server.listen(PORT, () => {
  console.log(`[socket] server listening on :${PORT}`);
});
