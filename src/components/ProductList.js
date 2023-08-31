import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ProductList = ({ token }) => {
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

  return (
    <div>
      <h2>Lista de Produtos</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <span>
              <strong>Nome:</strong> {product.nome} | 
              <strong> Tipo:</strong> {product.tipo_produto} | 
              <strong> Preço:</strong> {product.preco_venda}
            </span>
            <span>
              <button onClick={() => handleUpdate(product.id)}>Atualizar</button>
              <button onClick={() => handleDelete(product.id)}>Excluir</button>
            </span>
          </li>
        ))}
      </ul>
      <Link to="/cadastro-produto">Cadastrar Novo Produto</Link>
    </div>
  );
};

export default ProductList;
