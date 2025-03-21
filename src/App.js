// src/App.js
import React from "react";
import styles from './App.module.css';
import NavBar from './components/NavBar';
import { Container } from 'react-bootstrap';
import { Routes, Route } from 'react-router-dom';
import './api/axiosDefault';
import SignUpForm from './pages/auth/SignUpForm';
import SignInForm from './pages/auth/SignInForm';
import PostCreateForm from './pages/posts/PostCreateForm';
import PostDetailPage from './pages/posts/PostDetailPage';
import PostListPage from './pages/posts/PostListPage';
import HomePage from './pages/posts/HomePage';
import { CurrentUserProvider } from "./contexts/CurrentUserContext";

function App() {
  return (
    <CurrentUserProvider>
      <div className={styles.App}>
        <NavBar />
        <Container className={styles.Main}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/feed" element={<PostListPage />} />
            <Route path="/signup" element={<SignUpForm />} />
            <Route path="/signin" element={<SignInForm />} />
            <Route path="/posts/create" element={<PostCreateForm />} />
            <Route path="/posts/:id" element={<PostDetailPage />} />
            <Route path="*" element={<h1>Page not found!</h1>} />
          </Routes>
        </Container>
      </div>
    </CurrentUserProvider>
  );
}

export default App;