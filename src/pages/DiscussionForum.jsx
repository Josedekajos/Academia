import { useState } from 'react';

function DiscussionForum() {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');

  const handlePost = () => {
    setPosts([...posts, newPost]);
    setNewPost('');
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl text-purple-700 mb-4">Discussion Forum</h1>
      <div className="mb-4">
        <textarea
          className="w-full p-2 border border-gray-300 rounded"
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          placeholder="Write your post here..."
        />
      </div>
      <button
        className="bg-purple-700 text-white py-2 px-4 rounded hover:bg-purple-900 mb-4"
        onClick={handlePost}
      >
        Post
      </button>
      <div className="posts">
        {posts.map((post, index) => (
          <div key={index} className="post bg-white p-4 mb-4 rounded shadow-md">
            {post}
          </div>
        ))}
      </div>
    </div>
  );
}

export default DiscussionForum;