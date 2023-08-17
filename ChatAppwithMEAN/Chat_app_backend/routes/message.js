const express = require('express');
const router = express.Router();
const { validationResult } = require("express-validator");

const User = require('../models/user');
const Message = require('../models/message');

router.post('/send', async (req, res) => {
  try {
    const { senderId, receiverId, content } = req.body;


    const sender = await User.findById(senderId);
    const receiver = await User.findById(receiverId);
    if (!sender || !receiver) {
      return res.status(404).json({ message: 'Sender or receiver not found' });
    }

    const newMessage = new Message({
      sender: senderId,
      receiver: receiverId,
      content,
    });

    const savedMessage = await newMessage.save();

    res.status(201).json({ message: 'Message sent successfully', savedMessage });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;