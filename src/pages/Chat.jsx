import {useState} from 'react';
import {motion} from 'framer-motion';

const Chat = () => {
  const [chats, setChats] = useState([
    { id: 1, name: 'John Doe', lastMessage: 'Hello!', time: '1 min ago' },
    { id: 2, name: 'Jane Smith', lastMessage: 'How are you?', time: '5 min ago' },
  ]);
  const [activeChatId, setActiveChatId] = useState(null);
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState({});

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

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
      <div className="min-h-screen bg-gradient-to-br from-slate-800 to-slate-900 py-16 px-4">
        <motion.div
            className="max-w-6xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
          <motion.div
              variants={itemVariants}
              className="text-center mb-8"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-slate-100 mb-6">Messages</h1>
            <p className="text-xl text-slate-300">Connect and collaborate with your peers</p>
          </motion.div>

          <motion.div
              variants={itemVariants}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 h-[600px]"
          >
            {/* Chat List */}
            <div className="md:col-span-1 bg-slate-700/30 backdrop-blur-lg rounded-xl p-6 shadow-xl flex flex-col">
              <h2 className="text-3xl font-bold text-slate-100 mb-6">Recent Chats</h2>
              <div className="flex-grow overflow-y-auto space-y-4">
                {chats.map((chat) => (
                    <motion.div
                        key={chat.id}
                        whileHover={{ scale: 1.02 }}
                        className={`cursor-pointer p-4 rounded-xl transition-all duration-300 ${
                            activeChatId === chat.id
                                ? 'bg-slate-600/50'
                                : 'bg-slate-600/30 hover:bg-slate-600/40'
                        }`}
                        onClick={() => setActiveChatId(chat.id)}
                    >
                      <h4 className="text-slate-100 font-semibold">{chat.name}</h4>
                      <p className="text-slate-300 text-sm">{chat.lastMessage}</p>
                      <span className="text-slate-400 text-xs">{chat.time}</span>
                    </motion.div>
                ))}
              </div>
              <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={startNewChat}
                  className="w-full mt-4 bg-slate-100 text-slate-800 font-bold py-3 px-4 rounded-full hover:bg-slate-200 transition duration-300 shadow-lg"
              >
                + Start New Chat
              </motion.button>
            </div>

            {/* Chat Box */}
            <motion.div
                variants={itemVariants}
                className="md:col-span-2 bg-slate-700/30 backdrop-blur-lg rounded-xl shadow-xl flex flex-col"
            >
              {activeChatId ? (
                  <>
                    <div className="p-6 border-b border-slate-600/50">
                      <h3 className="text-2xl font-bold text-slate-100">
                        {chats.find((chat) => chat.id === activeChatId)?.name}
                      </h3>
                    </div>
                    <div className="flex-grow overflow-y-auto p-6 space-y-4">
                      {(chatMessages[activeChatId] || []).map((msg, index) => (
                          <motion.div
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              key={index}
                              className={`flex flex-col ${
                                  msg.sender === 'You' ? 'items-end' : 'items-start'
                              }`}
                          >
                            <div className={`max-w-[70%] p-4 rounded-xl ${
                                msg.sender === 'You'
                                    ? 'bg-slate-600/50 text-slate-100'
                                    : 'bg-slate-600/30 text-slate-200'
                            }`}>
                              <p className="text-sm font-semibold text-slate-300 mb-1">{msg.sender}</p>
                              <p className="text-slate-100">{msg.text}</p>
                              <p className="text-xs text-slate-400 mt-2">{msg.time}</p>
                            </div>
                          </motion.div>
                      ))}
                    </div>
                    <form onSubmit={sendMessage} className="p-6 border-t border-slate-600/50">
                      <div className="flex gap-4">
                        <input
                            type="text"
                            placeholder="Type a message..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="flex-grow bg-slate-600/30 text-slate-100 placeholder-slate-400 rounded-xl px-6 py-3 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-opacity-50"
                        />
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            type="submit"
                            className="bg-slate-100 text-slate-800 font-bold px-8 py-3 rounded-full hover:bg-slate-200 transition duration-300 shadow-lg"
                        >
                          Send
                        </motion.button>
                      </div>
                    </form>
                  </>
              ) : (
                  <div className="flex-grow flex items-center justify-center text-center p-8">
                    <div>
                      <div className="text-4xl mb-4">💬</div>
                      <h3 className="text-2xl font-bold text-slate-100 mb-2">Start Messaging</h3>
                      <p className="text-slate-300">Select a chat to begin your conversation</p>
                    </div>
                  </div>
              )}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
  );
};

export default Chat;