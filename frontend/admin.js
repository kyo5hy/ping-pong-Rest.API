const API_MENU = 'http://localhost:3000/api/menu';
const API_ORDERS = 'http://localhost:3000/api/orders';

// ... (Mantenha o topo igual)
const form = document.getElementById('admin-form');
const listContainer = document.getElementById('admin-list');
const ordersContainer = document.getElementById('orders-list');

const idInput = document.getElementById('item-id');
const nameInput = document.getElementById('name');
const descInput = document.getElementById('description');
const priceInput = document.getElementById('price');
const categoryInput = document.getElementById('category');
const imageInput = document.getElementById('image');
const btnCancel = document.getElementById('btn-cancel');
const formTitle = document.getElementById('form-title');

// Carrega Cardápio
async function fetchItems() {
    const response = await fetch(API_MENU);
    const items = await response.json();
    renderAdminItems(items);
}

function renderAdminItems(items) {
    listContainer.innerHTML = '';
    items.forEach(item => {
        const fallback = 'https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=600&q=80';
        const card = document.createElement('div');
        card.className = 'episode-card';
        card.innerHTML = `
            <div class="episode-img-wrapper"><img src="${item.image || fallback}"></div>
            <div class="episode-info">
                <h3>${item.name} (${item.category})</h3>
                <p>${item.description}</p>
                <div style="margin-top: 10px; display: flex; gap: 5px;">
                    <button onclick="editItem('${item.id}', \`${item.name}\`, \`${item.description}\`, ${item.price}, '${item.category}', '${item.image || ''}')" style="flex:1; background:#333;">Editar</button>
                    <button class="btn-red" onclick="deleteItem('${item.id}')" style="flex:1;">Excluir</button>
                </div>
            </div>
        `;
        listContainer.appendChild(card);
    });
}

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const itemData = {
        name: nameInput.value, description: descInput.value, price: parseFloat(priceInput.value),
        category: categoryInput.value, image: imageInput.value
    };
    const method = idInput.value ? 'PUT' : 'POST';
    const url = idInput.value ? `${API_MENU}/${idInput.value}` : API_MENU;

    await fetch(url, { method: method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(itemData) });
    resetForm(); fetchItems();
});

window.editItem = (id, name, desc, price, category, image) => {
    idInput.value = id; nameInput.value = name; descInput.value = desc; 
    priceInput.value = price; categoryInput.value = category; imageInput.value = image;
    formTitle.textContent = "Editar Episódio"; btnCancel.style.display = 'block'; window.scrollTo(0,0);
};

window.deleteItem = async (id) => {
    if(confirm('Apagar este episódio da temporada?')) {
        await fetch(`${API_MENU}/${id}`, { method: 'DELETE' }); fetchItems();
    }
};

function resetForm() {
    form.reset(); idInput.value = ''; formTitle.textContent = "Publicar Novo Episódio (Prato)"; btnCancel.style.display = 'none';
}
btnCancel.addEventListener('click', resetForm);

// --- LÓGICA DO KDS (KITCHEN DISPLAY SYSTEM) ATUALIZADA ---
window.fetchOrders = async () => {
    const response = await fetch(API_ORDERS);
    const orders = await response.json();
    renderOrders(orders);
};

window.changeOrderStatus = async (orderId, newStatus) => {
    try {
        const res = await fetch(`${API_ORDERS}/${orderId}/status`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: newStatus })
        });
        
        if (!res.ok) {
            throw new Error(`Erro HTTP: ${res.status}`);
        }
        
        fetchOrders(); // Recarrega a lista
    } catch (error) {
        console.error("Falha ao atualizar:", error);
        alert("Erro ao atualizar! Você lembrou de reiniciar o servidor backend no terminal? (Ctrl+C e depois 'node server.js')");
    }
};

function renderOrders(orders) {
    ordersContainer.innerHTML = '';
    // Filtra pedidos finalizados para o fim e inverte a ordem de chegada
    const sortedOrders = orders.reverse().sort((a, b) => a.status === 'Finalizado' ? 1 : b.status === 'Finalizado' ? -1 : 0);

    sortedOrders.forEach(order => {
        let statusColor = '#f39c12'; // Preparando (Laranja)
        if(order.status === 'Pronto') statusColor = '#27ae60'; // Verde
        if(order.status === 'Finalizado') statusColor = '#7f8c8d'; // Cinza

        let itemsList = order.items.map(i => `<li>${i.name}</li>`).join('');
        
        const div = document.createElement('div');
        div.className = 'order-card';
        div.style.borderColor = statusColor;
        if(order.status === 'Finalizado') div.style.opacity = '0.5';

        div.innerHTML = `
            <div style="display: flex; justify-content: space-between; border-bottom: 1px solid #333; padding-bottom: 10px; margin-bottom: 10px;">
                <h3 style="color: var(--primary)">Mesa: ${order.table}</h3>
                <span style="color: var(--text-muted)">${new Date(order.timestamp).toLocaleTimeString()}</span>
            </div>
            <ul style="margin-left: 20px; color: #ccc;">${itemsList}</ul>
            <h4 style="margin-top: 10px;">Total: R$ ${order.total.toFixed(2)} | Status: <span style="color: ${statusColor}">${order.status}</span></h4>
            
            <div style="margin-top: 15px; display: flex; gap: 10px;">
                ${order.status === 'Preparando' ? `<button onclick="changeOrderStatus('${order.id}', 'Pronto')" style="background: #27ae60;">Marcar como Pronto</button>` : ''}
                ${order.status === 'Pronto' ? `<button onclick="changeOrderStatus('${order.id}', 'Finalizado')" style="background: #7f8c8d;">Finalizar Entrega</button>` : ''}
                ${order.status === 'Finalizado' ? `<span style="color: #7f8c8d; font-size: 0.9em;">Pedido arquivado.</span>` : ''}
            </div>
        `;
        ordersContainer.appendChild(div);
    });
}

// Inicialização
fetchItems();
fetchOrders();