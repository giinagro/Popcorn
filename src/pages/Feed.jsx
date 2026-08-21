import React, { useContext } from 'react';
import { PostContext } from '../context/PostContext';
import { PostCard } from '../components/PostCard';
import { LeftSidebar } from '../components/LeftSidebar';
import { RightSidebar } from '../components/RightSidebar';

export const Feed = ({ onOpenCreateModal }) => {
  const { posts } = useContext(PostContext);

  return (
    <div className="feed-layout">
      {/* Barra Lateral Esquerda: Sugestões de Amigos */}
      <LeftSidebar />

      {/* Conteúdo Principal do Feed */}
      <div className="feed-main">
        <div className="feed-banner-marquee">
          <div className="marquee-bulbs"><span></span><span></span><span></span><span></span><span></span></div>
          <h1 className="retro-title feed-title">CARTAZ DO DIA • EM EXIBIÇÃO</h1>
          <div className="marquee-bulbs"><span></span><span></span><span></span><span></span><span></span></div>
        </div>

        {posts.length === 0 ? (
          <p>Nenhuma publicação encontrada no feed.</p>
        ) : (
          posts.map((post) => <PostCard key={post.id} post={post} />)
        )}
      </div>

      {/* Barra Lateral Direita: Sugestões de Filmes */}
      <RightSidebar onOpenCreateModal={onOpenCreateModal} />
    </div>
  );
};