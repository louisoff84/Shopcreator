// --- LOGIQUE LOUIS EDITING ---

const urlParams = new URLSearchParams(window.location.search);
const item = urlParams.get('item');
const display = document.getElementById('product-display');

// Affichage du produit sur la page de confirmation
if (display) {
    if (item === 'gaming') display.innerText = "🎮 Montage Gaming Pro";
    else if (item === 'shorts') display.innerText = "📱 Pack Shorts / TikTok";
    else display.innerText = "✨ Commande Spéciale";
}

// Enregistrement de la commande
const orderForm = document.getElementById('order-form');
if (orderForm) {
    orderForm.onsubmit = (e) => {
        e.preventDefault();
        
        const newOrder = {
            name: display.innerText,
            user: document.getElementById('username').value,
            date: new Date().toLocaleDateString('fr-FR'),
            status: "🎬 En cours d'examen"
        };

        let orders = JSON.parse(localStorage.getItem('louisEditingOrders')) || [];
        orders.unshift(newOrder); // On met la plus récente en haut
        localStorage.setItem('louisEditingOrders', JSON.stringify(orders));

        alert("Merci ! Ton projet est envoyé à Louis Editing.");
        window.location.href = "dashboard";
    };
}

// Affichage sur le Dashboard
const ordersList = document.getElementById('orders-list');
const notifBadge = document.getElementById('notif-badge');

if (ordersList) {
    let orders = JSON.parse(localStorage.getItem('louisEditingOrders')) || [];
    
    if (orders.length > 0) {
        notifBadge.classList.remove('hidden');
        orders.forEach(order => {
            ordersList.innerHTML += `
                <tr class="border-t border-gray-800 hover:bg-gray-800/40 transition">
                    <td class="p-6 font-bold text-white">${order.name}</td>
                    <td class="p-6">
                        <span class="bg-purple-500/10 text-purple-500 border border-purple-500/30 px-3 py-1 rounded-full text-[10px] font-black uppercase">
                            ${order.status}
                        </span>
                    </td>
                    <td class="p-6 text-gray-500 text-sm font-medium">${order.date}</td>
                </tr>
            `;
        });
    } else {
        ordersList.innerHTML = '<tr><td colspan="3" class="p-12 text-center text-gray-600 font-medium italic">Aucune commande en cours. Louis attend tes rushes !</td></tr>';
    }
}
