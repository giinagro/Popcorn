import React, { useContext, useState } from 'react';
import { PostContext } from '../context/PostContext';
import { SearchBar } from '../components/SearchBar';
import { PostCard } from '../components/PostCard';

export const Explore = () => {
  const { posts } = useContext(PostContext);

  const [searchTerm, setSearchTerm] = useState('');
  const [genreFilter, setGenreFilter] = useState('Todos');
  const [minRating, setMinRating] = useState(0);

  // Utilização explícita de filter() e map() conforme requisito
  const filteredPosts = posts.filter((post) => {
    const matchesSearch = post.movieTitle.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGenre = genreFilter === 'Todos' || post.genre === genreFilter;
    const matchesRating = post.rating >= minRating;
    return matchesSearch && matchesGenre && matchesRating;
  });

  return (
    <div>
      <h1 className="retro-title" style={{ marginBottom: '20px' }}>
        Explorar Filmes
      </h1>
      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        genreFilter={genreFilter}
        setGenreFilter={setGenreFilter}
        minRating={minRating}
        setMinRating={setMinRating}
      />

      {filteredPosts.length === 0 ? (
        <div className="post-card" style={{ textAlign: 'center' }}>
          <p>Nenhum filme corresponde aos seus filtros de busca.</p>
        </div>
      ) : (
        filteredPosts.map((post) => <PostCard key={post.id} post={post} />)
      )}
    </div>
  );
};