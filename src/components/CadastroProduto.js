import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CadastroProduto = ({ token }) => {
  const navigate = useNavigate(); // Inicialize useNavigate

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

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://127.0.0.1:8000/produtos/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(productData),
      });

      if (response.ok) {
        console.log('Produto cadastrado com sucesso');
        navigate('/'); // Redirecionar para a rota que renderiza ProductList
      } else {
        console.error('Erro ao cadastrar produto');
      }
    } catch (error) {
      console.error('Erro ao cadastrar produto:', error);
    }
  };
  
  

  return (
    <div>
      <h2>Cadastrar Novo Produto</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome:</label>
          <input
            type="text"
            name="nome"
            value={productData.nome}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Descrição:</label>
          <input
            type="text"
            name="descricao"
            value={productData.descricao}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Preço Custo:</label>
          <input
            type="number"
            name="preco_custo"
            value={productData.preco_custo}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Preço Venda:</label>
          <input
            type="number"
            name="preco_venda"
            value={productData.preco_venda}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Tipo de Produto:</label>
          <input
            type="text"
            name="tipo_produto"
            value={productData.tipo_produto}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Descrição do Tipo:</label>
          <input
            type="text"
            name="descricao_tipo"
            value={productData.descricao_tipo}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Quantidade:</label>
          <input
            type="number"
            name="quantidade"
            value={productData.quantidade}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <button type="submit">Cadastrar</button>
        </div>
      </form>
    </div>
  );
};

export default CadastroProduto;
