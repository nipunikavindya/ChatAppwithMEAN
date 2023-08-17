const express = require('express');
const router = express.Router();
const Message = require('../models/message');
const { validationResult } = require("express-validator");

router.get('/receive', async (req, res) => {
  try {
    const { userId } = req.query;
    const messages = await Message.find({
      $or: [{ sender: userId }, { receiver: userId }],
    });

    res.status(200).json({ messages });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;