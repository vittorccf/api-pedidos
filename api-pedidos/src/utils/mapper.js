const mapRequestToDatabase = (requestData) => {
  return {
    orderId: requestData.numeroPedido,
    value: requestData.valorTotal,
    creationDate: new Date(requestData.dataCriacao),
    items: requestData.items.map(item => ({
      productId: parseInt(item.idItem),
      quantity: item.quantidadeItem,
      price: item.valorItem
    }))
  };
};

// Função para transformar dados do banco para resposta (opcional)
const mapDatabaseToResponse = (dbData) => {
  return {
    orderId: dbData.orderId,
    value: dbData.value,
    creationDate: dbData.creationDate,
    items: dbData.items
  };
};

module.exports = { mapRequestToDatabase, mapDatabaseToResponse };
