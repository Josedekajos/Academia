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
    <div className="container mx-auto p-4">
      <div className="header flex justify-between items-center mb-4">
        <h1 className="text-2xl text-purple-700">Create Study Group</h1>
        <button className="btn bg-purple-700 text-white py-2 px-4 rounded hover:bg-purple-900" onClick={() => setShowChat(false)}>+ Create Study Group</button>
      </div>

      {!showChat ? (
        <div className="modal-content bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl text-center text-purple-700 mb-4">Create Study Group</h2>
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
            className="btn bg-purple-700 text-white py-2 px-4 rounded hover:bg-purple-900 w-full"
            onClick={handleCreateGroup}
          >
            Create Group
          </button>
        </div>
      ) : (
        <div className="chat-container bg-white p-6 rounded-lg shadow-lg">
          <div className="chat-header bg-purple-700 text-white p-4 rounded-t-lg text-center">
            {groupName}
          </div>
          <div className="chat-body bg-gray-100 p-4 h-64 overflow-y-auto" id="chat-body">
            {/* Messages will appear here */}
          </div>
          <div className="chat-input flex p-2 border-t border-gray-300">
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
              className="bg-purple-700 text-white py-2 px-4 rounded ml-2"
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