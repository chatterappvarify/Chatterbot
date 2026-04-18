// ════════════════════════════════════════════════
//  CHATTERBOT AI BRAIN
//  All knowledge, pattern matching & responses
// ════════════════════════════════════════════════

const knowledge = [
  // ── GREETINGS ──────────────────────────────────
  {
    tag: 'greeting',
    patterns: ['hi','hello','hey','hii','helo','howdy','sup','yo','what\'s up','whats up','good morning','good afternoon','good evening','morning','afternoon','evening'],
    responses: [
      "Hey there! 👋 Great to see you! How can I help you today?",
      "Hello! 😊 I'm Aria, your ChatterApp assistant. What can I do for you?",
      "Hi! 👋 Welcome to ChatterApp support. What would you like to know?",
      "Hey! 😄 I'm here to help. Ask me anything about ChatterApp!"
    ]
  },

  // ── FAREWELLS ──────────────────────────────────
  {
    tag: 'farewell',
    patterns: ['bye','goodbye','see you','cya','later','take care','goodnight','good night','farewell','ttyl','peace out'],
    responses: [
      "Goodbye! 👋 Feel free to come back anytime. Have a great day! 😊",
      "See you later! 👋 Don't hesitate to reach out if you need help!",
      "Take care! 😊 ChatterApp is always here for you!"
    ]
  },

  // ── ABOUT CHATTERAPP ───────────────────────────
  {
    tag: 'about',
    patterns: ['what is chatterapp','tell me about chatterapp','what does chatterapp do','about chatterapp','describe chatterapp','explain chatterapp','chatterapp meaning'],
    responses: [
      "📱 **ChatterApp** is a free Android messaging app that lets you chat with anyone using just your phone number.\n\n✅ No ads\n✅ No subscriptions\n✅ No email required\n✅ Fast & simple\n\nDownload it now at **chatterapp.online**!"
    ]
  },

  // ── SIGN UP / REGISTER ─────────────────────────
  {
    tag: 'signup',
    patterns: ['how to sign up','how do i register','create account','how to create','sign up','register','make account','get started','new account','create profile'],
    responses: [
      "✅ **Creating your ChatterApp account is easy!**\n\n1️⃣ Download the APK from chatterapp.online\n2️⃣ Open the app\n3️⃣ Enter your name\n4️⃣ Select your country\n5️⃣ Enter your phone number\n6️⃣ Enter the 6-digit SMS code\n7️⃣ Set up your profile\n🎉 Start chatting!"
    ]
  },

  // ── FREE / PRICE ───────────────────────────────
  {
    tag: 'pricing',
    patterns: ['free','cost','price','paid','subscription','how much','money','charge','fee','pay','purchase'],
    responses: [
      "💰 ChatterApp is **100% FREE!**\n\nNo hidden fees, no ads, no subscription. Free forever. 🎉\n\nJust download and start chatting!"
    ]
  },

  // ── DOWNLOAD ───────────────────────────────────
  {
    tag: 'download',
    patterns: ['download','apk','install','get the app','where to download','how to install','get app','download link','where can i get','get chatterapp'],
    responses: [
      "📥 **Download ChatterApp for free!**\n\n👉 Visit: **chatterapp.online**\n\n1. Tap Download APK\n2. Open the downloaded file\n3. Enable 'Install from unknown sources' if asked\n4. Tap Install\n\nRequires Android 5.0+"
    ]
  },

  // ── HOW TO CHAT ────────────────────────────────
  {
    tag: 'how_to_chat',
    patterns: ['how does it work','how to use','how to chat','send message','start chatting','how to send','start conversation','begin chat','open chat'],
    responses: [
      "💬 **Using ChatterApp is super easy!**\n\n1. Open ChatterApp\n2. Tap the ✏️ pencil icon\n3. Enter a phone number\n4. Start chatting instantly!\n\nNo need to add contacts manually — just enter any number and go!"
    ]
  },

  // ── SECURITY / PRIVACY ─────────────────────────
  {
    tag: 'security',
    patterns: ['safe','secure','privacy','data','private','trust','personal info','information','hack','safe to use','is it safe'],
    responses: [
      "🔒 **Your privacy matters to us!**\n\n• Account verified by phone number only\n• No email required\n• We don't sell your data\n• No ads that track you\n• Your conversations are yours\n\nChatterApp is built with your privacy in mind. ✅"
    ]
  },

  // ── NOTIFICATIONS ──────────────────────────────
  {
    tag: 'notifications',
    patterns: ['notification','notify','alert','not getting notified','push notification','message alert','sound','vibration'],
    responses: [
      "🔔 **ChatterApp Notifications:**\n\n• You get instant alerts for new messages\n• Control sound & vibration in Settings\n• Make sure notifications are enabled for ChatterApp in your phone's app settings\n\nNot receiving notifications? Go to Phone Settings → Apps → ChatterApp → Notifications → Enable All"
    ]
  },

  // ── ANDROID / COMPATIBILITY ────────────────────
  {
    tag: 'compatibility',
    patterns: ['android','ios','iphone','apple','samsung','phone','compatible','supported','what phones','what devices','work on'],
    responses: [
      "📱 **Device Compatibility:**\n\n✅ Android 5.0 and above\n✅ Works on Samsung, Huawei, Xiaomi, Tecno, and all Android phones\n⏳ iPhone/iOS — coming in a future update!\n\nMost Android phones from 2015 onwards are supported."
    ]
  },

  // ── FEATURES ───────────────────────────────────
  {
    tag: 'features',
    patterns: ['features','what can it do','capabilities','what does it have','functions','what features','tell me features'],
    responses: [
      "✨ **ChatterApp Features:**\n\n💬 Real-time instant messaging\n🔒 Phone number verification\n🆓 100% free — no ads\n🔔 Smart push notifications\n📱 Works on all Android phones\n👤 Custom profile & status\n📢 Channels & Studio (coming soon!)\n📞 Voice & Video calls (coming soon!)\n\nMore features added regularly! 🚀"
    ]
  },

  // ── COMING SOON ────────────────────────────────
  {
    tag: 'coming_soon',
    patterns: ['channel','studio','group','voice call','video call','group chat','voice','video','future','upcoming','roadmap'],
    responses: [
      "🚀 **Coming Soon to ChatterApp:**\n\n📢 Channels — broadcast to followers\n🎬 Studio — content creation tools\n👥 Group chats\n📞 Voice calls\n📹 Video calls\n\nStay tuned for updates at chatterapp.online!"
    ]
  },

  // ── VERSION / UPDATE ───────────────────────────
  {
    tag: 'version',
    patterns: ['update','version','latest','new version','current version','which version','how to update'],
    responses: [
      "🆕 **Current Version: ChatterApp v1.0.0**\n\nTo update:\n1. Visit chatterapp.online\n2. Download the latest APK\n3. Install over the existing app\n\nYour data and chats are preserved during updates! ✅"
    ]
  },

  // ── SUPPORT / CONTACT ──────────────────────────
  {
    tag: 'support',
    patterns: ['contact','support','help','problem','issue','bug','report','not working','error','crash','fix'],
    responses: [
      "🛠️ **Need Help?**\n\n• 🌐 Visit: **chatterapp.online**\n• ❓ FAQ: **faq.chatterapp.online**\n• 📧 Contact us through the website\n\nDescribe your issue and our team will help ASAP! We usually respond within 24 hours. 💪"
    ]
  },

  // ── FAQ ────────────────────────────────────────
  {
    tag: 'faq',
    patterns: ['faq','frequently asked','common questions','common question'],
    responses: [
      "❓ **Frequently Asked Questions:**\n\nVisit our full FAQ page:\n👉 **faq.chatterapp.online**\n\nOr ask me anything directly — I know everything about ChatterApp! 😄"
    ]
  },

  // ── SMART REPLY SUGGESTIONS ────────────────────
  {
    tag: 'smart_reply',
    patterns: ['suggest','suggestion','smart reply','reply suggestion','what to reply','how to reply','reply ideas'],
    responses: [
      "💡 **Smart Reply Suggestions:**\n\nHere are some quick replies you can use:\n✅ \"Got it, thanks!\"\n✅ \"I'll get back to you soon\"\n✅ \"Sounds good!\"\n✅ \"Can we talk later?\"\n✅ \"On my way! 🚀\"\n✅ \"Sure thing!\"\n✅ \"Let me check and get back to you\""
    ]
  },

  // ── WHO MADE ───────────────────────────────────
  {
    tag: 'developer',
    patterns: ['who made','developer','creator','who built','team','who created','made by','built by'],
    responses: [
      "👨‍💻 ChatterApp was built by a passionate independent developer who believes communication should be free and simple for everyone.\n\nMore info at chatterapp.online!"
    ]
  },

  // ── THANKS ─────────────────────────────────────
  {
    tag: 'thanks',
    patterns: ['thank','thanks','thank you','thx','ty','appreciate','cheers','great','awesome','nice','helpful','good job','well done'],
    responses: [
      "😊 You're welcome! Happy to help anytime!",
      "🙏 Glad I could help! Is there anything else you'd like to know?",
      "😄 Anytime! ChatterApp is here for you!"
    ]
  },

  // ── JOKES ──────────────────────────────────────
  {
    tag: 'joke',
    patterns: ['joke','funny','laugh','humor','lol','make me laugh','tell me a joke'],
    responses: [
      "😄 Why did the phone go to therapy?\nBecause it had too many **hang-ups**! 😂",
      "😂 Why don't scientists trust atoms?\nBecause they make up everything! Just like bad excuses for not replying 😅",
      "🤣 What did one phone say to the other?\nNothing — it just sent a ChatterApp message! 📱"
    ]
  },

  // ── HOW ARE YOU ────────────────────────────────
  {
    tag: 'how_are_you',
    patterns: ['how are you','how r u','how are u','you okay','are you okay','how do you feel','what\'s up','whats up bot'],
    responses: [
      "I'm doing great, thanks for asking! 😊 Ready to help you with anything ChatterApp related. What do you need?",
      "Feeling awesome and fully charged! ⚡ How can I help you today?",
      "Running at 100%! 🤖 What can I do for you?"
    ]
  },

  // ── WHAT IS YOUR NAME ──────────────────────────
  {
    tag: 'name',
    patterns: ['what is your name','who are you','your name','what are you','introduce yourself','what should i call you'],
    responses: [
      "🤖 I'm **Aria** — ChatterApp's AI assistant!\n\nI'm here to help you with anything related to ChatterApp. Ask me about features, how to sign up, downloading the app, or just have a chat! 😊"
    ]
  },
];

