import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { PostContext } from '../context/PostContext';

export const LeftSidebar = () => {
  const { currentUser, isFollowing, followUser, unfollowUser } = useContext(AuthContext);
  const { posts } = useContext(PostContext);

  const defaultSilhouette = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23721121'><path d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z'/></svg>";

  const myLikedPostIds = posts
    .filter((post) => post.likes.includes(currentUser?.username))
    .map((post) => post.id);

  const otherUsersMap = {};

  posts.forEach((post) => {
    if (post.user !== currentUser?.username) {
      if (!otherUsersMap[post.user]) {
        otherUsersMap[post.user] = {
          username: post.user,
          sharedLikesCount: 0,
          favoriteGenres: new Set(),
        };
      }
      otherUsersMap[post.user].favoriteGenres.add(post.genre || 'Cinema');
      if (myLikedPostIds.includes(post.id)) {
        otherUsersMap[post.user].sharedLikesCount += 1;
      }
    }
  });

  const suggestedFriends = Object.values(otherUsersMap);

  const toggleFollow = (username) => {
    if (isFollowing(username)) {
      unfollowUser(username);
    } else {
      followUser(username);
    }
  };

  return (
    <aside className="sidebar sidebar-left">
      <div className="sidebar-header">
        <span className="marquee-dot"></span>
        <h3 className="sidebar-title">CINÉFILOS SEMELHANTES </h3>
        <span className="marquee-dot"></span>
      </div>

      <div className="sidebar-content">
        <p className="sidebar-subtitle">Pessoas com gostos parecidos nos filmes que você curtiu:</p>

        {suggestedFriends.length === 0 ? (
          <div className="empty-sidebar-box">Curta postagens no Feed para ver sugestões de amigos!</div>
        ) : (
          suggestedFriends.map((friend) => (
            <div key={friend.username} className="friend-card">
              <img
                src={defaultSilhouette}
                alt={friend.username}
                className="friend-avatar"
              />
              <div className="friend-info">
                <span className="friend-name">@{friend.username}</span>
                <span className="friend-match">
                  {friend.sharedLikesCount > 0
                    ? `${friend.sharedLikesCount} filme(s) em comum`
                    : `Curte ${Array.from(friend.favoriteGenres)[0] || 'Cinema'}`}
                </span>
                <button
                  className={`btn-follow ${isFollowing(friend.username) ? 'following' : ''}`}
                  onClick={() => toggleFollow(friend.username)}
                >
                  {isFollowing(friend.username) ? '✓ Seguindo' : '+ Seguir'}
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </aside>
  );
};