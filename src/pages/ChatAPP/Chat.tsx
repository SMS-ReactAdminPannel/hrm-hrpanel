import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:3002");

const ChatApp: React.FC = () => {
  const [room, setRoom] = useState("general");
  const [sender, setSender] = useState("");
  const [content, setContent] = useState("");
  const [messages, setMessages] = useState<any[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    socket.emit("joinRoom", room);

    socket.on("receiveMessage", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    socket.on("typing", () => {
      setIsTyping(true);
    });

    socket.on("stopTyping", () => {
      setIsTyping(false);
    });

    return () => {
      socket.off("receiveMessage");
      socket.off("typing");
      socket.off("stopTyping");
    };
  }, [room]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (content.trim()) {
      socket.emit("sendMessage", { room, sender, content });
      setContent("");
      socket.emit("stopTyping", room);
    }
  };

  const handleTyping = () => {
    socket.emit("typing", { room, sender });
    setTimeout(() => {
      socket.emit("stopTyping", room);
    }, 1500);
  };

  return (
    <div className="w-full  h-[700px] mx-auto flex flex-col bg-white shadow-lg rounded-lg p-4">
      <h2 className="text-2xl font-semibold mb-4 text-center">Chat Room: {room}</h2>

      <div className="flex-1 overflow-y-auto border rounded p-4 bg-gray-100 space-y-3">
        {messages.map((msg, idx) => {
          const isOwn = msg.sender === sender;
          return (
            <div
              key={idx}
              className={`flex ${isOwn ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`px-4 py-2 rounded-lg max-w-sm shadow text-sm ${
                  isOwn
                    ? "bg-blue-600 text-white rounded-br-none"
                    : "bg-white text-gray-800 rounded-bl-none"
                }`}
              >
                {!isOwn && (
                  <div className="text-xs font-semibold mb-1">
                    {msg.sender}
                  </div>
                )}
                {msg.content}
              </div>
            </div>
          );
        })}
        {isTyping && (
          <div className="text-sm italic text-gray-500">Typing...</div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="pt-4 space-y-2">
        <input
          type="text"
          placeholder="Your name"
          className="w-full p-2 border rounded"
          value={sender}
          onChange={(e) => setSender(e.target.value)}
        />
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Type a message"
            className="flex-1 p-2 border rounded"
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
              handleTyping();
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") sendMessage();
            }}
          />
          <button
            onClick={sendMessage}
            className="bg-blue-600 text-white px-5 py-2 rounded"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatApp;
