import styles from './App.module.css';
import NavBar from './components/NavBar';
import { Container } from 'react-bootstrap';
import { Routes, Route } from 'react-router-dom';
import './api/axiosDefault';
import SignUpForm from './pages/auth/SignUpForm';
import SignInForm from './pages/auth/SignInForm';
import PostCreateForm from './pages/posts/PostCreateForm';
import PostsPage from './pages/posts/PostsPage';
import PostsList from './pages/posts/PostsList';


function App() {
  return (
    <div className={styles.App}>
      <NavBar />
      <Container className={styles.Main}>
        <Routes>
          <Route path="/" element={<h1>Home Page</h1>} />
          <Route path="/feed" element={<PostsList />} />
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/signin" element={<SignInForm />} />
          <Route path="/posts/create" element={<PostCreateForm />} />
          <Route path="/posts/:id" element={<PostsPage />} />
          <Route path="*" element={<h1>Page not found!</h1>} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
