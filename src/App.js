import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import ProductList from './components/ProductList';
import CadastroProduto from './components/CadastroProduto'; 

function App() {
  const [token, setToken] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: 'admin', password: '1234' }),
      });

      const data = await response.json();
      console.log('Token recebido após login:', data.access);
      setToken(data.access);
    } catch (error) {
      console.error('Erro ao fazer login:', error);
    }
  };

  return (
    <div className="app">
    <Router>
      {!token ? (
        <Login onLogin={handleLogin} />
      ) : (
        <Routes>
        <Route path="/" element={<ProductList token={token} />} />
        <Route path="/cadastro-produto" element={<CadastroProduto token={token} />} />
      </Routes>
      )}
    </Router>
  </div>
  );
}

export default App;
