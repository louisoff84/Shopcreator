const DISCORD_WEBHOOK = "https://discord.com/api/webhooks/1464545987748958324/Q-GtYCzccW3q5LIVAMbBFwrvRkTpOGITpabd02cAfz9xZE5B_8IEtvUNlfa07xdSTKk7";

const params = new URLSearchParams(window.location.search);
const item = params.get('item');
const display = document.getElementById('product-display');
if (display) display.innerText = (item === 'gaming') ? "🎬 Gaming Impact" : "📱 Viral Short";

const form = document.getElementById('order-form');
if (form) {
    form.onsubmit = async (e) => {
        e.preventDefault();
        const data = {
            service: (item === 'gaming') ? "Gaming" : "Short",
            user: document.getElementById('username').value,
            rushs: document.getElementById('rushs').value,
            date: new Date().toLocaleDateString('fr-FR')
        };

        // Création du lien d'importation auto pour l'admin
        const importLink = window.location.origin + "/admin.html?data=" + btoa(JSON.stringify(data));

        await fetch(DISCORD_WEBHOOK, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                embeds: [{
                    title: "🚀 NOUVELLE COMMANDE",
                    color: 9647871,
                    description: `[CLIQUE ICI POUR AJOUTER AU PANEL ADMIN](${importLink})`,
                    fields: [
                        { name: "Client", value: data.user, inline: true },
                        { name: "Format", value: data.service, inline: true }
                    ]
                }]
            })
        });

        alert("Envoyé !");
        window.location.href = "index.html";
    };
}
