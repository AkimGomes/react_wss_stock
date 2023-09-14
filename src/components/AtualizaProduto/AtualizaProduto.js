import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const AtualizaProduto = ({ token }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [productData, setProductData] = useState({
    nome: '',
    descricao: '',
    preco_custo: 0,
    preco_venda: 0,
    publicado: true,
    tipo_produto: '',
    descricao_tipo: '',
    quantidade: 0,
  });

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/produtos/${id}/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setProductData(data);
        } else {
          console.error('Erro ao buscar detalhes do produto');
        }
      } catch (error) {
        console.error('Erro ao buscar detalhes do produto:', error);
      }
    };

    fetchProductDetails();
  }, [id, token]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login'); 
  };

  const handleReturnClick = () => {
    navigate('/produtos');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`http://127.0.0.1:8000/produtos/${id}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(productData),
      });

      if (response.ok) {
        console.log('Produto atualizado com sucesso');
        navigate('/produtos');
      } else {
        console.error('Erro ao atualizar produto');
      }
    } catch (error) {
      console.error('Erro ao atualizar produto:', error);
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
        <h2 className='cadastro-heading'>Atualizar Produto</h2>
        <form onSubmit={handleSubmit}>
          <div className='row'>
            <label>Nome</label>
            <input
              type="text"
              className='input-cadastro'
              name="nome"
              value={productData.nome}
              onChange={handleInputChange}
              maxLength={24}
            />
          </div>
          <div className='row'>
            <label>Descrição</label>
            <input
              type="text"
              className='input-cadastro'
              name="descricao"
              value={productData.descricao}
              onChange={handleInputChange}
              maxLength={24}
            />
          </div>
          <div className='row'>
            <label>Preço Custo</label>
            <input
              type="number"
              className='input-cadastro'
              name="preco_custo"
              value={productData.preco_custo}
              onChange={handleInputChange}
              maxLength={24}
            />
          </div>
          <div className='row'>
            <label>Preço Venda</label>
            <input
              type="number"
              className='input-cadastro'
              name="preco_venda"
              value={productData.preco_venda}
              onChange={handleInputChange}
              maxLength={24}
            />
          </div>
          <div className='row'>
            <label>Tipo de Produto</label>
            <input
              type="text"
              className='input-cadastro'
              name="tipo_produto"
              value={productData.tipo_produto}
              onChange={handleInputChange}
              maxLength={24}
            />
          </div>
          <div className='row'>
            <label>Descrição do Tipo</label>
            <input
              type="text"
              className='input-cadastro'
              name="descricao_tipo"
              value={productData.descricao_tipo}
              onChange={handleInputChange}
              maxLength={24}
            />
          </div>
          <div className='row'>
            <label>Quantidade</label>
            <input
              type="number"
              className='input-cadastro'
              name="quantidade"
              value={productData.quantidade}
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

export default AtualizaProduto;
