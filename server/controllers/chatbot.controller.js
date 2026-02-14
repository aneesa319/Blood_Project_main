const Groq = require('groq-sdk');
const { classifyIntent, extractEntities, generateSystemPrompt, getQuickResponse } = require('../helpers/messageProcessor');

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const handleChatMessage = async (req, res) => {
  try {
    const { message, conversationHistory = [] } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Check for quick responses first (no AI call needed)
    const quickResponse = getQuickResponse(message);
    if (quickResponse) {
      return res.json({
        response: quickResponse,
        intent: 'quick_response',
        timestamp: new Date().toISOString()
      });
    }

    // Classify intent and extract entities
    const intent = classifyIntent(message);
    const entities = extractEntities(message);

    // Generate system prompt
    const systemPrompt = generateSystemPrompt(intent, entities, conversationHistory);

    // Prepare messages for Groq
    const messages = [
      { role: 'system', content: systemPrompt },
      ...conversationHistory.map(msg => ({ role: msg.role, content: msg.content })),
      { role: 'user', content: message }
    ];

    // Call Groq API
    const completion = await groq.chat.completions.create({
      messages: messages,
      model: 'llama-3.1-8b-instant',
      temperature: 0.7,
      max_tokens: 1000,
      top_p: 0.9,
    });

    const response = completion.choices[0]?.message?.content;

    if (!response) {
      throw new Error('No response from Groq API');
    }

    return res.json({
      response: response.trim(),
      intent: intent,
      entities: entities,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Chatbot API Error:', error.message);

    const fallbackResponse = "I'm having trouble connecting right now. Here are some quick links:\n\n" +
      "**Search Donors**: Visit /search/Donors\n" +
      "**Register**: Go to /registration\n" +
      "**Eligibility**: Check /eligibility\n" +
      "**Contact**: Visit /contact\n\n" +
      "I'll be back online shortly!";

    return res.json({
      response: fallbackResponse,
      intent: 'fallback',
      timestamp: new Date().toISOString()
    });
  }
};

const healthCheck = (req, res) => {
  res.json({
    status: 'online',
    service: 'LifeSaver Chatbot API',
    timestamp: new Date().toISOString()
  });
};

module.exports = { handleChatMessage, healthCheck };
