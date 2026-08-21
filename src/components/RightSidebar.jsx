import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { PostContext } from '../context/PostContext';

const CLASSIC_SUGGESTIONS = [
  { id: 'm1', title: 'Rear Window', year: '1954', genre: 'Noir', poster: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=300', rating: 5 },
  { id: 'm2', title: 'Vertigo', year: '1958', genre: 'Noir', poster: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=300', rating: 5 },
  { id: 'm3', title: 'Singin in the Rain', year: '1952', genre: 'Musical', poster: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=300', rating: 5 },
  { id: 'm4', title: '12 Angry Men', year: '1957', genre: 'Drama', poster: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=300', rating: 5 },
  { id: 'm5', title: 'Some Like It Hot', year: '1959', genre: 'Comédia', poster: 'https://images.unsplash.com/photo-1518676599625-5832b35d7237?w=300', rating: 4 },
];

export const RightSidebar = ({ onOpenCreateModal }) => {
  const { currentUser } = useContext(AuthContext);
  const { posts } = useContext(PostContext);

  const myPosts = posts.filter((p) => p.user === currentUser?.username);
  const myGenres = myPosts.map((p) => p.genre);

  const recommendations = CLASSIC_SUGGESTIONS.filter((movie) => {
    if (myGenres.length === 0) return true;
    return myGenres.includes(movie.genre) || movie.rating === 5;
  }).slice(0, 3);

  return (
    <aside className="sidebar sidebar-right">
      <div className="sidebar-header">
        <span className="marquee-dot"></span>
        <h3 className="sidebar-title">SESSÃO RECOMENDADA</h3>
        <span className="marquee-dot"></span>
      </div>

      <div className="sidebar-content">
        <span className="cinema-stamp">EM EXIBIÇÃO</span>

        {recommendations.map((movie) => (
          <div key={movie.id} className="recommendation-card">
            <img src={movie.poster} alt={movie.title} className="rec-poster" />
            <div className="rec-details">
              <h4 className="rec-title">{movie.title}</h4>
              <p className="rec-meta">{movie.year} • {movie.genre}</p>
              <div className="rec-stars">{'★'.repeat(movie.rating)}</div>
              <button
                className="btn-retro btn-retro-gold btn-rec-action"
                onClick={onOpenCreateModal}
              >
                + Indicar
              </button>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};