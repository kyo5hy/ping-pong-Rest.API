const fs = require('fs');
const path = require('path');

const ordersFilePath = path.join(__dirname, '../data/orders.json');

const readOrders = () => {
    try { return JSON.parse(fs.readFileSync(ordersFilePath, 'utf8')); } 
    catch (error) { return []; }
};

const writeOrders = (data) => {
    fs.writeFileSync(ordersFilePath, JSON.stringify(data, null, 2), 'utf8');
};

exports.getAllOrders = (req, res) => {
    res.status(200).json(readOrders());
};

exports.createOrder = (req, res) => {
    const orders = readOrders();
    const newOrder = {
        id: Date.now().toString(),
        table: req.body.table,
        items: req.body.items,
        total: req.body.total,
        status: 'Preparando', // Status inicial
        timestamp: new Date().toISOString()
    };
    orders.push(newOrder);
    writeOrders(orders);
    res.status(201).json({ message: 'Pedido enviado!', order: newOrder });
};

// NOVO: Atualizar o status do pedido
exports.updateOrderStatus = (req, res) => {
    const orders = readOrders();
    const orderId = req.params.id;
    const { status } = req.body; // 'Pronto' ou 'Finalizado'

    const index = orders.findIndex(o => o.id === orderId);
    if (index === -1) {
        return res.status(404).json({ message: 'Pedido não encontrado.' });
    }

    orders[index].status = status;
    writeOrders(orders);
    res.status(200).json({ message: 'Status atualizado', order: orders[index] });
};