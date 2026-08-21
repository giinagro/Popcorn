import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { PostContext } from '../context/PostContext';
import { CommentSection } from './CommentSection';

export const PostCard = ({ post }) => {
  const { currentUser } = useContext(AuthContext);
  const { toggleLike } = useContext(PostContext);
  const [showComments, setShowComments] = useState(false);

  const isLiked = post.likes.includes(currentUser?.username);

  const renderStars = (count) => {
    return '★'.repeat(count) + '☆'.repeat(5 - count);
  };

  return (
    <div className="post-card">
      <div className="post-header">
        <span className="post-author">@{post.user}</span>
        <span style={{ fontSize: '0.85rem', background: '#e5a93c', padding: '2px 8px', border: '1px solid #1a1a1a' }}>
          {post.genre || 'Geral'}
        </span>
      </div>

      <div className="post-body">
        <img src={post.poster} alt={post.movieTitle} className="post-poster" />
        <div className="post-info">
          <h2 className="movie-title">{post.movieTitle}</h2>
          <div className="movie-year">Ano de Lançamento: {post.year}</div>
          <div className="star-rating">{renderStars(post.rating)}</div>
          <p className="post-description">{post.description}</p>
        </div>
      </div>

      <div className="post-actions">
        <button className="like-btn" onClick={() => toggleLike(post.id, currentUser.username)}>
          {isLiked ? '❤️ Curtido' : '🤍 Curtir'} ({post.likes.length})
        </button>
        <button className="like-btn" onClick={() => setShowComments(!showComments)}>
          💬 Comentários ({post.comments.length})
        </button>
      </div>

      {showComments && <CommentSection postId={post.id} comments={post.comments} />}
    </div>
  );
};