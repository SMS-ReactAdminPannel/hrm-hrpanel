import React, { useState, useRef, useEffect } from 'react';
import { Send, Phone, Video, MoreVertical, Search, Paperclip, Smile, Mic } from 'lucide-react';
import { FONTS } from '../../constants/uiConstants';

interface Message {
  id: string;
  text: string;
  sender: 'me' | 'other';
  timestamp: Date;
  status?: 'sent' | 'delivered' | 'read';
}

interface Contact {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  online: boolean;
}

const ChatApp: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hey! How are you doing today?',
      sender: 'other',
      timestamp: new Date(Date.now() - 3600000),
      status: 'read'
    },
    {
      id: '2',
      text: 'I\'m doing great! Just finished a really interesting project. How about you?',
      sender: 'me',
      timestamp: new Date(Date.now() - 3500000),
      status: 'read'
    },
    {
      id: '3',
      text: 'That sounds awesome! I\'d love to hear more about it. I\'ve been working on some new designs myself.',
      sender: 'other',
      timestamp: new Date(Date.now() - 3000000),
      status: 'read'
    },
    {
      id: '4',
      text: 'We should definitely catch up soon! Maybe grab coffee this weekend?',
      sender: 'me',
      timestamp: new Date(Date.now() - 2400000),
      status: 'delivered'
    }
  ]);

  const [contacts, setContacts] = useState<Contact[]>([
    {
      id: '1',
      name: 'Alex Thompson',
      avatar: 'https://img.freepik.com/premium-photo/happy-man-ai-generated-portrait-user-profile_1119669-1.jpg?w=2000',
      lastMessage: 'That sounds awesome! I\'d love to hear...',
      timestamp: '2:30 PM',
      unread: 0,
      online: true
    },
    {
      id: '2',
      name: 'Sarah Chen',
      avatar: 'https://i.pinimg.com/736x/07/33/ba/0733ba760b29378474dea0fdbcb97107.jpg',
      lastMessage: 'The meeting is at 3 PM tomorrow',
      timestamp: '1:45 PM',
      unread: 2,
      online: true
    },
    {
      id: '3',
      name: 'Design Team',
      avatar: 'https://ds393qgzrxwzn.cloudfront.net/resize/c500x500/cat1/img/images/0/52ooj4559c.jpg',
      lastMessage: 'New mockups are ready for review',
      timestamp: '12:20 PM',
      unread: 5,
      online: false
    },
    {
      id: '4',
      name: 'Priya',
      avatar: 'https://www.shutterstock.com/image-photo/university-school-teacher-business-lady-600nw-2170254395.jpg',
      lastMessage: 'Don\'t forget dinner on Sunday!',
      timestamp: 'Yesterday',
      unread: 0,
      online: false
    }
  ]);

  const [newMessage, setNewMessage] = useState('');
  const [selectedContact, setSelectedContact] = useState<Contact>(contacts[0]);
  const [isTyping, setIsTyping] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Filter contacts based on search query
  const filteredContacts = contacts.filter(contact => {
    const searchLower = searchQuery.toLowerCase();
    return (
      contact.name.toLowerCase().includes(searchLower) ||
      contact.lastMessage.toLowerCase().includes(searchLower)
    );
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: Date.now().toString(),
        text: newMessage,
        sender: 'me',
        timestamp: new Date(),
        status: 'sent'
      };
      
      setMessages(prev => [...prev, message]);
      setNewMessage('');
      
      // Simulate typing indicator and response
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        const response: Message = {
          id: (Date.now() + 1).toString(),
          text: 'Thanks for your message! I\'ll get back to you soon.',
          sender: 'other',
          timestamp: new Date(),
          status: 'read'
        };
        setMessages(prev => [...prev, response]);
      }, 2000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="flex h-screen bg-blue-100">

      {/* Sidebar */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        {/* Search Header */}
        <div className="p-4 border-b border-gray-100">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black w-4 h-4" />
            <input 
              type="text" 
              placeholder="Search conversations..."
              className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Contacts List */}
        <div className="flex-1 overflow-y-auto"
         style={{
                        fontFamily: FONTS.paragraph.fontFamily,
                        fontWeight: FONTS.header3.fontWeight,
                      }}>
          {filteredContacts.length > 0 ? (
            filteredContacts.map((contact) => (
              <div
                key={contact.id}
                onClick={() => setSelectedContact(contact)}
                className={`flex items-center p-4 hover:bg-gray-50 cursor-pointer transition-colors border-l-4 ${
                  selectedContact.id === contact.id 
                    ? 'bg-blue-50 border-blue-500' 
                    : 'border-transparent'
                }`}
              >
                <div className="relative">
                  <img 
                    src={contact.avatar} 
                    alt={contact.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  {contact.online && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                  )}
                </div>
                
                <div className="ml-3 flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold text-gray-900 truncate">{contact.name}</h3>
                    <span className="text-xs text-gray-500 ml-2">{contact.timestamp}</span>
                  </div>
                  <p className="text-sm text-gray-600 truncate mt-1">{contact.lastMessage}</p>
                </div>
                
                {contact.unread > 0 && (
                  <div className="ml-2 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {contact.unread}
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="p-4 text-center text-gray-500">
              No contacts found matching "{searchQuery}"
            </div>
          )}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
          <div className="flex items-center">
            <div className="relative">
              <img 
                src={selectedContact.avatar} 
                alt={selectedContact.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              {selectedContact.online && (
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
              )}
            </div>
            <div className="ml-3">
              <h2 className="font-semibold text-gray-900"
               style={{
                              fontFamily: FONTS.paragraph.fontFamily,
                              fontWeight: FONTS.header3.fontWeight,
                            }}>{selectedContact.name}</h2>
              <p className="text-sm text-gray-500">
                {selectedContact.online ? 'Active now' : 'Last seen recently'}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2"
           style={{
                          fontFamily: FONTS.paragraph.fontFamily,
                          fontWeight: FONTS.paragraph.fontWeight,
                        }}>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Phone className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Video className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <MoreVertical className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-gray-50 to-white"
         style={{
                        fontFamily: FONTS.paragraph.fontFamily,
                        fontWeight: FONTS.paragraph.fontWeight,
                      }}>
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                  message.sender === 'me'
                    ? 'bg-blue-500 text-white rounded-br-md'
                    : 'bg-white text-gray-900 border border-gray-200 rounded-bl-md shadow-sm'
                }`}
              >
                <p className="text-sm">{message.text}</p>
                <div className={`flex items-center justify-end mt-1 space-x-1 ${
                  message.sender === 'me' ? 'text-blue-100' : 'text-gray-500'
                }`}>
                  <span className="text-xs">{formatTime(message.timestamp)}</span>
                  {message.sender === 'me' && message.status && (
                    <div className={`w-3 h-3 rounded-full text-xs flex items-center justify-center ${
                      message.status === 'sent' ? 'bg-blue-300' :
                      message.status === 'delivered' ? 'bg-blue-200' :
                      'bg-green-400'
                    }`}>
                      ✓
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-md shadow-sm px-4 py-2">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <div className="bg-white border-t border-gray-200 p-4">
          <div className="flex items-end space-x-2">
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Paperclip className="w-5 h-5 text-gray-600" />
            </button>
            
            <div className="flex-1 relative">
              <textarea
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type a message..."
                className="w-full px-4 py-2 pr-12 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none max-h-32 transition-all"
                rows={1}
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full transition-colors">
                <Smile className="w-5 h-5 text-gray-600" />
              </button>
            </div>
            
            {newMessage.trim() ? (
              <button
                onClick={handleSendMessage}
                className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full transition-colors transform hover:scale-105"
              >
                <Send className="w-5 h-5" />
              </button>
            ) : (
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <Mic className="w-5 h-5 text-gray-600" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatApp;