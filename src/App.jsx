import React, { useContext, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext, AuthProvider } from './context/AuthContext';
import { PostProvider } from './context/PostContext';
import { Navbar } from './components/Navbar';
import { CreatePostModal } from './components/CreatePostModal';
import { Auth } from './pages/Auth';
import { Feed } from './pages/Feed';
import { Explore } from './pages/Explore';
import { Profile } from './pages/Profile';

const MainLayout = () => {
  const { currentUser } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!currentUser) {
    return <Auth />;
  }

  return (
    <div className="app-container">
      <Navbar onOpenCreateModal={() => setIsModalOpen(true)} />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Feed onOpenCreateModal={() => setIsModalOpen(true)} />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <CreatePostModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <PostProvider>
          <MainLayout />
        </PostProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}