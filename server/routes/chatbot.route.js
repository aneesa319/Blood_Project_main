const express = require('express');
const router = express.Router();
const { handleChatMessage, healthCheck } = require('../controllers/chatbot.controller');

router.post('/', handleChatMessage);
router.get('/', healthCheck);

module.exports = router;
