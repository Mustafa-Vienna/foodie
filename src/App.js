import React from "react";
import styles from './App.module.css';
import sharedStyles from './styles/SharedStyles.module.css';
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
// import LikedPage from "./pages/likes/LikedPage";

function App() {
  return (
    <CurrentUserProvider>
      <div className={sharedStyles.pageContainer}>
        <NavBar />
        <Container className={styles.Main}>
          <div className={`${styles.Content} ${sharedStyles.contentContainer}`}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/feed" element={<PostListPage />} />
              {/* <Route path="/liked" element={<LikedPage />} /> */}
              <Route path="/signup" element={<SignUpForm />} />
              <Route path="/signin" element={<SignInForm />} />
              <Route path="/posts/create" element={<PostCreateForm />} />
              <Route path="/posts/:id" element={<PostDetailPage />} />
              <Route path="*" element={<h1>Page not found!</h1>} />
            </Routes>
          </div>
        </Container>
      </div>
    </CurrentUserProvider>
  );
}

export default App;