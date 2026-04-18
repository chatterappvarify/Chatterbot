# 🤖 Chatterbot — ChatterApp AI Backend

Chatterbot is the AI assistant for ChatterApp. It runs on Node.js and supports real-time chat via Socket.IO and a REST API for Android app integration.

---

## 📁 Project Structure

```
chatterbot/
├── server.js           ← Main server entry point
├── package.json        ← Dependencies
├── .env.example        ← Environment variables template
├── .gitignore
├── ai/
│   └── brain.js        ← All AI knowledge & response logic
├── routes/
│   └── chat.js         ← REST API routes
└── public/
    └── index.html      ← Chat UI (served at /)
```

---

## 🚀 Deploy to Render.com (Step by Step)

### Step 1 — Push to GitHub
1. Create a new repository on github.com
2. Name it `chatterbot` (or anything you like)
3. Upload all these files to the repository

### Step 2 — Deploy on Render
1. Go to render.com and sign in
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. Fill in the settings:
   - **Name:** chatterbot
   - **Environment:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `node server.js`
5. Click **"Create Web Service"**
6. Wait ~2 minutes for it to deploy
7. Your AI will be live at: `https://chatterbot.onrender.com`

---

## 🌐 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/chat | Send a message, get AI response |
| GET | /api/greet | Get welcome message |
| GET | /api/suggestions | Get smart reply suggestions |
| GET | /api/status | Check if bot is online |
| GET | /health | Server health check |

### Example: Send a message
```
POST /api/chat
Content-Type: application/json

{
  "message": "What is ChatterApp?",
  "userId": "user123"
}
```

### Response:
```json
{
  "success": true,
  "response": "📱 ChatterApp is a free Android messaging app...",
  "quickReplies": ["How to sign up?", "Is it free?", "Download APK"],
  "timestamp": "2026-04-18T12:00:00.000Z",
  "bot": "Chatterbot"
}
```

---

## 📱 Android App Integration

Call the API from your Android app:
```
POST https://chatterbot.onrender.com/api/chat
```

---

## 💻 Run Locally

```bash
# Install dependencies
npm install

# Copy env file
cp .env.example .env

# Start server
npm start

# Or with auto-reload (development)
npm run dev
```

Visit: http://localhost:3000

---

## ✏️ Customize the AI

To add new knowledge to Chatterbot, open `ai/brain.js` and add a new entry:

```javascript
{
  tag: 'your_topic',
  patterns: ['keyword1', 'keyword2', 'phrase to match'],
  responses: [
    "Your response here!"
  ]
},
```

---

Made with ❤️ for ChatterApp · chatterapp.online
