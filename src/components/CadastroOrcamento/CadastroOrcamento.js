import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CadastroOrcamento = ({ token }) => {
  const navigate = useNavigate();

  const [orcamentoData, setOrcamentoData] = useState({
    cliente_orcamento: {
      nome: '',
      cpf: '',
      telefone_1: '',
      email: '',
    },
    nome: '',
    descricao: '',
    observacao: '',
    valor_orcamento: 0.0,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    // Certifique-se de que está lidando com campos do cliente corretamente
    if (name.startsWith('cliente_orcamento.')) {
      const clientField = name.split('.')[1];
      setOrcamentoData({
        ...orcamentoData,
        cliente_orcamento: {
          ...orcamentoData.cliente_orcamento,
          [clientField]: value,
        },
      });
    } else {
      setOrcamentoData({
        ...orcamentoData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://127.0.0.1:8000/orcamento/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(orcamentoData),
      });

      if (response.ok) {
        console.log('Orçamento cadastrado com sucesso');
        navigate('/orcamentos');
      } else {
        console.error('Erro ao cadastrar orçamento');
      }
    } catch (error) {
      console.error('Erro ao cadastrar orçamento:', error);
    }
  };

  const handleReturnClick = () => {
    navigate('/orcamentos');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
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
        <h2 className='cadastro-heading'>Cadastrar Novo Orçamento</h2>
        <form onSubmit={handleSubmit}>
          <div className='row'>
            <label>Nome do Cliente</label>
            <input
              type="text"
              className='input-cadastro'
              name="cliente_orcamento.nome"
              value={orcamentoData.cliente_orcamento.nome}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className='row'>
            <label>CPF do Cliente</label>
            <input
              type="text"
              className='input-cadastro'
              name="cliente_orcamento.cpf"
              value={orcamentoData.cliente_orcamento.cpf}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className='row'>
            <label>Telefone do Cliente</label>
            <input
              type="text"
              className='input-cadastro'
              name="cliente_orcamento.telefone_1"
              value={orcamentoData.cliente_orcamento.telefone_1}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className='row'>
            <label>Email do Cliente</label>
            <input
              type="email"
              className='input-cadastro'
              name="cliente_orcamento.email"
              value={orcamentoData.cliente_orcamento.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className='row'>
            <label>Nome do Orçamento</label>
            <input
              type="text"
              className='input-cadastro'
              name="nome"
              value={orcamentoData.nome}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className='row'>
            <label>Descrição do Orçamento</label>
            <textarea
              className='input-cadastro'
              name="descricao"
              value={orcamentoData.descricao}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className='row'>
            <label>Observações do Orçamento</label>
            <textarea
              className='input-cadastro'
              name="observacao"
              value={orcamentoData.observacao}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className='row'>
            <label>Valor do Orçamento</label>
            <input
              type="number"
              step="0.01"
              className='input-cadastro'
              name="valor_orcamento"
              value={orcamentoData.valor_orcamento}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className='row'>
            <button className='botao-cadastro' type="submit" style={{ marginBottom: '10px', marginTop: '10px' }}>Cadastrar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CadastroOrcamento;
