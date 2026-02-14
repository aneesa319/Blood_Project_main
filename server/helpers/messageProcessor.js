const { responseTemplates } = require('./knowledgeBase');

const classifyIntent = (message) => {
  const lowerMessage = message.toLowerCase();

  if (lowerMessage.includes('emergency') || lowerMessage.includes('urgent') ||
      lowerMessage.includes('need blood now') || lowerMessage.includes('critical') ||
      lowerMessage.includes('immediately') || lowerMessage.includes('asap')) {
    return 'emergency';
  }

  if (lowerMessage.includes('scared') || lowerMessage.includes('afraid') ||
      lowerMessage.includes('nervous') || lowerMessage.includes('hurt') ||
      lowerMessage.includes('pain') || lowerMessage.includes('safe') ||
      lowerMessage.includes('worried') || lowerMessage.includes('fear')) {
    return 'reassurance';
  }

  if (lowerMessage.includes('first time') || lowerMessage.includes('never donated') ||
      lowerMessage.includes('new to') || lowerMessage.includes('beginner')) {
    return 'first_time';
  }

  if (lowerMessage.includes('register') || lowerMessage.includes('sign up') ||
      lowerMessage.includes('create account') || lowerMessage.includes('join') ||
      lowerMessage.includes('become donor')) {
    return 'registration';
  }

  if (lowerMessage.includes('donate') || lowerMessage.includes('donation') ||
      lowerMessage.includes('give blood') || lowerMessage.includes('donor') ||
      lowerMessage.includes('process') || lowerMessage.includes('procedure') ||
      lowerMessage.includes('how does it work')) {
    return 'donation';
  }

  if (lowerMessage.includes('eligible') || lowerMessage.includes('qualify') ||
      lowerMessage.includes('requirements') || lowerMessage.includes('criteria') ||
      lowerMessage.includes('can i') || lowerMessage.includes('am i able')) {
    return 'eligibility';
  }

  if (lowerMessage.includes('blood type') || lowerMessage.includes('compatible') ||
      lowerMessage.includes('a+') || lowerMessage.includes('o-') ||
      lowerMessage.includes('universal') || /[abo][+-]/.test(lowerMessage)) {
    return 'blood_types';
  }

  if (lowerMessage.includes('search') || lowerMessage.includes('find') ||
      lowerMessage.includes('near') || lowerMessage.includes('location') ||
      lowerMessage.includes('where')) {
    return 'location';
  }

  if (lowerMessage.includes('schedule') || lowerMessage.includes('appointment') ||
      lowerMessage.includes('when') || lowerMessage.includes('time')) {
    return 'scheduling';
  }

  if (lowerMessage.includes('why') || lowerMessage.includes('benefit') ||
      lowerMessage.includes('save lives') || lowerMessage.includes('important')) {
    return 'motivation';
  }

  if (lowerMessage.includes('after') || lowerMessage.includes('recovery') ||
      lowerMessage.includes('rest') || lowerMessage.includes('care')) {
    return 'aftercare';
  }

  if (lowerMessage.includes('hello') || lowerMessage.includes('hi') ||
      lowerMessage.includes('hey') || lowerMessage.includes('help') ||
      lowerMessage.includes('start') || lowerMessage.length < 10) {
    return 'greeting';
  }

  return 'general';
};

const extractEntities = (message) => {
  const entities = {
    bloodType: null,
    urgency: null,
    userRole: null,
    emotion: null
  };

  const lowerMessage = message.toLowerCase();

  const bloodTypePatterns = [
    /\b([abo])[+-]\b/i,
    /\btype\s+([abo])[+-]?\b/i,
    /\b(o|a|b|ab)\s*(positive|negative|\+|\-)\b/i
  ];

  bloodTypePatterns.forEach(pattern => {
    const match = message.match(pattern);
    if (match) {
      let type = match[1].toUpperCase();
      if (match[2]) {
        type += match[2].includes('pos') || match[2].includes('+') ? '+' : '-';
      }
      entities.bloodType = type;
    }
  });

  if (lowerMessage.includes('emergency') || lowerMessage.includes('critical') || lowerMessage.includes('immediately')) {
    entities.urgency = 'critical';
  } else if (lowerMessage.includes('urgent') || lowerMessage.includes('soon')) {
    entities.urgency = 'urgent';
  }

  if (lowerMessage.includes('donor') || lowerMessage.includes('donating') || lowerMessage.includes('want to give')) {
    entities.userRole = 'donor';
  } else if (lowerMessage.includes('patient') || lowerMessage.includes('need blood')) {
    entities.userRole = 'patient';
  }

  if (lowerMessage.includes('scared') || lowerMessage.includes('nervous') || lowerMessage.includes('worried')) {
    entities.emotion = 'anxious';
  } else if (lowerMessage.includes('excited') || lowerMessage.includes('ready')) {
    entities.emotion = 'enthusiastic';
  }

  return entities;
};

