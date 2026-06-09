const express = require("express");
const { userAuth } = require("../middlewares/auth");
const Chat = require("../models/chat");
const User = require("../models/users");
const onlineUsers = require("../utils/onlineUsers");
const router = express.Router();

router.get("/chat/:targetUserId", userAuth, async(req,res) => {
    try {
        
        const {targetUserId} = req.params;
        const userId = req.user._id;

        let chat = await Chat.findOne({participants: { $all : [userId,targetUserId]}});

        if(!chat) {
            chat = new Chat({
                participants : [userId, targetUserId],
                messages:[]
            });
            await chat.save();
        }

        res.status(200).json(chat);


    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

router.get("/chat/status/:userId", async (req, res) => {
  const { userId } = req.params;

  const user = await User.findById(userId);

  res.json({
    isOnline: onlineUsers.has(userId),
    lastSeen: user.lastSeen,
  });
});


module.exports = router;