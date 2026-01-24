// --- AUTO-IMPORT DEPUIS URL ---
window.onload = function() {
    const params = new URLSearchParams(window.location.search);
    const importData = params.get('import');

    if (importData) {
        try {
            // Décode les données contenues dans l'URL
            const decodedData = JSON.parse(atob(importData));
            
            let orders = JSON.parse(localStorage.getItem('adminOrders')) || [];
            
            // Vérifie si la commande n'existe pas déjà (doublon)
            const exists = orders.find(o => o.rushs === decodedData.rushs && o.user === decodedData.user);
            
            if (!exists) {
                orders.unshift(decodedData);
                localStorage.setItem('adminOrders', JSON.stringify(orders));
                alert("✅ Commande récupérée avec succès !");
            }
            
            // Nettoie l'URL pour rester propre
            window.history.replaceState({}, document.title, "/admin");
            
            // Si on est déjà loggé, on affiche
            if(!document.getElementById('admin-content').classList.contains('hidden')) {
                loadAdminOrders();
            }
        } catch (e) {
            console.error("Erreur d'importation automatique", e);
        }
    }
};
