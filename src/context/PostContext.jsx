import React, { createContext, useState, useEffect } from 'react';

export const PostContext = createContext();

const initialPosts = [
  {
    id: '1',
    user: 'RitaHayworth',
    movieTitle: 'Sunset Boulevard',
    year: '1950',
    genre: 'Noir',
    rating: 5,
    poster: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400',
    description: 'Um clássico absoluto sobre os bastidores de Hollywood! Norma Desmond é inesquecível.',
    likes: ['RitaHayworth'],
    comments: [
      { id: 'c1', user: 'HumphreyB', text: 'Atuação fantástica da Gloria Swanson!' }
    ]
  },
  {
    id: '2',
    user: 'HumphreyB',
    movieTitle: 'Singin in the Rain',
    year: '1952',
    genre: 'Musical',
    rating: 5,
    poster: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=400',
    description: 'A energia e o carisma de Gene Kelly continuam insuperáveis. Recomendo muito!',
    likes: [],
    comments: []
  }
];

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const savedPosts = localStorage.getItem('popcorn_posts');
    if (savedPosts) {
      setPosts(JSON.parse(savedPosts));
    } else {
      setPosts(initialPosts);
      localStorage.setItem('popcorn_posts', JSON.stringify(initialPosts));
    }
  }, []);

  const savePostsToStorage = (updatedPosts) => {
    setPosts(updatedPosts);
    localStorage.setItem('popcorn_posts', JSON.stringify(updatedPosts));
  };

  const addPost = (newPost) => {
    const postWithMeta = {
      ...newPost,
      id: Date.now().toString(),
      likes: [],
      comments: []
    };
    const updated = [postWithMeta, ...posts];
    savePostsToStorage(updated);
  };

  const toggleLike = (postId, username) => {
    const updated = posts.map((post) => {
      if (post.id === postId) {
        const hasLiked = post.likes.includes(username);
        const newLikes = hasLiked
          ? post.likes.filter((u) => u !== username)
          : [...post.likes, username];
        return { ...post, likes: newLikes };
      }
      return post;
    });
    savePostsToStorage(updated);
  };

  const addComment = (postId, username, text) => {
    const updated = posts.map((post) => {
      if (post.id === postId) {
        const newComment = { id: Date.now().toString(), user: username, text };
        return { ...post, comments: [...post.comments, newComment] };
      }
      return post;
    });
    savePostsToStorage(updated);
  };

  return (
    <PostContext.Provider value={{ posts, addPost, toggleLike, addComment }}>
      {children}
    </PostContext.Provider>
  );
};