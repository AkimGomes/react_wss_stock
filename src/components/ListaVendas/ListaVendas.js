import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ListaVendas.css';
import { useNavigate } from 'react-router-dom';
import InfoModal from '../InfoModal';

const ListaVendas = ({ token }) => {
  const navigate = useNavigate();
  const [vendas, setVendas] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchVendas = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/vendas/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      setVendas(data.results);
    } catch (error) {
      console.error('Erro ao buscar vendas:', error);
    }
  };

  useEffect(() => {
    fetchVendas();
  }, [token]);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/vendas/${id}/`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        fetchVendas();
      } else {
        console.error('Erro ao excluir a venda');
      }
    } catch (error) {
      console.error('Erro ao excluir a venda:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleReturnClick = () => {
    navigate('/produtos');
  };

  const handleSearch = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`http://127.0.0.1:8000/vendas/buscar/?buscar=${searchTerm}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setVendas(data);
      } else {
        console.error('Erro ao buscar vendas');
      }
    } catch (error) {
      console.error('Erro ao buscar vendas:', error);
    }
  };

  const [infoModalIsOpen, setInfoModalIsOpen] = useState(false);
  const [infoModalData, setInfoModalData] = useState(null);

  const openInfoModal = (venda) => {
    setInfoModalData(venda);
    setInfoModalIsOpen(true);
  };

  const closeInfoModal = () => {
    setInfoModalData(null);
    setInfoModalIsOpen(false);
  };

  const formatData = (dateStr) => {
    const date = new Date(dateStr);
    const formattedDate = `${date.toLocaleDateString()} - ${date.toLocaleTimeString().split(':').slice(0, 2).join(':')}`;
    return formattedDate;
  };

  return (
    <div>
      <div>
        <button className="botao-home" onClick={handleReturnClick}>
          <img src="/home.png" alt="Home" />
        </button>
      </div>
      <div>
        <button className="botao-deslogar" onClick={handleLogout}>
          <img src="/deslogar.png" alt="Deslogar" />
        </button>
      </div>
      <div className='container'>
        <h2 className='listagem-heading'>Lista de Vendas</h2>
        <form onSubmit={handleSearch}>
          <div className='row'>
            <div className='search-input-container'>
              <input
                type="text"
                className='search-input'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                maxLength={24}
                placeholder="Digite o nome da venda..."
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
              <div className="col venda-bla"><strong>Data</strong></div>
              <div className="col venda-bla"><strong>Observação</strong></div>
              <div className="col venda-blaprecoheader"><strong>Preço Total</strong></div>
            </div>
          </li>
          {vendas.map((venda) => (
            <li key={venda.id} className="product-item">
              <div className="row linhas">
                <div className="col venda-nome-item">{formatData(venda.data)}</div>
                <div className="col venda-tipo-item">{venda.observacao}</div>
                <div className="col venda-preco-item">{venda.preco_total}</div>
                <div className="col botoes" style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <button className='botao-excluir' onClick={() => handleDelete(venda.id)}>
                    <img src="/excluir.png" alt="Excluir" className="botao-excluir" />
                  </button>
                  <button className='botao-info' onClick={() => openInfoModal(venda)}>
                    <img src="/informacoes.png" alt="Informações" className="botao-info" />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <Link to="/cadastro-venda">
          <img src="/adicionar.png" alt="Adicionar" className="botao-adicionar" />
        </Link>
        <InfoModal
          isOpen={infoModalIsOpen}
          onClose={closeInfoModal}
          vendaInfo={infoModalData}
          token={token}
        />
      </div>
    </div>
  );
};

export default ListaVendas;
