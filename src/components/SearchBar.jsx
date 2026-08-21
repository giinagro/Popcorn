import React from 'react';

export const SearchBar = ({ searchTerm, setSearchTerm, genreFilter, setGenreFilter, minRating, setMinRating }) => {
  return (
    <div className="post-card" style={{ marginBottom: '20px' }}>
      <h3 style={{ marginBottom: '15px', color: 'var(--cherry-red)' }}>Filtrar Catálogo Retro</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '10px' }}>
        <div>
          <label style={{ fontSize: '0.85rem', fontWeight: 'bold' }}>Pesquisar Título:</label>
          <input
            type="text"
            className="input-retro"
            placeholder="Nome do filme..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div>
  <label style={{ fontSize: '0.85rem', fontWeight: 'bold' }}>Gênero:</label>
  <select className="select-retro" value={genreFilter} onChange={(e) => setGenreFilter(e.target.value)}>
    <option value="Todos">Todos os Gêneros</option>
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
        <div>
          <label style={{ fontSize: '0.85rem', fontWeight: 'bold' }}>Avaliação Mínima:</label>
          <select className="select-retro" value={minRating} onChange={(e) => setMinRating(Number(e.target.value))}>
            <option value={0}>Todas as estrelas</option>
            <option value={5}>5 Estrelas</option>
            <option value={4}>4 Estrelas ou mais</option>
            <option value={3}>3 Estrelas ou mais</option>
          </select>
        </div>
      </div>
    </div>
  );
};