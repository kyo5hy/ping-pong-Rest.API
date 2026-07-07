const API_MENU = 'http://localhost:3000/api/menu';
const API_ORDERS = 'http://localhost:3000/api/orders';

const menuContainer = document.getElementById('menu-list');
const cartContainer = document.getElementById('cart-items');
const cartTotalElement = document.getElementById('cart-total');
const tableInput = document.getElementById('table-number');

let menuData = [];
let cart = [];

async function loadMenu() {
    try {
        const response = await fetch(API_MENU);
        menuData = await response.json();
        renderMenu(menuData);
    } catch (error) {
        menuContainer.innerHTML = '<p>Erro de conexão com a Vila Oculta do Backend.</p>';
    }
}

window.filterMenu = (category) => {
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    if (category === 'todos') {
        renderMenu(menuData);
    } else {
        const filtered = menuData.filter(item => item.category === category);
        renderMenu(filtered);
    }
}

function renderMenu(items) {
    menuContainer.innerHTML = '';
    items.forEach(item => {
        const fallbackImg = 'https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=600&q=80';
        const imgUrl = item.image || fallbackImg;
        
        const card = document.createElement('div');
        card.className = 'episode-card';
        card.innerHTML = `
            <div class="episode-img-wrapper">
                <img src="${imgUrl}" alt="${item.name}">
                <span class="tag-badge tag-new">Hoje</span>
                <span class="tag-badge">PREMIUM</span>
            </div>
            <div class="episode-info">
                <h3>${item.name}</h3>
                <p>${item.description}</p>
                <div class="episode-price">
                    R$ ${item.price.toFixed(2)}
                    <button onclick="addToCart('${item.id}')">+</button>
                </div>
            </div>
        `;
        menuContainer.appendChild(card);
    });
}

window.addToCart = (id) => {
    const item = menuData.find(i => i.id === id);
    if(item) { cart.push(item); updateCartUI(); }
}

function updateCartUI() {
    cartContainer.innerHTML = '';
    let total = 0;
    cart.forEach((item, index) => {
        total += item.price;
        cartContainer.innerHTML += `
            <div style="display: flex; justify-content: space-between; border-bottom: 1px solid #333; padding: 5px 0;">
                <span>${item.name}</span>
                <span style="color: var(--primary); cursor: pointer;" onclick="removeFromCart(${index})">Remover</span>
            </div>
        `;
    });
    cartTotalElement.innerText = total.toFixed(2);
}

window.removeFromCart = (index) => { cart.splice(index, 1); updateCartUI(); }

window.submitOrder = async () => {
    const table = tableInput.value;
    if(!table) return alert('Informe sua mesa, Shinobi!');
    if(cart.length === 0) return alert('Sua lista de episódios está vazia!');

    const orderData = { table: table, items: cart, total: parseFloat(cartTotalElement.innerText) };

    try {
        const res = await fetch(API_ORDERS, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(orderData)
        });
        if(res.ok) {
            alert('Pedido enviado para a cozinha!');
            cart = []; tableInput.value = ''; updateCartUI();
        }
    } catch(err) { alert('Erro de rede.'); }
}

loadMenu();