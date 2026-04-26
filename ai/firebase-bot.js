// ════════════════════════════════════════════════════════════
//  ARIA - CHATTERAPP AI ASSISTANT
//  Connects to ChatterApp Firebase, listens for messages
//  and auto-replies using the AI brain
// ════════════════════════════════════════════════════════════

const https = require('https');
const http  = require('http');
const { getBotResponse, getSmartReplies } = require('./brain');

// ─── CONFIG ──────────────────────────────────────────────────
const FIREBASE_URL  = 'emxt-chatterapp-default-rtdb.firebaseio.com';
const BOT_PHONE     = 'aria'; // bot's phone number (no + sign)
const BOT_NAME      = 'Aria';
const POLL_INTERVAL = 4000; // check every 4 seconds

// Track which message keys we've already replied to
const repliedKeys = new Set();
// Track which conversations we're watching
const watchedConvos = new Set();

// ─── FIREBASE HELPERS ────────────────────────────────────────
function firebaseGet(path) {
  return new Promise((resolve) => {
    const options = {
      hostname: FIREBASE_URL,
      path: path + '.json',
      method: 'GET',
    };
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try { resolve(JSON.parse(data)); }
        catch { resolve(null); }
      });
    });
    req.on('error', () => resolve(null));
    req.setTimeout(8000, () => { req.destroy(); resolve(null); });
    req.end();
  });
}

function firebasePut(path, body) {
  return new Promise((resolve) => {
    const bodyStr = JSON.stringify(body);
    const options = {
      hostname: FIREBASE_URL,
      path: path + '.json',
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(bodyStr),
      },
    };
    const req = https.request(options, (res) => {
      res.on('data', () => {});
      res.on('end', () => resolve(true));
    });
    req.on('error', () => resolve(false));
    req.setTimeout(8000, () => { req.destroy(); resolve(false); });
    req.write(bodyStr);
    req.end();
  });
}

function firebasePost(path, body) {
  return new Promise((resolve) => {
    const bodyStr = JSON.stringify(body);
    const options = {
      hostname: FIREBASE_URL,
      path: path + '.json',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(bodyStr),
      },
    };
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(true));
    });
    req.on('error', () => resolve(false));
    req.setTimeout(8000, () => { req.destroy(); resolve(false); });
    req.write(bodyStr);
    req.end();
  });
}

// ─── GET CONVERSATION ID (matches Android logic) ─────────────
function getConversationId(phone1, phone2) {
  const a = phone1.replace(/[^0-9]/g, '');
  const b = phone2.replace(/[^0-9]/g, '');
  return a < b ? `${a}_${b}` : `${b}_${a}`;
}

// ─── REGISTER BOT IN FIREBASE ────────────────────────────────
async function registerBot() {
  console.log('🤖 Registering Chatterbot in Firebase...');
  const botUser = {
    name:     BOT_NAME,
    phone:    BOT_PHONE,
    verified: true,
    online:   true,
    lastSeen: Date.now(),
    isBot:    true,
  };
  await firebasePut(`/users/${BOT_PHONE}`, botUser);
  console.log(`✅ Chatterbot registered as +${BOT_PHONE}`);
}

// ─── KEEP BOT ONLINE (ping every 60s) ────────────────────────
async function keepOnline() {
  await firebasePut(`/users/${BOT_PHONE}/lastSeen`, Date.now());
  await firebasePut(`/users/${BOT_PHONE}/online`, true);
}

// ─── SEND A REPLY MESSAGE ─────────────────────────────────────
async function sendReply(conversationId, text) {
  const message = {
    sender:     BOT_PHONE,
    senderName: BOT_NAME,
    text:       text,
    time:       Date.now(),
    status:     'sent',
  };
  await firebasePost(`/messages/${conversationId}`, message);
  console.log(`💬 Replied in [${conversationId}]: ${text.substring(0, 60)}...`);
}

// ─── MARK MESSAGES AS SEEN ────────────────────────────────────
async function markSeen(conversationId, key, msg) {
  msg.status = 'seen';
  await firebasePut(`/messages/${conversationId}/${key}`, msg);
}

// ─── CHECK A SINGLE CONVERSATION FOR NEW MESSAGES ────────────
async function checkConversation(conversationId) {
  const messages = await firebaseGet(`/messages/${conversationId}`);
  if (!messages || typeof messages !== 'object') return;

  for (const [key, msg] of Object.entries(messages)) {
    // Skip if already handled
    if (repliedKeys.has(key)) continue;

    const sender = String(msg.sender || '').replace(/[^0-9]/g, '');
    const text   = msg.text || '';
    const time   = msg.time || 0;

    // Only reply to messages sent TO the bot (not from the bot)
    if (sender === BOT_PHONE) continue;

    // Only reply to messages in the last 5 minutes (avoid old messages on restart)
    const age = Date.now() - time;
    if (age > 5 * 60 * 1000) {
      repliedKeys.add(key); // mark old messages as seen so we skip them
      continue;
    }

    // Skip empty or media messages
    if (!text || text.trim() === '') {
      repliedKeys.add(key);
      continue;
    }

    // Mark as handled immediately to avoid double replies
    repliedKeys.add(key);

    console.log(`📨 New message from [${sender}]: ${text}`);

    // Mark as seen
    await markSeen(conversationId, key, msg);

    // Simulate typing delay (1–2.5 seconds)
    const delay = 1000 + Math.floor(Math.random() * 1500);
    setTimeout(async () => {
      const response = getBotResponse(text);
      await sendReply(conversationId, response);
    }, delay);
  }
}

// ─── DISCOVER ALL CONVERSATIONS WITH BOT ─────────────────────
async function discoverConversations() {
  const allMessages = await firebaseGet('/messages');
  if (!allMessages || typeof allMessages !== 'object') return;

  for (const convId of Object.keys(allMessages)) {
    // Bot is involved if the conversation ID contains the bot's phone
    if (convId.includes(BOT_PHONE)) {
      if (!watchedConvos.has(convId)) {
        watchedConvos.add(convId);
        console.log(`👁️  Watching conversation: ${convId}`);
      }
    }
  }
}

// ─── MAIN POLL LOOP ───────────────────────────────────────────
async function pollLoop() {
  try {
    // Discover new conversations every cycle
    await discoverConversations();

    // Check each known conversation
    for (const convId of watchedConvos) {
      await checkConversation(convId);
    }
  } catch (err) {
    console.error('Poll error:', err.message);
  }

  setTimeout(pollLoop, POLL_INTERVAL);
}

// ─── START THE BOT ────────────────────────────────────────────
async function startFirebaseBot() {
  console.log('\n🤖 Starting ChatterApp Firebase Bot...');
  console.log(`📱 Bot Phone: +${BOT_PHONE}`);
  console.log(`🔥 Firebase: ${FIREBASE_URL}\n`);

  await registerBot();

  // Keep bot online every 60 seconds
  setInterval(keepOnline, 60_000);

  // Start listening for messages
  pollLoop();

  console.log('✅ Chatterbot is now live inside ChatterApp!\n');
}

module.exports = { startFirebaseBot, BOT_PHONE, BOT_NAME };
