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

  const handleUpdate = async (id) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/produtos/${id}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({}),
      });

      if (response.ok) {
        fetchProducts();
      } else {
        console.error('Erro ao atualizar o produto');
      }
    } catch (error) {
      console.error('Erro ao atualizar o produto:', error);
    }
  };

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
            </div>
          </li>
          {products.map((product) => (
            <li key={product.id} className="product-item">
              <div className="row">
                <div className="col product-bla">{product.nome}</div>
                <div className="col product-bla">{product.tipo_produto}</div>
                <div className="col product-blapreco">{product.preco_venda}</div>
                <button className='col botao-editar' onClick={() => handleUpdate(product.id)}>
                  <img src="/editar.png" alt="Atualizar" className="botao-editar" />
                </button>
                <button className='col botao-excluir' onClick={() => handleDelete(product.id)}>
                  <img src="/excluir.png" alt="Excluir" className="botao-excluir" />
                </button>
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




