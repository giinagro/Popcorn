import React from 'react';

const defaultSilhouette = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23721121'><path d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z'/></svg>";

// Popup genérico para exibir "Seguidores" ou "Seguindo".
// Quando onUnfollow é passado, cada item ganha um botão para deixar de seguir na hora.
export const FollowListModal = ({ isOpen, onClose, title, users, onUnfollow }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content follow-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="follow-modal-header">
          <h2 style={{ color: 'var(--wine-red)' }}>{title}</h2>
          <button className="follow-modal-close" onClick={onClose} aria-label="Fechar">
            ✕
          </button>
        </div>

        {users.length === 0 ? (
          <p style={{ color: 'var(--text-muted)', padding: '10px 0' }}>
            {onUnfollow ? 'Você ainda não segue ninguém.' : 'Ainda não há seguidores.'}
          </p>
        ) : (
          <div className="follow-list">
            {users.map((user) => (
              <div key={user.username} className="follow-list-item">
                <img
                  src={user.avatar || defaultSilhouette}
                  alt={user.username}
                  className="friend-avatar"
                />
                <span className="follow-list-username">@{user.username}</span>
                {onUnfollow && (
                  <button
                    className="btn-follow following"
                    onClick={() => onUnfollow(user.username)}
                  >
                    Deixar de seguir
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};