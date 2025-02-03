import styles from "./App.module.css"
import NavBar from './components/NavBar'; 
import { Container } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className={styles.App}>
      <NavBar />
      <Container className={styles.Main}>
        <Routes>
          <Route path="/" element={<h1>Home Page</h1>} />
          <Route path="/signin" element={<h1>Sign in</h1>} />
          <Route path="/signup" element={<h1>Sign up</h1>} />
        </Routes>
      </Container>
      </div>
  );
}

export default App;