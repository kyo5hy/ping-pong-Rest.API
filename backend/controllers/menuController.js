const fs = require('fs');
const path = require('path');

const dataFilePath = path.join(__dirname, '../data/db.json');

// Helper: Lê o banco de dados
const readDb = () => {
    try {
        const data = fs.readFileSync(dataFilePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error("Erro ao ler db.json. Retornando array vazio.", error);
        return [];
    }
};

// Helper: Escreve no banco de dados
const writeDb = (data) => {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), 'utf8');
};

// (R) READ - Obter todos os itens
exports.getAllItems = (req, res) => {
    const items = readDb();
    res.status(200).json(items);
};

// (C) CREATE - Adicionar novo item
exports.createItem = (req, res) => {
    const items = readDb();
    const newItem = {
        id: Date.now().toString(), // Geração simples de ID único
        name: req.body.name,
        description: req.body.description,
        price: Number(req.body.price)
    };
    
    items.push(newItem);
    writeDb(items);
    res.status(201).json({ message: 'Item adicionado ao cardápio com sucesso!', item: newItem });
};

// (U) UPDATE - Atualizar item existente
exports.updateItem = (req, res) => {
    const items = readDb();
    const itemId = req.params.id;
    const index = items.findIndex(item => item.id === itemId);

    if (index === -1) {
        return res.status(404).json({ message: 'Item não encontrado.' });
    }

    items[index] = {
        ...items[index],
        name: req.body.name || items[index].name,
        description: req.body.description || items[index].description,
        price: req.body.price ? Number(req.body.price) : items[index].price
    };

    writeDb(items);
    res.status(200).json({ message: 'Item atualizado com sucesso!', item: items[index] });
};

// (D) DELETE - Remover item
exports.deleteItem = (req, res) => {
    const items = readDb();
    const itemId = req.params.id;
    const filteredItems = items.filter(item => item.id !== itemId);

    if (items.length === filteredItems.length) {
        return res.status(404).json({ message: 'Item não encontrado.' });
    }

    writeDb(filteredItems);
    res.status(200).json({ message: 'Item removido do cardápio com sucesso!' });
};