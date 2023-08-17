const express = require("express");
const router = express.Router();
const User = require("../models/user");

router.post("/send-request", async (req, res) => {
  try {
    const { senderId, receiverId } = req.body;

    const sender = await User.findById(senderId);
    const receiver = await User.findById(receiverId);
    if (!sender || !receiver) {
      return res.status(404).json({ message: "Sender or receiver not found" });
    }

    if (sender.friendRequests.includes(receiverId)) {
      return res.status(409).json({ message: "Friend request already sent" });
    }

    sender.friendRequests.push(receiverId);
    await sender.save();

    res.status(200).json({ message: "Friend request sent successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/accept-request", async (req, res) => {
  try {
    const { senderId, receiverId } = req.body;

    const sender = await User.findById(senderId);
    const receiver = await User.findById(receiverId);
    if (!sender || !receiver) {
      return res.status(404).json({ message: "Sender or receiver not found" });
    }

    if (!sender.friendRequests.includes(receiverId)) {
      return res.status(404).json({ message: "Friend request not found" });
    }

    receiver.friends.push(senderId);
    receiver.friendRequests = receiver.friendRequests.filter(
      (request) => request.toString() !== senderId
    );
    await receiver.save();

    sender.friends.push(receiverId);
    await sender.save();

    res.status(200).json({ message: "Friend request accepted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
