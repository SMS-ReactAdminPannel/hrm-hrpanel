import React, { useEffect, useRef, useState } from "react";
import io, { Socket } from "socket.io-client";

const socket: Socket = io("http://localhost:3002", {
  autoConnect: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
});

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
  room?: string;
}

const ChatApp: React.FC = () => {
  const [room, setRoom] = useState("general");
  const [sender, setSender] = useState("");
  const [content, setContent] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [typingUser, setTypingUser] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  
  useEffect(() => {
    
   socket.emit("joinRoom", room);

    
    const handleReceiveMessage = (message: Message) => {
      console.log("Received message:", message);
      setMessages((prev) => [...prev, message]);
    };

    
    const handleTyping = (data: { sender?: string; isTyping: boolean }) => {
      if (data.isTyping && data.sender) {
        setIsTyping(true);
        setTypingUser(data.sender);
      } else {
        setIsTyping(false);
        setTypingUser("");
      }
    };

    
    const handleSystemMessage = (message: Message) => {
      setMessages((prev) => [...prev, message]);
    };

  
    socket.on("receiveMessage", handleReceiveMessage);
    socket.on("userTyping", handleTyping);
    socket.on("systemMessage", handleSystemMessage);

    
    return () => {
      socket.off("receiveMessage", handleReceiveMessage);
      socket.off("userTyping", handleTyping);
      socket.off("systemMessage", handleSystemMessage);
    };
  }, [room]);

  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);


  const sendMessage = () => {
    if (content.trim() && sender.trim()) {
      const messageData = {
        room,
        sender,
        content,
      };

      console.log("Sending message:", messageData);
      socket.emit("sendMessage", messageData);
      setContent("");
      socket.emit("stopTyping", room);
    }
  };

  
  const handleTyping = () => {
    if (content.trim() && sender.trim()) {
      socket.emit("typing", { room, sender });
    }
  };

  return (
    <div className="w-full h-[700px] mx-auto flex flex-col bg-white shadow-lg rounded-lg p-4">
      <h2 className="text-2xl font-semibold mb-4 text-center">Chat Room: {room}</h2>


      <div className="mb-4">
        <select
          value={room}
          onChange={(e) => setRoom(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="general">General</option>
          <option value="random">Random</option>
          <option value="support">Support</option>
        </select>
      </div>

      
      <div className="flex-1 overflow-y-auto border rounded p-4 bg-gray-100 space-y-3">
        {messages.map((msg) => {
          const isOwn = msg.sender === sender;
          const isSystem = msg.sender === "System";
          
          return (
            <div
              key={msg.id}
              className={`flex ${isOwn ? "justify-end" : "justify-start"} ${
                isSystem ? "justify-center" : ""
              }`}
            >
              <div
                className={`px-4 py-2 rounded-lg max-w-sm shadow text-sm ${
                  isSystem
                    ? "bg-gray-300 text-gray-700"
                    : isOwn
                    ? "bg-blue-600 text-white rounded-br-none"
                    : "bg-white text-gray-800 rounded-bl-none"
                }`}
              >
                {!isOwn && !isSystem && (
                  <div className="text-xs font-semibold mb-1">{msg.sender}</div>
                )}
                {msg.content}
                <div className="text-xs mt-1 opacity-70">
                  {new Date(msg.timestamp).toLocaleTimeString()}
                </div>
              </div>
            </div>
          );
        })}
        {isTyping && typingUser && (
          <div className="text-sm italic text-gray-500">
            {typingUser} is typing...
          </div>
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
          required
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
            required
          />
          <button
            onClick={sendMessage}
            className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition"
            disabled={!content.trim() || !sender.trim()}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatApp;