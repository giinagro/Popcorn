import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const savedSession = localStorage.getItem('popcorn_session');
    if (savedSession) {
      setCurrentUser(JSON.parse(savedSession));
    }
  }, []);

  const register = (username, password) => {
    const users = JSON.parse(localStorage.getItem('popcorn_users') || '[]');
    const userExists = users.some((u) => u.username.toLowerCase() === username.toLowerCase());

    if (userExists) {
      return { success: false, message: 'Usuário já cadastrado.' };
    }

    const newUser = { id: Date.now().toString(), username, password, avatar: '' };
    users.push(newUser);
    localStorage.setItem('popcorn_users', JSON.stringify(users));

    const sessionData = { id: newUser.id, username: newUser.username, avatar: '' };
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

    const sessionData = { id: user.id, username: user.username, avatar: user.avatar || '' };
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
  };

  const logout = () => {
    localStorage.removeItem('popcorn_session');
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ currentUser, register, login, logout, updateProfilePicture }}>
      {children}
    </AuthContext.Provider>
  );
};