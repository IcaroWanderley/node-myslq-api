import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import SignUp from './components/SignUp';
import UserPosts from './components/UserPosts'; // Importe o novo componente

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <nav>
            <ul>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/signup">Sign Up</Link>
              </li>
            </ul>
          </nav>
        </header>
        <main>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/posts" element={<UserPosts />} /> {/* Adicione a nova rota */}
            <Route path="/" element={<h1>Welcome to the Task Manager</h1>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;