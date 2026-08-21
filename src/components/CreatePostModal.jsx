import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { PostContext } from '../context/PostContext';

export const CreatePostModal = ({ isOpen, onClose }) => {
  const { currentUser } = useContext(AuthContext);
  const { addPost } = useContext(PostContext);

  const [movieTitle, setMovieTitle] = useState('');
  const [year, setYear] = useState('');
  const [genre, setGenre] = useState('Noir');
  const [rating, setRating] = useState(5);
  const [poster, setPoster] = useState('');
  const [description, setDescription] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!movieTitle || !year || !description) return;

    addPost({
      user: currentUser.username,
      movieTitle,
      year,
      genre,
      rating: Number(rating),
      poster: poster || 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400',
      description
    });

    onClose();
    setMovieTitle('');
    setYear('');
    setDescription('');
    setPoster('');
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 style={{ color: 'var(--cherry-red)', marginBottom: '15px' }}>Nova Indicação</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="input-retro"
            placeholder="Título do Filme ou Série"
            value={movieTitle}
            onChange={(e) => setMovieTitle(e.target.value)}
            required
          />
          <div style={{ display: 'flex', gap: '10px' }}>
            <input
              type="text"
              className="input-retro"
              placeholder="Ano (Ex: 1954)"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              required
            />
            <select className="select-retro" value={genre} onChange={(e) => setGenre(e.target.value)}>
              <option value="Ação">Ação</option>
              <option value="Animação">Animação</option>
              <option value="Aventura">Aventura</option>
              <option value="Comédia">Comédia</option>
              <option value="Crime">Crime</option>
              <option value="Documentário">Documentário</option>
              <option value="Drama">Drama</option>
              <option value="Espionagem">Espionagem</option>
              <option value="Família">Família</option>
              <option value="Fantasia">Fantasia</option>
              <option value="Faroeste">Faroeste</option>
              <option value="Ficção Científica">Ficção Científica</option>
              <option value="Guerra">Guerra</option>
              <option value="Mistério">Mistério</option>
              <option value="Musical">Musical</option>
              <option value="Noir">Noir</option>
              <option value="Romance">Romance</option>
              <option value="Suspense">Suspense</option>
              <option value="Terror">Terror</option>
            </select>
          </div>
          <label style={{ fontSize: '0.85rem', fontWeight: 'bold' }}>Estrelas (1 a 5):</label>
          <select className="select-retro" value={rating} onChange={(e) => setRating(e.target.value)}>
            <option value={5}>★★★★★ (5)</option>
            <option value={4}>★★★★☆ (4)</option>
            <option value={3}>★★★☆☆ (3)</option>
            <option value={2}>★★☆☆☆ (2)</option>
            <option value={1}>★☆☆☆☆ (1)</option>
          </select>
          <input
            type="url"
            className="input-retro"
            placeholder="URL da Imagem/Poster (Opcional)"
            value={poster}
            onChange={(e) => setPoster(e.target.value)}
          />
          <textarea
            className="textarea-retro"
            rows="3"
            placeholder="O que achou deste filme?"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
            <button type="button" className="btn-retro btn-retro-secondary" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="btn-retro">
              Publicar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};