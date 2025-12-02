const Order = require('../models/Order');
const { mapRequestToDatabase, mapDatabaseToResponse } = require('../utils/mapper');

const createOrder = async (req, res) => {
  try {
    const orderData = mapRequestToDatabase(req.body);

    const existingOrder = await Order.findOne({ orderId: orderData.orderId });
    if (existingOrder) {
      return res.status(409).json({ 
        error: 'Pedido já existe', 
        message: `O pedido ${orderData.orderId} já está cadastrado.` 
      });
    }

    const order = new Order(orderData);
    await order.save();

    res.status(201).json({
      message: 'Pedido criado com sucesso!',
      order: mapDatabaseToResponse(order)
    });

  } catch (error) {
    res.status(500).json({ 
      error: 'Erro ao criar pedido', 
      message: error.message 
    });
  }
};

const getOrderById = async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = await Order.findOne({ orderId });

    if (!order) {
      return res.status(404).json({ 
        error: 'Pedido não encontrado', 
        message: `Nenhum pedido encontrado com o ID ${orderId}` 
      });
    }

    res.status(200).json(mapDatabaseToResponse(order));

  } catch (error) {
    res.status(500).json({ 
      error: 'Erro ao buscar pedido', 
      message: error.message 
    });
  }
};

const listOrders = async (req, res) => {
  try {
    const orders = await Order.find();

    if (orders.length === 0) {
      return res.status(200).json({ 
        message: 'Nenhum pedido cadastrado', 
        orders: [] 
      });
    }

    res.status(200).json({
      total: orders.length,
      orders: orders.map(mapDatabaseToResponse)
    });

  } catch (error) {
    res.status(500).json({ 
      error: 'Erro ao listar pedidos', 
      message: error.message 
    });
  }
};

const updateOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const orderData = mapRequestToDatabase(req.body);

    const order = await Order.findOneAndUpdate(
      { orderId },
      orderData,
      { new: true, runValidators: true }
    );

    if (!order) {
      return res.status(404).json({ 
        error: 'Pedido não encontrado', 
        message: `Nenhum pedido encontrado com o ID ${orderId}` 
      });
    }

    res.status(200).json({
      message: 'Pedido atualizado com sucesso!',
      order: mapDatabaseToResponse(order)
    });

  } catch (error) {
    res.status(500).json({ 
      error: 'Erro ao atualizar pedido', 
      message: error.message 
    });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = await Order.findOneAndDelete({ orderId });

    if (!order) {
      return res.status(404).json({ 
        error: 'Pedido não encontrado', 
        message: `Nenhum pedido encontrado com o ID ${orderId}` 
      });
    }

    res.status(200).json({
      message: 'Pedido deletado com sucesso!',
      orderId: orderId
    });

  } catch (error) {
    res.status(500).json({ 
      error: 'Erro ao deletar pedido', 
      message: error.message 
    });
  }
};

module.exports = {
  createOrder,
  getOrderById,
  listOrders,
  updateOrder,
  deleteOrder
};
