import React, { useState, useEffect } from 'react';

const InfoModalOrcamentos = ({ isOpen, onClose, orcamentoInfo, token }) => {
  const [clienteInfo, setClienteInfo] = useState([]);
  const [loading, setLoading] = useState(true);

  const formatData = (dateStr) => {
    const date = new Date(dateStr);
    return `${date.toLocaleDateString()} - ${date.toLocaleTimeString().split(':').slice(0, 2).join(':')}`;
  };

  useEffect(() => {
    if (orcamentoInfo && orcamentoInfo.cliente_orcamento.id) {
        const clienteId = orcamentoInfo.cliente_orcamento.id;
        console.log('Cliente ID:', clienteId);
  
      fetchClienteInfo(clienteId, token)
        .then((data) => {
          setClienteInfo(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Erro ao buscar informações do cliente:', error);
          setLoading(false);
        });
    }
  }, [orcamentoInfo, token]);
  

  const fetchClienteInfo = async (clienteId, token) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/cliente/${clienteId}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('Dados do cliente:', data); // Adicione esta linha
        return data; // Retorna os dados do cliente
      } else {
        console.error('Erro ao buscar informações do cliente', clienteId);
        throw new Error('Erro na solicitação do cliente');
      }
    } catch (error) {
      console.error('Erro ao buscar informações do cliente', clienteId, error);
      throw error;
    }
  };

  if (!isOpen || !clienteInfo) return null;

  return (
    <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" role="dialog">
      <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Informações do Orçamento</h5>
          </div>
          <div className="modal-body">
            <p>Nome: {orcamentoInfo.nome}</p>
            <p>Data: {formatData(orcamentoInfo.data_orcamento)}</p>
            <p>Observação: {orcamentoInfo.observacao}</p>
            <p>Preço Total: {orcamentoInfo.valor_orcamento}</p>
            <h4>Cliente:</h4>
            {loading ? (
              <p>Carregando informações do cliente...</p>
            ) : (
              <div>
                <p>Nome: {clienteInfo.nome}</p>
                <p>CPF: {clienteInfo.cpf}</p>
                <p>Telefone: {clienteInfo.telefone_1}</p>
                <p>Email: {clienteInfo.email}</p>
                {/* Adicione outras informações do cliente aqui, se necessário */}
              </div>
            )}
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={onClose}>Fechar</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoModalOrcamentos;
