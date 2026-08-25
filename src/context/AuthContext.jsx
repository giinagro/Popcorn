import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    const savedSession = localStorage.getItem('popcorn_session');
    if (savedSession) {
      setCurrentUser(JSON.parse(savedSession));
    }
    const savedUsers = localStorage.getItem('popcorn_users');
    if (savedUsers) {
      setAllUsers(JSON.parse(savedUsers));
    }
  }, []);

  const register = (username, password) => {
    const users = JSON.parse(localStorage.getItem('popcorn_users') || '[]');
    const userExists = users.some((u) => u.username.toLowerCase() === username.toLowerCase());

    if (userExists) {
      return { success: false, message: 'Usuário já cadastrado.' };
    }

    const newUser = { id: Date.now().toString(), username, password, avatar: '', following: [] };
    users.push(newUser);
    localStorage.setItem('popcorn_users', JSON.stringify(users));
    setAllUsers(users);

    const sessionData = { id: newUser.id, username: newUser.username, avatar: '', following: [] };
    localStorage.setItem('popcorn_session', JSON.stringify(sessionData));
    setCurrentUser(sessionData);
    return { success: true };
  };

  const login = (username, password) => {
    const users = JSON.parse(localStorage.getItem('popcorn_users') || '[]');
    const user = users.find(
      (u) => u.username.toLowerCase() === username.toLowerCase() && u.password === password
    );

    if (!user) {
      return { success: false, message: 'Credenciais inválidas.' };
    }

    const sessionData = { id: user.id, username: user.username, avatar: user.avatar || '', following: user.following || [] };
    localStorage.setItem('popcorn_session', JSON.stringify(sessionData));
    setCurrentUser(sessionData);
    return { success: true };
  };

  const updateProfilePicture = (avatarUrl) => {
    if (!currentUser) return;

    const updatedSession = { ...currentUser, avatar: avatarUrl };
    localStorage.setItem('popcorn_session', JSON.stringify(updatedSession));
    setCurrentUser(updatedSession);

    const users = JSON.parse(localStorage.getItem('popcorn_users') || '[]');
    const updatedUsers = users.map((u) =>
      u.id === currentUser.id ? { ...u, avatar: avatarUrl } : u
    );
    localStorage.setItem('popcorn_users', JSON.stringify(updatedUsers));
    setAllUsers(updatedUsers);
  };

  const logout = () => {
    localStorage.removeItem('popcorn_session');
    setCurrentUser(null);
  };

  // Segue um usuário pelo username, persistindo a lista no usuário logado
  const followUser = (username) => {
    if (!currentUser || username === currentUser.username) return;

    const currentFollowing = currentUser.following || [];
    if (currentFollowing.includes(username)) return;

    const updatedFollowing = [...currentFollowing, username];
    const updatedSession = { ...currentUser, following: updatedFollowing };
    localStorage.setItem('popcorn_session', JSON.stringify(updatedSession));
    setCurrentUser(updatedSession);

    const users = JSON.parse(localStorage.getItem('popcorn_users') || '[]');
    const updatedUsers = users.map((u) =>
      u.id === currentUser.id ? { ...u, following: updatedFollowing } : u
    );
    localStorage.setItem('popcorn_users', JSON.stringify(updatedUsers));
    setAllUsers(updatedUsers);
  };

  // Deixa de seguir um usuário e atualiza a lista imediatamente
  const unfollowUser = (username) => {
    if (!currentUser) return;

    const currentFollowing = currentUser.following || [];
    const updatedFollowing = currentFollowing.filter((u) => u !== username);
    const updatedSession = { ...currentUser, following: updatedFollowing };
    localStorage.setItem('popcorn_session', JSON.stringify(updatedSession));
    setCurrentUser(updatedSession);

    const users = JSON.parse(localStorage.getItem('popcorn_users') || '[]');
    const updatedUsers = users.map((u) =>
      u.id === currentUser.id ? { ...u, following: updatedFollowing } : u
    );
    localStorage.setItem('popcorn_users', JSON.stringify(updatedUsers));
    setAllUsers(updatedUsers);
  };

  const isFollowing = (username) => (currentUser?.following || []).includes(username);

  // Retorna os dados (username + avatar) de quem o usuário logado segue
  const getFollowingList = () => {
    return (currentUser?.following || []).map((username) => {
      const user = allUsers.find((u) => u.username === username);
      return { username, avatar: user?.avatar || '' };
    });
  };

  // Retorna os dados (username + avatar) de quem segue o usuário logado
  const getFollowersList = () => {
    return allUsers
      .filter((u) => (u.following || []).includes(currentUser?.username))
      .map((u) => ({ username: u.username, avatar: u.avatar || '' }));
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        register,
        login,
        logout,
        updateProfilePicture,
        followUser,
        unfollowUser,
        isFollowing,
        getFollowingList,
        getFollowersList,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};