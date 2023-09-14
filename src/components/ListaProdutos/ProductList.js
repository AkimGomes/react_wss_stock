import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ProductList.css';
import { useNavigate } from 'react-router-dom';

const ProductList = ({ token }) => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/produtos/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      setProducts(data.results);
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [token]);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/produtos/${id}/`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        fetchProducts();
      } else {
        console.error('Erro ao excluir o produto');
      }
    } catch (error) {
      console.error('Erro ao excluir o produto:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login'); 
  };

  return (
    <div>
      <div>
        <button className="botao-deslogar" onClick={handleLogout}>
          <img src="/deslogar.png"/>
        </button>
      </div>
      <div className='container'>
        <h2 className='listagem-heading'>Lista de Produtos</h2>
        <ul className="product-list">
          <li className="product-header">
            <div className="row">
              <div className="col product-bla"><strong>Nome</strong></div>
              <div className="col product-bla"><strong>Tipo</strong></div>
              <div className="col product-blaprecoheader"><strong>Preço</strong></div>
              <div className='col product-bla'><strong>Quantidade</strong></div>
            </div>
          </li>
          {products.map((product) => (
            <li key={product.id} className="product-item">
              <div className="row linhas">
                <div className="col product-nome-item">{product.nome}</div>
                <div className="col product-tipo-item">{product.tipo_produto}</div>
                <div className="col product-preco-item">{product.preco_venda}</div>
                <div className="col product-quantidade-item">{product.quantidade}</div>
                <div className="col" style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Link to={`/atualiza-produto/${product.id}`}>
                    <button className='botao-editar'>
                      <img src="/editar.png" alt="Atualizar" className="botao-editar" />
                    </button>
                  </Link>
                  <button className='botao-excluir' onClick={() => handleDelete(product.id)}>
                    <img src="/excluir.png" alt="Excluir" className="botao-excluir" />
                  </button>
                </div>
                </div>
            </li>
          ))}
        </ul>
        <Link to="/cadastro-produto">
          <img src="/adicionar.png" alt="Adicionar" className="botao-adicionar" />
        </Link>
      </div>
    </div>
  );
};

export default ProductList;




