import React, { useState } from 'react';
import './Chat.css';

const Chat = () => {
  const [chats, setChats] = useState([
    { id: 1, name: 'John Doe', lastMessage: 'Hello!', time: '1 min ago' },
    { id: 2, name: 'Jane Smith', lastMessage: 'How are you?', time: '5 min ago' },
  ]);
  const [activeChatId, setActiveChatId] = useState(null);
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState({});

  const startNewChat = () => {
    const userName = prompt("Enter the name of the user you want to chat with:");

    if (userName && userName.trim()) {
      const newChat = {
        id: Date.now(),
        name: userName.trim(),
        lastMessage: '',
        time: '',
      };
      setChats([...chats, newChat]);
      setActiveChatId(newChat.id);
      setChatMessages({ ...chatMessages, [newChat.id]: [] });
    } else {
      alert("Chat name is required.");
    }
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (message.trim() && activeChatId) {
      const updatedMessages = chatMessages[activeChatId] || [];
      updatedMessages.push({ text: message, sender: 'You', time: 'Just now' });
      setChatMessages({ ...chatMessages, [activeChatId]: updatedMessages });
      setMessage('');
    }
  };

  return (
    <div className="chat">
      <div className="chat-list">
        <h2>Recent Chats</h2>
        {chats.map((chat) => (
          <div
            key={chat.id}
            className={`chat-item ${activeChatId === chat.id ? 'active' : ''}`}
            onClick={() => setActiveChatId(chat.id)}
          >
            <h4>{chat.name}</h4>
            <p>{chat.lastMessage}</p>
            <span>{chat.time}</span>
          </div>
        ))}
        <button onClick={startNewChat} className="new-chat-button">
          + Start New Chat
        </button>
      </div>

      <div className="chat-box">
        {activeChatId ? (
          <>
            <div className="chat-header">
              <h3>{chats.find((chat) => chat.id === activeChatId)?.name}</h3>
            </div>
            <div className="chat-messages">
              {(chatMessages[activeChatId] || []).map((msg, index) => (
                <div
                  key={index}
                  className={`chat-message ${msg.sender === 'You' ? 'sent' : 'received'}`}
                >
                  <span className="sender">{msg.sender}:</span>
                  <span className="text">{msg.text}</span>
                  <span className="time">{msg.time}</span>
                </div>
              ))}
            </div>
            <form onSubmit={sendMessage} className="chat-input">
              <input
                type="text"
                placeholder="Type a message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button type="submit">Send</button>
            </form>
          </>
        ) : (
          <p>Select a chat to start messaging.</p>
        )}
      </div>
    </div>
  );
};

export default Chat;
