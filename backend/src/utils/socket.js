const socket = require("socket.io");
const crypto = require("crypto");
const Chat = require("../models/chat");
const authMiddleware = require("../middlewares/socketAuth");
const Connection = require("../models/requests");
const onlineUsers = require("../utils/onlineUsers");
const User = require("../models/users");

const getSecretRoomId = (userId, targetUserId) => {
  return crypto
    .createHash("sha256")
    .update([userId, targetUserId].sort().join("_"))
    .digest("hex");
};

const initializeSocket = (server) => {
  const io = socket(server, {
    cors: {
      origin: "http://localhost:5173",
      credentials: true,
    },
  });

  io.use(authMiddleware);

  io.on("connection", (socket) => {

    const userId = socket.user.id;
    onlineUsers.set(userId, socket.id);

    console.log(`${userId} connected`);

     io.emit("userOnline", userId);

    socket.on("joinChat", ({ firstName, targetUserId }) => {
      const userId = socket.user.id;
      const roomId = getSecretRoomId(userId, targetUserId);
      socket.join(roomId);
    });

    socket.on("sendMessage", async ({ firstName, targetUserId, text }) => {
      const userId = socket.user.id;

      const connection = await Connection.findOne({
        $or: [
          {
            fromUserId: userId,
            toUserId: targetUserId,
            status: "accepted",
          },
          {
            fromUserId: targetUserId,
            toUserId: userId,
            status: "accepted",
          },
        ],
      });

      if (!connection) {
        return socket.emit("messageError", {
          message: "You can only message your connections",
        });
      }

      const roomId = getSecretRoomId(userId, targetUserId);
      try {
        let chat = await Chat.findOne({
          participants: { $all: [userId, targetUserId] },
        });

        if (!chat) {
          chat = new Chat({
            participants: [userId, targetUserId],
            messages: [],
          });
        }

        chat.messages.push({
          senderId: userId,
          text,
        });

        await chat.save();
      } catch (error) {}

      io.to(roomId).emit("messageReceived", {
        firstName,
        text,
        userId,
        targetUserId,
      });
    });

    socket.on("disconnect", async () => {
      onlineUsers.delete(userId);

    await User.findByIdAndUpdate(userId, {
      lastSeen: new Date(),
    });

    io.emit("userOffline", {
      userId,
      lastSeen: new Date(),
    });

    console.log(`${userId} disconnected`);
    });
  });
};

module.exports = initializeSocket;
