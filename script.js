// --- CONFIGURATION ---
const DISCORD_WEBHOOK_URL = "TON_URL_WEBHOOK_ICI"; // <--- COLLE TON URL ICI

// --- GESTION DU NOM DU PRODUIT ---
const urlParams = new URLSearchParams(window.location.search);
const item = urlParams.get('item');
const display = document.getElementById('product-display');

if (display) {
    if (item === 'gaming') display.innerText = "🎮 Montage Gaming Pro";
    else if (item === 'shorts') display.innerText = "📱 Pack Shorts / TikTok";
    else display.innerText = "✨ Commande Spéciale";
}

// --- ENVOI DE LA COMMANDE (VERS DISCORD + LOCALSTORAGE) ---
const orderForm = document.getElementById('order-form');
if (orderForm) {
    orderForm.onsubmit = async (e) => {
        e.preventDefault();
        
        const username = document.getElementById('username').value;
        const rushs = document.getElementById('rushs').value;
        const productName = display.innerText;

        const orderData = {
            name: productName,
            user: username,
            rushs: rushs,
            date: new Date().toLocaleDateString('fr-FR'),
            status: "🎬 En cours d'examen"
        };

        // 1. Sauvegarde locale pour le client
        let orders = JSON.parse(localStorage.getItem('louisEditingOrders')) || [];
        orders.unshift(orderData);
        localStorage.setItem('louisEditingOrders', JSON.stringify(orders));

        // 2. ENVOI VERS TON DISCORD (L'admin reçoit l'info !)
        const discordMessage = {
            username: "Louis Editing Bot",
            embeds: [{
                title: "🚀 Nouvelle Commande !",
                color: 9442302, // Couleur violette
                fields: [
                    { name: "Client", value: username, inline: true },
                    { name: "Service", value: productName, inline: true },
                    { name: "Lien des Rushs", value: rushs }
                ],
                footer: { text: "Louis Editing - Système de commande" }
            }]
        };

        try {
            await fetch(DISCORD_WEBHOOK_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(discordMessage)
            });
            alert("Commande envoyée avec succès ! Louis va l'examiner.");
            window.location.href = "dashboard";
        } catch (err) {
            alert("Erreur lors de l'envoi. Vérifie ta connexion.");
        }
    };
}

// --- AFFICHAGE DASHBOARD CLIENT ---
const ordersList = document.getElementById('orders-list');
if (ordersList) {
    let orders = JSON.parse(localStorage.getItem('louisEditingOrders')) || [];
    if (orders.length > 0) {
        orders.forEach(order => {
            ordersList.innerHTML += `
                <tr class="border-t border-gray-800 hover:bg-gray-800/40 transition">
                    <td class="p-6 font-bold text-white">${order.name}</td>
                    <td class="p-6"><span class="bg-purple-500/10 text-purple-500 border border-purple-500/30 px-3 py-1 rounded-full text-[10px] font-black uppercase">${order.status}</span></td>
                    <td class="p-6 text-gray-500 text-sm">${order.date}</td>
                </tr>`;
        });
    } else {
        ordersList.innerHTML = '<tr><td colspan="3" class="p-12 text-center text-gray-600 italic font-medium">Aucune commande. Louis attend tes rushes !</td></tr>';
    }
}
