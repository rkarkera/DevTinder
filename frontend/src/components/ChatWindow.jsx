import { useEffect, useRef } from "react";
import { IoArrowBack } from "react-icons/io5";
import { formatDistanceToNow } from "date-fns";

const ChatWindow = ({
  setSelectedUser,
  messages,
  selectedUser,
  setMessage,
  message,
  sendMessage,
  userId,
  isOnline,
  lastSeen
}) => {
  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="flex flex-col h-full bg-base-200">
      <div className="bg-base-100 border-b border-base-300 px-4 py-3 flex items-center gap-3 shadow-sm">
        <button
          onClick={() => setSelectedUser(null)}
          className="md:hidden p-2 rounded-full hover:bg-base-200 transition"
        >
          <IoArrowBack className="text-xl" />
        </button>

        <img
          src={selectedUser?.photoUrl}
          alt=""
          className="w-12 h-12 rounded-full ring-2 ring-base-300 object-cover"
        />

        <div>
          <h2 className="font-bold text-lg">
            {selectedUser?.firstName} {selectedUser?.lastName}
          </h2>

          {isOnline ? (
            <p className="text-xs text-green-500 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              Online
            </p>
          ) : (
            <p className="text-xs opacity-70">
              Last seen{" "}
              {lastSeen
                ? formatDistanceToNow(new Date(lastSeen), {
                    addSuffix: true,
                  })
                : "recently"}
            </p>
          )}
        </div>
      </div>
      <div
        className="flex-1 overflow-y-auto p-4 space-y-4"
        ref={chatContainerRef}
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.userId === userId ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] md:max-w-md px-4 py-3 rounded-2xl shadow-sm wrap-break-word ${
                msg.userId === userId
                  ? "bg-primary text-primary-content"
                  : "bg-base-100 border border-base-300"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>
      <div className="bg-base-100 border-t border-base-300 p-4">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Type a message..."
            className="input input-bordered flex-1"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <button className="btn btn-primary px-6" onClick={sendMessage}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
