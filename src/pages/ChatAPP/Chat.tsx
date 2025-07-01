import { Blend, Filter, Plus, Search, TvMinimal, User } from "lucide-react";
import type React from "react";
import { useEffect, useRef, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaRegSmileBeam } from "react-icons/fa";
import { FaRegCircleQuestion } from "react-icons/fa6";
import { GoCopilot, GoPaperclip } from "react-icons/go";
import { IoIosSend } from "react-icons/io";
import { IoLogoWechat } from "react-icons/io5";
import { TbUsersPlus } from "react-icons/tb";
import io, { type Socket } from "socket.io-client";

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

interface Conversation {
  id: string;
  name: string;
  lastMessage?: string;
  lastMessageTime?: string;
  unreadCount: number;
  avatar: string;
  isOnline: boolean;
}

const ChatApp: React.FC = () => {
  const [activeRoom, setActiveRoom] = useState("general");
  const [sender, setSender] = useState("");
  const [content, setContent] = useState("");
  const [messages, setMessages] = useState<{ [key: string]: Message[] }>({
    general: [],
    random: [],
    support: [],
    "john-doe": [],
    "jane-smith": [],
    "team-alpha": [],
    "bitrix24-support": [],
    "company-news": [],
    notes: [],
  });
  const [isTyping, setIsTyping] = useState(false);
  const [typingUser, setTypingUser] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [showDropdown, setShowDropdown] = useState(false);

  const [conversations] = useState<Conversation[]>([{
      id: "bitrix24-support",
      name: "Bitrix24 Support",
      lastMessage:
        "Hi there! I'm AI support agent, your virtual assistant. I'm happy to answer any...",
      lastMessageTime: "10:30 AM",
      unreadCount: 0,
      avatar: "https://via.placeholder.com/40x40/4F46E5/FFFFFF?text=AI",
      isOnline: true,
    },
    {
      id: "company-news",
      name: "Company News",
      lastMessage:
        "Share important information and news. Follow to remain informed about the lates...",
      lastMessageTime: "9:45 AM",
      unreadCount: 0,
      avatar: "",
      isOnline: false,
    },
    {
      id: "notes",
      name: "Notes",
      lastMessage: "Visible to you only",
      lastMessageTime: "Yesterday",
      unreadCount: 0,
      avatar: "",
      isOnline: false,
    },
    {
      id: "general",
      name: "General chat",
      lastMessage:
        "Use the general chat to communicate, bounce ideas around and share your...",
      lastMessageTime: "2:15 PM",
      unreadCount: 1,
      avatar: "",
      isOnline: true,
    },]); // Use your original conversation data here

  useEffect(() => {
    socket.emit("joinRoom", activeRoom);

    const handleReceiveMessage = (message: Message) => {
      setMessages((prev) => ({
        ...prev,
        [message.room || activeRoom]: [
          ...(prev[message.room || activeRoom] || []),
          message,
        ],
      }));
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
      setMessages((prev) => ({
        ...prev,
        [message.room || activeRoom]: [
          ...(prev[message.room || activeRoom] || []),
          message,
        ],
      }));
    };

    socket.on("receiveMessage", handleReceiveMessage);
    socket.on("userTyping", handleTyping);
    socket.on("systemMessage", handleSystemMessage);

    return () => {
      socket.off("receiveMessage", handleReceiveMessage);
      socket.off("userTyping", handleTyping);
      socket.off("systemMessage", handleSystemMessage);
    };
  }, [activeRoom]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (content.trim() && sender.trim()) {
      const messageData = {
        room: activeRoom,
        sender,
        content,
      };
      socket.emit("sendMessage", messageData);
      setContent("");
      socket.emit("stopTyping", activeRoom);
    }
  };

  const handleTyping = () => {
    if (content.trim() && sender.trim()) {
      socket.emit("typing", { room: activeRoom, sender });
    }
  };

  const switchConversation = (conversationId: string) => {
    setActiveRoom(conversationId);
    socket.emit("joinRoom", conversationId);
  };

  const currentConversation = conversations.find(
    (conv) => conv.id === activeRoom
  );
  const currentMessages = messages[activeRoom] || [];

  useEffect(() => {
    const handleClickOutside = () => {
      if (showDropdown) setShowDropdown(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showDropdown]);
  return (
    <div className="flex h-[85vh]  bg-white">
      {/* Sidebar */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        {/* Header */}
        <div className="p-2 border-b border-gray-200">
          
          <div className="flex items-center justify-between ">
            <button className="p-2 hover:bg-gray-100 rounded-lg bg-gray-300 ">
              <Filter size={20} className="" />
            </button>

            <div className="flex-1 mx-3 relative">
              <input
                type="text"
                placeholder="Find employee or chat"
                className="w-full pl-10 pr-4 py-2 bg-gray-100 border-0 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="w-4 h-4 text-gray-500 absolute left-3 top-3" />
            </div>

            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
              >
                <Plus size={20} />
              </button>

              {/* Dropdown Menu */}
              {showDropdown && (
                <div className="absolute right-0 top-12 w-[18rem] bg-white rounded-lg shadow-xl border border-gray-200 z-50 overflow-auto h-[80vh] scrollbar-hide">
                  <div className="p-4">
                    <div className="space-y-3">
                      <div className="flex items-center p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
                        <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center mr-3 text-white">
                          <IoLogoWechat />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">
                            Group chat
                          </div>
                          <div className="text-sm text-gray-500">
                            Group discussions
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
                        <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center mr-3 text-white">
                          <GoCopilot />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">
                            Chat with CoPilot
                          </div>
                          <div className="text-sm text-gray-500">
                            AI-assisted problem solving
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
                        <div className="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center mr-3 text-white p-1">
                          <TvMinimal />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">
                            Channel
                          </div>
                          <div className="text-sm text-gray-500">
                            News, announcements, comments
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
                        <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center mr-3 p-1 text-white">
                          <Blend />
                        </div>
                        <div className="flex items-center">
                          <div>
                            <div className="font-medium text-gray-900">
                              Collab
                            </div>
                            <div className="text-sm text-gray-500">
                              Collaborate with outside teams and guests
                            </div>
                          </div>
                          <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                            NEW
                          </span>
                        </div>
                      </div>

                      <div className="border-t border-gray-200 pt-3">
                        <div className="bg-blue-50 p-3 rounded-lg">
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center mr-3 p-1 text-white ">
                              <TbUsersPlus />
                            </div>
                            <div>
                              <div className="font-medium text-blue-900">
                                Invite a team
                              </div>
                              <div className="text-sm text-blue-700">
                                Invite all team members at once
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="border-t border-gray-200 pt-3">
                        <button className="w-full flex items-center justify-center p-3 text-blue-500 hover:bg-blue-50 rounded-lg">
                         <FaRegCircleQuestion/>
                          What's best for me?
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Conversations List */}
        <div className="flex-1 overflow-y-auto">
          {conversations.map((conversation) => (
            <div
              key={conversation.id}
              onClick={() => switchConversation(conversation.id)}
              className={`flex items-center p-4 hover:bg-gray-50 cursor-pointer border-l-4 ${
                activeRoom === conversation.id
                  ? "bg-blue-50 border-blue-500"
                  : "border-transparent"
              }`}
            >
              <div className="relative">
                {conversation.avatar &&
                conversation.avatar.toString().startsWith("http") ? (
                  <img
                    src={conversation.avatar.toString()}
                    alt={conversation.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold ${
                      conversation.isOnline ? "bg-green-500" : "bg-gray-400"
                    }`}
                  >
                    <User className="w-5 h-5 text-white" />
                  </div>
                )}

                {conversation.isOnline && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-white rounded-full"></div>
                )}
              </div>

              <div className="ml-3 flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3
                    className={`text-sm font-medium truncate ${
                      activeRoom === conversation.id
                        ? "text-blue-600"
                        : "text-gray-900"
                    }`}
                  >
                    {conversation.name}
                  </h3>
                  <span className="text-xs text-gray-500">
                    {conversation.lastMessageTime}
                  </span>
                </div>
                <p className="text-sm text-gray-600 truncate mt-1">
                  {conversation.lastMessage}
                </p>
              </div>

              {conversation.unreadCount > 0 && (
                <div className="ml-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {conversation.unreadCount}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="p-4 border-b border-gray-200 bg-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-lg mr-3 overflow-hidden">
                {typeof currentConversation?.avatar === "string" &&
                currentConversation.avatar.startsWith("http") ? (
                  <img
                    src={currentConversation.avatar}
                    alt={currentConversation.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-white font-medium">
                    {currentConversation?.name?.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>

              <div>
                <h2 className="text-lg font-semibold text-gray-800">
                  {currentConversation?.name}
                </h2>
                <p className="text-sm text-gray-500">
                  {currentConversation?.isOnline ? "Online" : "Offline"}
                </p>
              </div>
            </div>

            <div className="flex space-x-2">
              <button className="p-2 hover:bg-gray-100 rounded-full">
               <BsThreeDotsVertical/>
              </button>
            </div>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-auto p-4 bg-gray-50">
          {currentMessages.map((msg) => {
            const isOwn = msg.sender === sender;
            return (
              <div
                key={msg.id}
                className={`mb-3 flex ${isOwn ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`p-2 rounded-lg max-w-xs ${
                    isOwn ? "bg-blue-500 text-white" : "bg-white border"
                  }`}
                >
                  <div>{msg.content}</div>
                  <div className="text-right text-xs text-gray-400">
                    {new Date(msg.timestamp).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
              </div>
            );
          })}
          {isTyping && <div className="text-xs text-gray-500">{typingUser} is typing...</div>}
          <div ref={messagesEndRef}></div>
        </div>


        {/* Message Input */}
         <div className="p-4 flex items-center border-t bg-white">
          <GoPaperclip className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Type a message"
            className="flex-1 border rounded-full px-4 py-2 text-sm focus:outline-none"
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
            className="ml-2 bg-blue-500 hover:bg-blue-600 p-2 rounded-full text-white"
          >
            <IoIosSend />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatApp;
