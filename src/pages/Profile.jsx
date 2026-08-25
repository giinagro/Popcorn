import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { PostContext } from '../context/PostContext';
import { FollowlistModal } from './components/Followlistmodal';

export const Profile = () => {
  const {
    currentUser,
    updateProfilePicture,
    unfollowUser,
    getFollowingList,
    getFollowersList,
  } = useContext(AuthContext);
  const { posts } = useContext(PostContext);

  const [avatarInput, setAvatarInput] = useState(currentUser?.avatar || '');
  const [isEditing, setIsEditing] = useState(false);
  const [activeModal, setActiveModal] = useState(null); // 'followers' | 'following' | null

  const userPosts = posts.filter((p) => p.user === currentUser?.username);
  const followingList = getFollowingList();
  const followersList = getFollowersList();

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
          <div className="profile-avatar-wrapper">
            <img
              src={currentUser?.avatar || defaultSilhouette}
              alt={currentUser?.username}
              className="profile-avatar profile-avatar-sm"
            />
            <button
              type="button"
              className="avatar-edit-btn"
              onClick={() => setIsEditing((prev) => !prev)}
              title={currentUser?.avatar ? 'Alterar Foto de Perfil' : 'Adicionar Foto de Perfil'}
              aria-label="Editar foto de perfil"
            >
              ✎
            </button>
          </div>

          <div className="profile-details">
            <h1 className="retro-title" style={{ color: 'var(--wine-red)', fontSize: '2.2rem' }}>
              Perfil do Cinéfilo
            </h1>
            <p style={{ marginBottom: '10px' }}><strong>@{currentUser?.username}</strong></p>

            <div className="profile-stats-row">
              <div>
                <strong>{userPosts.length}</strong> Indicações
              </div>
              <div onClick={() => setActiveModal('followers')}>
                <strong>{followersList.length}</strong> Seguidores
              </div>
              <div onClick={() => setActiveModal('following')}>
                <strong>{followingList.length}</strong> Seguindo
              </div>
            </div>

            {isEditing && (
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

      <FollowListModal
        isOpen={activeModal === 'followers'}
        onClose={() => setActiveModal(null)}
        title="Seguidores"
        users={followersList}
      />

      <FollowListModal
        isOpen={activeModal === 'following'}
        onClose={() => setActiveModal(null)}
        title="Seguindo"
        users={followingList}
        onUnfollow={unfollowUser}
      />
    </div>
  );
};
