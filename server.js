require('dotenv').config();
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const path = require('path');

const chatRoutes = require('./routes/chat');
const { getBotResponse, getSmartReplies } = require('./ai/brain');

const app = express();
const server = http.createServer(app);

// ─── SOCKET.IO (real-time) ───────────────────────────
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

// ─── MIDDLEWARE ──────────────────────────────────────
app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Rate limiting - prevent abuse
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 60,
  message: { error: 'Too many requests, please slow down.' }
});
app.use('/api/', limiter);

// ─── REST API ROUTES ─────────────────────────────────
app.use('/api', chatRoutes);

// Health check (Render.com needs this)
app.get('/health', (req, res) => {
  res.json({ status: 'ok', bot: 'Chatterbot', app: 'ChatterApp', uptime: process.uptime() });
});

// Serve chat UI
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ─── SOCKET.IO REAL-TIME CHAT ────────────────────────
let onlineUsers = 0;

io.on('connection', (socket) => {
  onlineUsers++;
  io.emit('online_count', onlineUsers);
  console.log(`✅ User connected: ${socket.id} | Online: ${onlineUsers}`);

  // Send welcome message on connect
  socket.emit('bot_message', {
    id: Date.now(),
    text: `👋 Hey! I'm **Chatterbot**, ChatterApp's AI assistant.\n\nI can help you with questions about ChatterApp, suggest replies, or just have a chat! What can I do for you?`,
    time: new Date().toISOString(),
    quickReplies: ['What is ChatterApp?', 'How do I sign up?', 'Is it free?', 'Download APK']
  });

  // Handle incoming message
  socket.on('user_message', (data) => {
    const { text, userId } = data;
    if (!text || text.trim().length === 0) return;
    if (text.length > 500) {
      socket.emit('bot_message', {
        id: Date.now(),
        text: "Please keep messages under 500 characters! 😊",
        time: new Date().toISOString(),
        quickReplies: getSmartReplies()
      });
      return;
    }

    console.log(`📨 [${userId || 'anon'}]: ${text}`);

    // Simulate typing delay (makes it feel natural)
    socket.emit('bot_typing', true);
    const delay = 600 + Math.floor(Math.random() * 900);

    setTimeout(() => {
      socket.emit('bot_typing', false);
      const response = getBotResponse(text);
      socket.emit('bot_message', {
        id: Date.now(),
        text: response,
        time: new Date().toISOString(),
        quickReplies: getSmartReplies(text)
      });
    }, delay);
  });

  // Handle disconnect
  socket.on('disconnect', () => {
    onlineUsers = Math.max(0, onlineUsers - 1);
    io.emit('online_count', onlineUsers);
    console.log(`❌ User disconnected: ${socket.id} | Online: ${onlineUsers}`);
  });
});

// ─── START SERVER ────────────────────────────────────
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`\n🚀 Chatterbot AI server running on port ${PORT}`);
  console.log(`🌐 Visit: http://localhost:${PORT}`);
  console.log(`📡 API: http://localhost:${PORT}/api/chat\n`);
});
