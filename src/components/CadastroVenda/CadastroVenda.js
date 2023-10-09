import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './CadastroVenda.css';

const CadastroVenda = ({ token }) => {
  const navigate = useNavigate();

  const [vendaData, setVendaData] = useState({
    observacao: '',
    produtos_venda: [],
  });

  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/produtos/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setProdutos(data.results);
        } else {
          console.error('Erro ao buscar produtos');
        }
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      }
    };

    fetchProdutos();
  }, [token]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setVendaData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleProdutoChange = (event) => {
    const selectedProdutos = Array.from(event.target.options)
      .filter((option) => option.selected)
      .map((option) => ({
        produto_vendido: parseInt(option.value, 10),
        quantidade: 1,
      }));

    setVendaData((prevData) => ({
      ...prevData,
      produtos_venda: selectedProdutos,
    }));
  };

  const handleQuantidadeChange = (event, produtoId) => {
    const newProdutosVenda = vendaData.produtos_venda.map((produto) => {
      if (produto.produto_vendido === produtoId) {
        return {
          produto_vendido: produto.produto_vendido,
          quantidade: parseInt(event.target.value, 10),
        };
      }
      return produto;
    });

    setVendaData((prevData) => ({
      ...prevData,
      produtos_venda: newProdutosVenda,
    }));
  };

  async function fetchEstoqueProduto(produtoId) {
    try {
      const response = await fetch(`http://127.0.0.1:8000/estoque_produtos/${produtoId}/estoque_produto_por_produto/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (response.ok) {
        const data = await response.json();
        return data.quantidade;
      } else {
        console.error('Erro ao buscar quantidade em estoque');
        return 0;
      }
    } catch (error) {
      console.error('Erro ao buscar quantidade em estoque:', error);
      return 0; 
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const isValid = await Promise.all(
      vendaData.produtos_venda.map(async (produto) => {
        const estoqueDisponivel = await fetchEstoqueProduto(produto.produto_vendido);
        return produto.quantidade <= estoqueDisponivel;
      })
    );
  
    if (isValid.every((valid) => valid === true)) {
      try {
        const response = await fetch('http://127.0.0.1:8000/vendas/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(vendaData),
        });
  
        if (response.ok) {
          console.log('Venda cadastrada com sucesso');
          navigate('/vendas');
        } else {
          console.error('Erro ao cadastrar venda');
        }
      } catch (error) {
        console.error('Erro ao cadastrar venda:', error);
      }
    } else {
      alert('Não é possível, quantidade maior que o estoque.');
    }
  };
  

  const handleReturnClick = () => {
    navigate('/vendas');
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
        <h2 className='cadastro-heading'>Cadastrar Nova Venda</h2>
        <form onSubmit={handleSubmit}>
          <div className='row'>
            <label>Observação</label>
            <input
              type="text"
              className='input-cadastro'
              name="observacao"
              value={vendaData.observacao}
              onChange={handleInputChange}
              required
              maxLength={24}
            />
          </div>
          <div className='row'>
            <label>Produtos</label>
            <select
              multiple
              className='form-select'
              size={5}
              name="produtos_venda"
              value={vendaData.produtos_venda.map((produto) => produto.produto_vendido)}
              onChange={handleProdutoChange}
              required
            >
              {produtos.map((produto) => (
                <option key={produto.id} value={produto.id}>
                  {produto.nome}
                </option>
              ))}
            </select>
          </div>
          {vendaData.produtos_venda.map((produto) => (
            <div key={produto.produto_vendido} className='row'>
              <label>Quantidade de {produtos.find((p) => p.id === produto.produto_vendido).nome}</label>
              <input
                type="number"
                className='input-cadastro'
                value={produto.quantidade}
                onChange={(e) => handleQuantidadeChange(e, produto.produto_vendido)}
                required
              />
            </div>
          ))}
          <div className='row'>
            <button className='botao-cadastro' type="submit" style={{ marginBottom: '10px', marginTop: '10px' }}>Cadastrar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CadastroVenda;
