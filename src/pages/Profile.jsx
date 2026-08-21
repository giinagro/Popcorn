import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { PostContext } from '../context/PostContext';

export const Profile = () => {
  const { currentUser, updateProfilePicture } = useContext(AuthContext);
  const { posts } = useContext(PostContext);

  const [avatarInput, setAvatarInput] = useState(currentUser?.avatar || '');
  const [isEditing, setIsEditing] = useState(false);

  const userPosts = posts.filter((p) => p.user === currentUser?.username);

  // Silhueta neutra padrão em SVG
  const defaultSilhouette = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23721121'><path d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z'/></svg>";

  // Converte o arquivo selecionado para Base64
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarInput(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveAvatar = (e) => {
    e.preventDefault();
    if (avatarInput) {
      updateProfilePicture(avatarInput);
      setIsEditing(false);
    }
  };

  return (
    <div>
      <div className="post-card profile-card">
        <div className="profile-header">
          <img
            src={currentUser?.avatar || defaultSilhouette}
            alt={currentUser?.username}
            className="profile-avatar"
          />
          <div className="profile-details">
            <h1 className="retro-title" style={{ color: 'var(--wine-red)', fontSize: '2.2rem' }}>
              Perfil do Cinéfilo
            </h1>
            <p><strong>Usuário:</strong> @{currentUser?.username}</p>
            <p><strong>Total de Indicações:</strong> {userPosts.length}</p>

            {!isEditing ? (
              <button
                className="btn-retro btn-retro-gold"
                style={{ marginTop: '10px', padding: '6px 14px', fontSize: '0.8rem' }}
                onClick={() => setIsEditing(true)}
              >
                {currentUser?.avatar ? 'Alterar Foto de Perfil' : 'Adicionar Foto de Perfil'}
              </button>
            ) : (
              <form onSubmit={handleSaveAvatar} style={{ marginTop: '12px' }}>
                <input
                  type="file"
                  accept="image/*"
                  className="input-retro"
                  onChange={handleFileChange}
                  required
                />
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button type="submit" className="btn-retro" style={{ padding: '6px 12px', fontSize: '0.8rem' }}>
                    Salvar Foto
                  </button>
                  <button
                    type="button"
                    className="btn-retro btn-retro-secondary"
                    style={{ padding: '6px 12px', fontSize: '0.8rem' }}
                    onClick={() => {
                      setIsEditing(false);
                      setAvatarInput(currentUser?.avatar || '');
                    }}
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>

      <h2 className="retro-title" style={{ marginTop: '30px', marginBottom: '15px' }}>
        Minhas Indicações (Galeria)
      </h2>

      {userPosts.length === 0 ? (
        <p>Você ainda não fez nenhuma indicação de filme.</p>
      ) : (
        <div className="profile-gallery">
          {userPosts.map((post) => (
            <div key={post.id} className="gallery-item">
              <img src={post.poster} alt={post.movieTitle} />
              <h4 style={{ margin: '8px 0 4px', color: 'var(--wine-red)' }}>{post.movieTitle}</h4>
              <p style={{ fontSize: '0.8rem' }}>★ {post.rating}/5 ({post.year})</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};