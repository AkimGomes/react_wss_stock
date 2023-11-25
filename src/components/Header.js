// Header.js

import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleVendas = () => {
    navigate('/vendas');
  };

  const handleClientes = () => {
    navigate('/clientes');
  };

  const handleOrcamentos = () => {
    navigate('/orcamentos');
  };

  return (
    <header className="headeeer bg-white shadow-sm p-3">
      <div className="container d-flex justify-content-between flex-horizontal">
        <div>
          <button className="botao-vendas" onClick={handleVendas}>
            <img src="/vendas.png" alt="Vendas" />
          </button>
        </div>
        <div>
          <button className="botao-orcamentos" onClick={handleOrcamentos}>
            <img src="/orcamentos.png" alt="Orcamentos" />
          </button>
        </div>
        <div>
          <button className="botao-clientes" onClick={handleClientes}>
            <img src="/clientes.png" alt="Clientes" />
          </button>
        </div>
        <div className='ml-auto'>
          <button className="botao-dlg" onClick={handleLogout}>
            <img src="/deslogar.png" alt="Deslogar" className='botao-dlg img'/>
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
