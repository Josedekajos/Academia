import { useState } from 'react';

function CreateGroup() {
  const [groupName, setGroupName] = useState('');
  const [groupDescription, setGroupDescription] = useState('');
  const [groupPublicity, setGroupPublicity] = useState('public');
  const [showChat, setShowChat] = useState(false);

  const handleCreateGroup = () => {
    if (groupName === '') {
      alert('Please enter a group name.');
      return;
    }
    setShowChat(true);
  };

  const sendMessage = (message) => {
    const chatBody = document.getElementById('chat-body');
    const messageDiv = document.createElement('div');
    messageDiv.className = 'mb-2';
    messageDiv.innerText = 'You: ' + message;
    chatBody.appendChild(messageDiv);
    chatBody.scrollTop = chatBody.scrollHeight;
  };

  return (
    <div className="container p-4 mx-auto">
      <div className="flex items-center justify-between mb-4 header">
        <h1 className="text-2xl text-purple-700">Create Study Group</h1>
        <button className="px-4 py-2 text-white bg-purple-700 rounded btn hover:bg-purple-900" onClick={() => setShowChat(false)}>+ Create Study Group</button>
      </div>

      {!showChat ? (
        <div className="p-6 bg-white rounded-lg shadow-lg modal-content">
          <h2 className="mb-4 text-xl text-center text-purple-700">Create Study Group</h2>
          <div className="mb-4">
            <label className="block text-gray-700">Group Name</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              placeholder="Enter group name"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Description</label>
            <textarea
              className="w-full p-2 border border-gray-300 rounded"
              value={groupDescription}
              onChange={(e) => setGroupDescription(e.target.value)}
              rows="3"
              placeholder="Enter group description"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Publicity</label>
            <select
              className="w-full p-2 border border-gray-300 rounded"
              value={groupPublicity}
              onChange={(e) => setGroupPublicity(e.target.value)}
            >
              <option value="public">Public</option>
              <option value="private">Private</option>
            </select>
          </div>
          <button
            className="w-full px-4 py-2 text-white bg-purple-700 rounded btn hover:bg-purple-900"
            onClick={handleCreateGroup}
          >
            Create Group
          </button>
        </div>
      ) : (
        <div className="p-6 bg-white rounded-lg shadow-lg chat-container">
          <div className="p-4 text-center text-white bg-purple-700 rounded-t-lg chat-header">
            {groupName}
          </div>
          <div className="h-64 p-4 overflow-y-auto bg-gray-100 chat-body" id="chat-body">
            {/* Messages will appear here */}
          </div>
          <div className="flex p-2 border-t border-gray-300 chat-input">
            <input
              type="text"
              className="flex-1 p-2 border border-gray-300 rounded"
              placeholder="Type a message..."
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  sendMessage(e.target.value);
                  e.target.value = '';
                }
              }}
            />
            <button
              className="px-4 py-2 ml-2 text-white bg-purple-700 rounded"
              onClick={() => {
                const input = document.querySelector('.chat-input input');
                sendMessage(input.value);
                input.value = '';
              }}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CreateGroup;