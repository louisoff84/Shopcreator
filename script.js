const DISCORD_WEBHOOK = "https://discord.com/api/webhooks/1464545987748958324/Q-GtYCzccW3q5LIVAMbBFwrvRkTpOGITpabd02cAfz9xZE5B_8IEtvUNlfa07xdSTKk7";

// Détection du produit
const params = new URLSearchParams(window.location.search);
const item = params.get('item');
const display = document.getElementById('product-display');
if (display) {
    display.innerText = (item === 'gaming') ? "🎬 Gaming Impact" : "📱 Viral Short";
}

// Envoi de commande
const form = document.getElementById('order-form');
if (form) {
    form.onsubmit = async (e) => {
        e.preventDefault();
        const client = document.getElementById('username').value;
        const link = document.getElementById('rushs').value;

        const data = {
            service: display.innerText,
            user: client,
            rushs: link,
            date: new Date().toLocaleDateString('fr-FR'),
            status: "EN ATTENTE"
        };

        // Sauvegarde client
        let orders = JSON.parse(localStorage.getItem('louisOrders')) || [];
        orders.unshift(data);
        localStorage.setItem('louisOrders', JSON.stringify(orders));

        // Envoi Discord
        await fetch(DISCORD_WEBHOOK, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                embeds: [{
                    title: "🚀 NOUVELLE COMMANDE",
                    color: 9647871,
                    fields: [
                        { name: "Client", value: client, inline: true },
                        { name: "Format", value: data.service, inline: true },
                        { name: "Lien", value: link }
                    ]
                }]
            })
        });

        window.location.href = "dashboard";
    };
}

// Dashboard
const list = document.getElementById('orders-list');
if (list) {
    let orders = JSON.parse(localStorage.getItem('louisOrders')) || [];
    list.innerHTML = orders.map(o => `
        <tr class="border-t border-white/5 transition hover:bg-white/[0.02]">
            <td class="p-6 font-black text-[10px] tracking-widest text-purple-400 uppercase">${o.service}</td>
            <td class="p-6"><span class="bg-white/10 text-[9px] px-3 py-1 rounded-full border border-white/10 font-black uppercase">En attente</span></td>
            <td class="p-6 text-gray-500 text-xs">${o.date}</td>
        </tr>
    `).join('') || "<tr><td colspan='3' class='p-20 text-center text-gray-700 italic text-sm'>Aucun projet en cours.</td></tr>";
}
