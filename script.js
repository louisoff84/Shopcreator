const DISCORD_WEBHOOK = "https://discord.com/api/webhooks/1464545987748958324/Q-GtYCzccW3q5LIVAMbBFwrvRkTpOGITpabd02cAfz9xZE5B_8IEtvUNlfa07xdSTKk7";

async function envoyerCommande(data) {
    // On crée un identifiant unique pour cette commande
    const orderId = btoa(JSON.stringify(data)); // Encode les données en Base64

    await fetch(DISCORD_WEBHOOK, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            embeds: [{
                title: "🚀 NOUVELLE COMMANDE : " + data.service,
                color: 9647871,
                description: "Clique sur le bouton ci-dessous pour l'ajouter à ton panel admin.",
                fields: [
                    { name: "👤 Client", value: data.user, inline: true },
                    { name: "🔗 Rushes", value: data.rushs }
                ],
                // On génère un lien spécial qui contient les données
                url: window.location.origin + "/admin?import=" + orderId
            }]
        })
    });
}
