import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ListaOrcamentos.css';
import { useNavigate } from 'react-router-dom';
import InfoModalOrcamentos from '../InfoModalOrcamento';

const ListaOrcamentos = ({ token }) => {
  const navigate = useNavigate();
  const [orcamentos, setOrcamentos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchOrcamentos = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/orcamento/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      setOrcamentos(data.results);
    } catch (error) {
      console.error('Erro ao buscar orçamentos:', error);
    }
  };

  useEffect(() => {
    fetchOrcamentos();
  }, [token]);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/orcamento/${id}/`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        fetchOrcamentos();
      } else {
        console.error('Erro ao excluir o orçamento');
      }
    } catch (error) {
      console.error('Erro ao excluir o orçamento:', error);
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
      const response = await fetch(`http://127.0.0.1:8000/orcamento/buscar/?buscar=${searchTerm}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setOrcamentos(data);
      } else {
        console.error('Erro ao buscar orçamentos');
      }
    } catch (error) {
      console.error('Erro ao buscar orçamentos:', error);
    }
  };

  const [infoModalIsOpen, setInfoModalIsOpen] = useState(false);
  const [infoModalData, setInfoModalData] = useState(null);

  const openInfoModal = (orcamento) => {
    setInfoModalData(orcamento);
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
        <h2 className='listagem-heading'>Lista de Orçamentos</h2>
        <form onSubmit={handleSearch}>
          <div className='row'>
            <div className='search-input-container'>
              <input
                type="text"
                className='search-input'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                maxLength={24}
                placeholder="Digite o nome do orçamento..."
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
              <div className="col orcamento-data"><strong>Data</strong></div>
              <div className="col orcamento-nome"><strong>Nome</strong></div>
              <div className="col orcamento-descricao"><strong>Descrição</strong></div>
              <div className="col orcamento-valor"><strong>Valor</strong></div>
            </div>
          </li>
          {orcamentos.map((orcamento) => (
            <li key={orcamento.id} className="product-item">
              <div className="row linhas">
                <div className="col orcamento-data-item">{formatData(orcamento.data_orcamento)}</div>
                <div className="col orcamento-nome-item">{orcamento.nome}</div>
                <div className="col orcamento-descricao-item">{orcamento.descricao}</div>
                <div className="col orcamento-valor-item">{orcamento.valor_orcamento}</div>
                <div className="col botoes" style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <button className='botao-excluir' onClick={() => handleDelete(orcamento.id)}>
                    <img src="/excluir.png" alt="Excluir" className="botao-excluir" />
                  </button>
                  <button className='botao-info' onClick={() => openInfoModal(orcamento)}>
                    <img src="/informacoes.png" alt="Informações" className="botao-info" />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <Link to="/cadastro-orcamento">
          <img src="/adicionar.png" alt="Adicionar" className="botao-adicionar" />
        </Link>
        <InfoModalOrcamentos
          isOpen={infoModalIsOpen}
          onClose={closeInfoModal}
          orcamentoInfo={infoModalData}
          token={token}
        />
      </div>
    </div>
  );
};

export default ListaOrcamentos;