const generateSystemPrompt = (intent, entities, conversationHistory) => {
  const baseContext = `You are a friendly, knowledgeable, and empathetic assistant for LifeSaver System, a blood donor recommendation platform in Pakistan. Your personality is warm, encouraging, knowledgeable, and solution-focused.

PLATFORM OVERVIEW:
LifeSaver System connects blood donors with patients to save lives through:
- Smart donor matching by blood type and location
- Easy registration for donors and patients
- Donor search with compatibility filtering
- Comprehensive eligibility information
- Donation process guidance

NAVIGATION PATHS:
- Home: /
- Register: /registration
- Search Donors: /search/Donors
- Compatibility Search: /compatible-search
- Donation Process: /donation-process
- Eligibility: /eligibility
- How to Donate: /how-to-donate
- Volunteer: /volunteer
- About: /about
- Contact: /contact
- Login: /login

BLOOD DONATION FACTS:
- Process takes 45-60 minutes total (8-12 minutes actual donation)
- One donation can save up to 3 lives
- Requirements: Age 17+, weight 110+ lbs, good health
- Frequency: Every 56 days for whole blood
- All blood types are needed

COMMUNICATION STYLE:
- Be helpful and concise
- Use bullet points for clarity
- Provide specific navigation paths when relevant
- Acknowledge emotions and concerns
- Use encouraging language
- Keep responses under 200 words`;

  let specificContext = '';

  switch (intent) {
    case 'emergency':
      specificContext = 'EMERGENCY: Be direct and fast. Guide them to /search/Donors or /compatible-search immediately.';
      break;
    case 'reassurance':
      specificContext = 'REASSURANCE: Be extra empathetic. Address fears about blood donation. Focus on safety and simplicity.';
      break;
    case 'first_time':
      specificContext = 'FIRST-TIME: Be welcoming. Walk through the process step-by-step. Offer to guide through registration.';
      break;
    case 'registration':
      specificContext = 'REGISTRATION: Guide them to /registration. Explain the simple process.';
      break;
    case 'donation':
      specificContext = 'DONATION PROCESS: Explain the process. Guide to /donation-process or /how-to-donate for details.';
      break;
    case 'eligibility':
      specificContext = 'ELIGIBILITY: Help them understand requirements. Guide to /eligibility page.';
      break;
    case 'blood_types':
      specificContext = 'BLOOD TYPES: Explain blood type compatibility clearly. All types are needed.';
      break;
    case 'location':
      specificContext = 'SEARCH: Guide them to /search/Donors or /compatible-search to find donors near them.';
      break;
    case 'motivation':
      specificContext = 'MOTIVATION: Share the incredible impact of blood donation. Inspire action.';
      break;
    case 'aftercare':
      specificContext = 'AFTERCARE: Provide post-donation care tips. Stay hydrated, rest, eat well.';
      break;
    default:
      specificContext = 'GENERAL: Assess what they need and provide helpful guidance.';
  }

  if (entities.bloodType) specificContext += ` User mentioned blood type: ${entities.bloodType}.`;
  if (entities.urgency === 'critical') specificContext += ' This is CRITICAL - prioritize speed.';
  if (entities.emotion) specificContext += ` User seems ${entities.emotion} - adjust tone.`;
  if (entities.userRole) specificContext += ` User is a ${entities.userRole}.`;

  return baseContext + '\n\nCONTEXT:\n' + specificContext;
};

const getQuickResponse = (message) => {
  const lowerMessage = message.toLowerCase();

  const greetings = ['hello', 'hi', 'hey', 'start', 'help me'];
  if (greetings.some(g => lowerMessage.includes(g)) && lowerMessage.length < 20) {
    const responses = responseTemplates.greeting;
    return responses[Math.floor(Math.random() * responses.length)];
  }

  if (lowerMessage.includes('quick facts') || (lowerMessage.includes('facts') && lowerMessage.includes('donation'))) {
    return "**Quick Blood Donation Facts:**\n\n* **Total time**: 45-60 minutes\n* **Actual donation**: 8-12 minutes\n* **Lives saved**: Up to 3 per donation\n* **Frequency**: Every 56 days\n* **Age**: 17+ years\n* **Weight**: 110+ lbs minimum\n\nReady to become a hero? Visit /registration to get started!";
  }

  if (lowerMessage.includes('blood type') && (lowerMessage.includes('compatible') || lowerMessage.includes('receive'))) {
    return "**Blood Type Compatibility Guide:**\n\n* **O-** (Universal Donor): Can give to everyone!\n* **AB+** (Universal Receiver): Can receive from all types\n* **Type A**: Gives to A & AB | Receives from A & O\n* **Type B**: Gives to B & AB | Receives from B & O\n* **Type O**: Gives to everyone | Receives from O only\n\n**RH Factor:**\n* Positive (+): Can receive + and -\n* Negative (-): Can only receive -\n\nEvery type is precious and needed! Use /compatible-search to find compatible donors.";
  }

  if (lowerMessage.includes('how long') && lowerMessage.includes('donation')) {
    return "**Blood Donation Timeline:**\n\n**Total: 45-60 minutes**\n\n1. **Check-in & Registration** (10 min)\n2. **Health Screening** (15 min)\n3. **The Donation** (8-12 min)\n4. **Recovery & Snacks** (10-15 min)\n\nMost people say it's easier than expected! Visit /donation-process for full details.";
  }

  if (lowerMessage.includes('hurt') || lowerMessage.includes('pain') || lowerMessage.includes('painful')) {
    return "**Let me ease your mind:**\n\n* **Needle insertion**: Quick pinch for 2-3 seconds\n* **During donation**: Most feel nothing or slight pressure\n* **Pain scale**: Most donors rate it 2-3 out of 10\n* **Duration**: Only 8-12 minutes\n\n**Comfort tips:**\n* Stay hydrated beforehand\n* Eat a good meal 2-3 hours before\n* Deep breathing during insertion\n* Tell staff if you're nervous\n\nThe hardest part is showing up. Once you start, it's surprisingly easy!";
  }

  return null;
};

module.exports = { classifyIntent, extractEntities, generateSystemPrompt, getQuickResponse };
