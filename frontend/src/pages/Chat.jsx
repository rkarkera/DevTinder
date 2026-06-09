import { useEffect, useState } from "react";
import ChatWindow from "../components/ChatWindow";
import ConnectionsList from "../components/ConnectionsList";
import { useSelector } from "react-redux";
import { createSocketConnection } from "../utils/socket";
import { API_URL } from "../utils/constant";
import axios from "axios";

export default function Chat() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [isOnline, setIsOnline] = useState(false);
const [lastSeen, setLastSeen] = useState(null);
  const connections = useSelector((store) => store.connections);
  const { user } = useSelector((store) => store.user);
  const userId = user?._id;
  const targetUserId = selectedUser?._id;

  const fetchChat = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/chat/${targetUserId}`, {
        withCredentials: true,
      });

      let newMsg = data.messages.map((el) => ({
        text: el.text,
        userId: el.senderId,
      }));

      setMessages(newMsg);
    } catch (error) {
      console.error(error.response?.data?.message);
    }
  };

  const fetchStatus = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/chat/status/${targetUserId}`, {
        withCredentials: true,
      });

       setIsOnline(data.isOnline);
      setLastSeen(data.lastSeen);

      } catch (error) {
        console.error(error.response?.data?.message);
      }
  }

  useEffect(() => {
    const newSocket = createSocketConnection();
    newSocket.on("connect", () => {});

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!socket || !userId || !targetUserId) return;

    const handleMessage = ({ firstName, text, userId, targetUserId }) => {
      setMessages((prev) => [...prev, { text, userId }]);
    };

    const handleUserOnline = (userId) => {
    if (userId === targetUserId) {
      setIsOnline(true);
    }
  };

  const handleUserOffline = (data) => {
    if (data.userId === targetUserId) {
      setIsOnline(false);
      setLastSeen(data.lastSeen);
    }
  };

    socket.emit("joinChat", {
      firstName: user.firstName,
      targetUserId,
    });

    socket.on("messageReceived", handleMessage);
    socket.on("userOnline", handleUserOnline);
    socket.on("userOffline", handleUserOffline);

    return () => {
      socket.off("messageReceived", handleMessage);
      socket.off("userOnline", handleUserOnline);
      socket.off("userOffline", handleUserOffline);
    };
  }, [socket, userId, targetUserId]);

  useEffect(() => {
    if (!targetUserId) return;

    fetchChat();
    fetchStatus();
  }, [targetUserId]);

  const sendMessage = () => {
    socket.emit("sendMessage", {
      firstName: user.firstName,
      targetUserId,
      text: message,
    });
    setMessage("");
  };

  return (
    <div className="h-[calc(100vh-64px)] bg-base-200">
      <div className="hidden md:flex h-full">
        <div className="min-w-[320px] max-w-[320px] border-r border-base-300">
          <ConnectionsList
            setSelectedUser={setSelectedUser}
            connections={connections}
            selectedUser={selectedUser}
          />
        </div>
        <div className="flex-1">
          {selectedUser ? (
            <ChatWindow
              setSelectedUser={setSelectedUser}
              messages={messages}
              selectedUser={selectedUser}
              setMessage={setMessage}
              message={message}
              sendMessage={sendMessage}
              userId={userId}
              isOnline={isOnline}
              lastSeen={lastSeen}
            />
          ) : (
            <div className="h-full flex flex-col items-center justify-center gap-4 text-center">
              <div className="text-7xl">💬</div>

              <h2 className="text-3xl font-bold">Start Messaging</h2>

              <p className="opacity-60">
                Select a connection and begin chatting.
              </p>
            </div>
          )}
        </div>
      </div>
      <div className="md:hidden h-full">
        {!selectedUser ? (
          <ConnectionsList
            setSelectedUser={setSelectedUser}
            connections={connections}
            selectedUser={selectedUser}
          />
        ) : (
          <ChatWindow
            setSelectedUser={setSelectedUser}
            messages={messages}
            selectedUser={selectedUser}
            setMessage={setMessage}
            message={message}
            sendMessage={sendMessage}
            userId={userId}
            isOnline={isOnline}
              lastSeen={lastSeen}
          />
        )}
      </div>
    </div>
  );
}