// ─── SMART REPLY POOLS ───────────────────────────────
const smartReplyPools = {
  default: [
    ['👍 Got it!', 'Thanks!', 'Sounds good!'],
    ['Tell me more', 'How do I start?', 'Is it free?'],
    ['How to download?', 'How to sign up?', 'Contact support'],
    ['What features?', 'Is it safe?', 'What phones?'],
  ],
  after_download: [['How to install?', 'How to sign up?', 'Is it free?']],
  after_signup: [['How to chat?', 'What features?', 'Is it safe?']],
  after_features: [['Download now', 'How to sign up?', 'Is it free?']],
};

// ─── MAIN RESPONSE FUNCTION ──────────────────────────
function getBotResponse(input) {
  const text = input.toLowerCase().trim();

  for (const item of knowledge) {
    if (item.patterns.some(p => text.includes(p))) {
      const responses = item.responses;
      return responses[Math.floor(Math.random() * responses.length)];
    }
  }

  // Fallback responses
  const fallbacks = [
    "🤔 I'm not sure about that yet! Try asking about:\n• ChatterApp features\n• How to sign up\n• Downloading the app\n• Privacy & security",
    "Hmm, I didn't quite get that 😅 You can ask me:\n• \"What is ChatterApp?\"\n• \"How do I sign up?\"\n• \"Is it free?\"\n• \"How to download?\"",
    "I'm still learning new things! 🧠 For complex questions, visit **faq.chatterapp.online** or contact our support team at chatterapp.online"
  ];
  return fallbacks[Math.floor(Math.random() * fallbacks.length)];
}

// ─── SMART REPLIES FUNCTION ──────────────────────────
function getSmartReplies(input = '') {
  const text = (input || '').toLowerCase();

  if (text.includes('download') || text.includes('apk')) {
    return ['How to install?', 'How to sign up?', 'Is it free?'];
  }
  if (text.includes('sign up') || text.includes('register')) {
    return ['How to chat?', 'What features?', 'Download APK'];
  }
  if (text.includes('feature') || text.includes('what can')) {
    return ['Download now', 'How to sign up?', 'Contact support'];
  }

  const pool = smartReplyPools.default;
  return pool[Math.floor(Math.random() * pool.length)];
}

module.exports = { getBotResponse, getSmartReplies, knowledge };
