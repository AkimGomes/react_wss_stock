import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login/Login';
import ProductList from './components/ListaProdutos/ProductList';
import CadastroProduto from './components/CadastroProduto';
import AtualizaProduto from './components/AtualizaProduto/AtualizaProduto';
import ListaVendas from './components/ListaVendas/ListaVendas';
import CadastroVenda from './components/CadastroVenda/CadastroVenda';
import ListaOrcamentos from './components/ListaOrcamentos/ListaOrcamentos';
import CadastroOrcamento from './components/CadastroOrcamento/CadastroOrcamento';
import ListaClientes from './components/ListaClientes/ListaClientes';

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
      <div className="Logo-image-container">
        <img src="/wsslogo.png" alt="Logo" className="Logo-image" />
      </div>
      <Router>
        {!token ? (
          <Login onLogin={handleLogin} />
        ) : (
          <Routes>
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/produtos" element={<ProductList token={token} />} />
            <Route path="/cadastro-produto" element={<CadastroProduto token={token} />} />
            <Route path="/atualiza-produto/:id" element={<AtualizaProduto token={token} />} />
            <Route path="/vendas" element={<ListaVendas token={token} />} />
            <Route path="/cadastro-venda" element={<CadastroVenda token={token} />} />
            <Route path="/orcamentos" element={<ListaOrcamentos token={token} />} />
            <Route path="/cadastro-orcamento" element={<CadastroOrcamento token={token} />} />
            <Route path="/clientes" element={<ListaClientes token={token} />} />
          </Routes>
        )}
      </Router>
    </div>
  );
}

export default App;
