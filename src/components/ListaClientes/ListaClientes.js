import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ListaClientes.css';
import { useNavigate } from 'react-router-dom';

const ListaClientes = ({ token }) => {
  const navigate = useNavigate();
  const [clientes, setClientes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchClientes = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/cliente/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      setClientes(data.results);
    } catch (error) {
      console.error('Erro ao buscar clientes:', error);
    }
  };

  const handleReturnClick = () => {
    navigate('/produtos');
  };

  useEffect(() => {
    fetchClientes();
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login'); 
  };

  const handleSearch = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`http://127.0.0.1:8000/cliente/buscar/?buscar=${searchTerm}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setClientes(data);
      } else {
        console.error('Erro ao buscar clientes');
      }
    } catch (error) {
      console.error('Erro ao buscar clientes:', error);
    }
  };

  return (
    <div>
      <div>
        <button className="botao-home" onClick={handleReturnClick}>
          <img src="/home.png"/>
        </button>
      </div>
      <div>
        <button className="botao-deslogar" onClick={handleLogout}>
          <img src="/deslogar.png" alt="Deslogar" />
        </button>
      </div>
      <div className='container'>
        <h2 className='listagem-heading'>Lista de Clientes</h2>
        <form onSubmit={handleSearch}>
        <div className='row'>
          <div className='search-input-container'>
            <input
              type="text"
              className='search-input'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              maxLength={24}
              placeholder="Digite o nome do cliente..."
            />
            <button className='botao-buscar' type="submit">
              <img src='buscar.png' alt='Buscar' className='botao-buscar' />
            </button>
          </div>
        </div>
        </form>
        <ul className="product-list">
          <li className="product-header">
            <div className="row">
              <div className="col cliente-nome"><strong>Nome</strong></div>
              <div className="col cliente-telefone"><strong>Telefone</strong></div>
              <div className="col cliente-email"><strong>Email</strong></div>
            </div>
          </li>
          {clientes.map((cliente) => (
            <li key={cliente.id} className="product-item">
              <div className="row linhas">
                <div className="col cliente-nome-item">{cliente.nome}</div>
                <div className="col cliente-telefone-item">{cliente.telefone_1}</div>
                <div className="col cliente-email-item">{cliente.email}</div>
                <div className="col" style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Link to={`/atualiza-cliente/${cliente.id}`}>
                    <button className='botao-excluir'>
                      <img src="/editar.png" alt="Atualizar" className="botao-excluir" />
                    </button>
                  </Link>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ListaClientes;
