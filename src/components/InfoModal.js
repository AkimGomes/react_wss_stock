import React, { useState, useEffect } from 'react';

const InfoModal = ({ isOpen, onClose, vendaInfo, token }) => {
  const [produtosComNome, setProdutosComNome] = useState([]);
  const [loading, setLoading] = useState(true);

  const formatData = (dateStr) => {
    const date = new Date(dateStr);
    return `${date.toLocaleDateString()} - ${date.toLocaleTimeString().split(':').slice(0, 2).join(':')}`;
  };

  useEffect(() => {
    if (vendaInfo) {
      const produtosVenda = vendaInfo.produtos_venda;
      const promises = produtosVenda.map((produto) => fetchProductInfo(produto, token));

      Promise.all(promises)
        .then((produtos) => {
          setProdutosComNome(produtos);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Erro ao buscar informações dos produtos:', error);
          setLoading(false);
        });
    }
  }, [vendaInfo, token]);

  const fetchProductInfo = async (produto, token) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/produtos/${produto.produto_vendido}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        return {
          ...produto,
          nome: data.nome,
          preco_venda: data.preco_venda,
          // Adicione outras informações do produto aqui, se necessário
        };
      } else {
        console.error('Erro ao buscar informações do produto', produto.produto_vendido);
        return produto;
      }
    } catch (error) {
      console.error('Erro ao buscar informações do produto', produto.produto_vendido, error);
      return produto;
    }
  };

  if (!isOpen || !vendaInfo) return null;

  return (
    <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" role="dialog">
      <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Informações da Venda</h5>
          </div>
          <div className="modal-body">
            <p>Data: {formatData(vendaInfo.data)}</p>
            <p>Observação: {vendaInfo.observacao}</p>
            <p>Preço Total: {vendaInfo.preco_total}</p>
            <h4>Produtos:</h4>
            <ul className="list-group">
              {loading ? (
                <p>Carregando informações dos produtos...</p>
              ) : (
                produtosComNome.map((produto) => (
                  <li key={produto.id} className="list-group-item">
                    {produto.quantidade}x {produto.nome} - Preço: {produto.preco_venda}
                  </li>
                ))
              )}
            </ul>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={onClose}>Fechar</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoModal;
