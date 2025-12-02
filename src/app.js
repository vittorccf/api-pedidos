const express = require('express');
const connectDB = require('./config/database');
const orderRoutes = require('./routes/orderRoutes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

connectDB();

app.use('/order', orderRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'API de Pedidos VITTOR FREITAS - Bem-vindo!' });
});

app.use((req, res) => {
  res.status(404).json({ error: 'Rota não encontrada' });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
