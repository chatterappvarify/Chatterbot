const express = require('express');
const router = express.Router();
const { getBotResponse, getSmartReplies } = require('../ai/brain');

// ─── POST /api/chat ──────────────────────────────────
// Used by Android app to send a message and get a response
router.post('/chat', (req, res) => {
  const { message, userId } = req.body;

  if (!message || message.trim().length === 0) {
    return res.status(400).json({ error: 'Message is required' });
  }
  if (message.length > 500) {
    return res.status(400).json({ error: 'Message too long (max 500 characters)' });
  }

  const response = getBotResponse(message);
  const quickReplies = getSmartReplies(message);

  return res.json({
    success: true,
    userId: userId || 'anonymous',
    message: message,
    response: response,
    quickReplies: quickReplies,
    timestamp: new Date().toISOString(),
    bot: 'Chatterbot'
  });
});

// ─── GET /api/greet ──────────────────────────────────
// Get the welcome message
router.get('/greet', (req, res) => {
  res.json({
    success: true,
    message: "👋 Hey! I'm **Chatterbot**, ChatterApp's AI assistant.\n\nAsk me anything about ChatterApp — features, how to sign up, downloading, and more!",
    quickReplies: ['What is ChatterApp?', 'How do I sign up?', 'Is it free?', 'Download APK'],
    bot: 'Chatterbot',
    timestamp: new Date().toISOString()
  });
});

// ─── GET /api/suggestions ────────────────────────────
// Get smart reply suggestions
router.get('/suggestions', (req, res) => {
  const { context } = req.query;
  res.json({
    success: true,
    suggestions: getSmartReplies(context || ''),
    timestamp: new Date().toISOString()
  });
});

// ─── GET /api/status ─────────────────────────────────
router.get('/status', (req, res) => {
  res.json({
    success: true,
    status: 'online',
    bot: 'Chatterbot',
    app: 'ChatterApp',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

module.exports = router;
