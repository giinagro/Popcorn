import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { PostContext } from '../context/PostContext';

export const CommentSection = ({ postId, comments }) => {
  const [text, setText] = useState('');
  const { currentUser } = useContext(AuthContext);
  const { addComment } = useContext(PostContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    addComment(postId, currentUser.username, text);
    setText('');
  };

  return (
    <div className="comments-container">
      <strong>Comentários:</strong>
      <div style={{ margin: '10px 0' }}>
        {comments.length === 0 ? (
          <p style={{ fontSize: '0.85rem', color: '#666' }}>Nenhum comentário ainda.</p>
        ) : (
          comments.map((c) => (
            <div key={c.id} className="comment-item">
              <span className="comment-user">@{c.user}:</span> {c.text}
            </div>
          ))
        )}
      </div>
      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '8px' }}>
        <input
          type="text"
          className="input-retro"
          style={{ marginBottom: 0, padding: '6px' }}
          placeholder="Escreva um comentário..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button type="submit" className="btn-retro btn-retro-secondary" style={{ padding: '6px 12px' }}>
          Enviar
        </button>
      </form>
    </div>
  );
};