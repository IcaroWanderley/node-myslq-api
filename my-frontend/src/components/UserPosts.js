import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserPosts = () => {
  const [posts, setPosts] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [editingPost, setEditingPost] = useState(null);
  const [newPost, setNewPost] = useState({ title: '', content: '', image_url: '', category_id: '' });

  const fetchPosts = async (page) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:5000/api/posts?page=${page}&limit=10`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setPosts(response.data.posts);
      setTotalPages(response.data.totalPages);
      setCurrentPage(response.data.currentPage);
    } catch (error) {
      console.error('Fetch posts error:', error.response || error.message);
      setErrorMessage('Failed to fetch posts. Please try again.');
    }
  };

  useEffect(() => {
    fetchPosts(currentPage);
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPost({ ...newPost, [name]: value });
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditingPost({ ...editingPost, [name]: value });
  };

  const handleCreatePost = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/posts', newPost, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      fetchPosts(currentPage);
      setNewPost({ title: '', content: '', image_url: '', category_id: '' });
    } catch (error) {
      console.error('Create post error:', error.response || error.message);
      setErrorMessage('Failed to create post. Please try again.');
    }
  };

  const handleUpdatePost = async (id) => {
    try {
      const token = localStorage.getItem('token');
      console.log('Updating post:', editingPost);  // Debugging log
      await axios.put(`http://localhost:5000/api/posts/${id}`, editingPost, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      fetchPosts(currentPage);
      setEditingPost(null);
    } catch (error) {
      console.error('Update post error:', error.response || error.message);
      setErrorMessage('Failed to update post. Please try again.');
    }
  };

  const handleDeletePost = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/posts/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      fetchPosts(currentPage);
    } catch (error) {
      console.error('Delete post error:', error.response || error.message);
      setErrorMessage('Failed to delete post. Please try again.');
    }
  };

  return (
    <div>
      <h1>Your Posts</h1>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <div>
        <h2>Create New Post</h2>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={newPost.title}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="content"
          placeholder="Content"
          value={newPost.content}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="image_url"
          placeholder="Image URL"
          value={newPost.image_url}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="category_id"
          placeholder="Category ID"
          value={newPost.category_id}
          onChange={handleInputChange}
        />
        <button onClick={handleCreatePost}>Create Post</button>
      </div>
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            {editingPost && editingPost.id === post.id ? (
              <div>
                <input
                  type="text"
                  name="title"
                  value={editingPost.title}
                  onChange={handleEditInputChange}
                />
                <input
                  type="text"
                  name="content"
                  value={editingPost.content}
                  onChange={handleEditInputChange}
                />
                <input
                  type="text"
                  name="image_url"
                  value={editingPost.image_url}
                  onChange={handleEditInputChange}
                />
                <input
                  type="number"
                  name="category_id"
                  value={editingPost.category_id}
                  onChange={handleEditInputChange}
                />
                <button onClick={() => handleUpdatePost(post.id)}>Save</button>
                <button onClick={() => setEditingPost(null)}>Cancel</button>
              </div>
            ) : (
              <div>
                <h3>{post.title}</h3>
                <p>{post.content}</p>
                <button onClick={() => setEditingPost(post)}>Edit</button>
                <button onClick={() => handleDeletePost(post.id)}>Delete</button>
              </div>
            )}
          </li>
        ))}
      </ul>
      <div>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            disabled={currentPage === index + 1}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default UserPosts;
