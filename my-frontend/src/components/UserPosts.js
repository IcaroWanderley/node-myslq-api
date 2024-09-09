import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserPosts = () => {
  const [posts, setPosts] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/posts'); // Ajuste a URL conforme necessário
        console.log('Fetched posts:', response.data); // Adicione este log
        setPosts(response.data);
      } catch (error) {
        console.log('Fetch posts error:', error.response || error.message); // Adicione este log
        setErrorMessage('Failed to fetch posts. Please try again.');
      }
    };

    fetchPosts();
  }, []);

  return (
    <div>
      <h1>Your Posts</h1>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <ul>
        {posts.map(post => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserPosts;