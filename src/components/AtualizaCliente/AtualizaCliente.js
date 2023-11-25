import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const AtualizaCliente = ({ token }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [clienteData, setClienteData] = useState({
    nome: '',
    cpf: '',
    telefone_1: 0,
    telefone_2: 0,
    email: '',
    data_cadastro: '',
    ativo_inativo: '',
  });

  useEffect(() => {
    const fetchClienteDetails = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/cliente/${id}/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setClienteData(data);
        } else {
          console.error('Erro ao buscar detalhes do cliente');
        }
      } catch (error) {
        console.error('Erro ao buscar detalhes do cliente:', error);
      }
    };

    fetchClienteDetails();
  }, [id, token]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setClienteData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login'); 
  };

  const handleReturnClick = () => {
    navigate('/clientes');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`http://127.0.0.1:8000/cliente/${id}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(clienteData),
      });

      if (response.ok) {
        console.log('Cliente atualizado com sucesso');
        navigate('/clientes');
      } else {
        console.error('Erro ao atualizar cliente');
      }
    } catch (error) {
      console.error('Erro ao atualizar cliente:', error);
    }
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
        <h2 className='cadastro-heading'>Atualizar Cliente</h2>
        <form onSubmit={handleSubmit}>
          <div className='row'>
            <label>Nome</label>
            <input
              type="text"
              className='input-cadastro'
              name="nome"
              value={clienteData.nome}
              onChange={handleInputChange}
              maxLength={24}
            />
          </div>
          <div className='row'>
            <label>CPF</label>
            <input
              type="text"
              className='input-cadastro'
              name="cpf"
              value={clienteData.cpf}
              onChange={handleInputChange}
              maxLength={24}
            />
          </div>
          <div className='row'>
            <label>Telefone 2</label>
            <input
              type="number"
              className='input-cadastro'
              name="telefone_1"
              value={clienteData.telefone_1}
              onChange={handleInputChange}
              maxLength={24}
            />
          </div>
          <div className='row'>
            <label>Telefone 2</label>
            <input
              type="number"
              className='input-cadastro'
              name="telefone_2"
              value={clienteData.telefone_2}
              onChange={handleInputChange}
              maxLength={24}
            />
          </div>
          <div className='row'>
            <label>Email Cliente</label>
            <input
              type="text"
              className='input-cadastro'
              name="email"
              value={clienteData.email}
              onChange={handleInputChange}
              maxLength={24}
            />
          </div>
          <div className='row'>
            <button className='botao-cadastro' type="submit" style={{ marginBottom: '10px', marginTop: '10px' }}>Atualizar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AtualizaCliente;
