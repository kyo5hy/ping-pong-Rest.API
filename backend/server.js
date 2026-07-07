const express = require('express');
const cors = require('cors');
const menuRoutes = require('./routes/menuRoutes');
const orderRoutes = require('./routes/orderRoutes'); // Nova importação

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use('/api/menu', menuRoutes);
app.use('/api/orders', orderRoutes); // Nova rota de pedidos

app.use((req, res) => {
    res.status(404).json({ message: 'Endpoint não encontrado. Utilize /api/menu ou /api/orders' });
});

app.listen(PORT, () => {
    console.log(`[Servidor] Otaku Sushi Bar API rodando na porta ${PORT}`);
});