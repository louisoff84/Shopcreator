// --- CONFIGURATION ---
const ADMIN_PASSWORD = "LOUIS_EDIT_2024"; // <--- CHANGE TON MOT DE PASSE ICI

// --- SECURITÉ ---
function checkPass() {
    const pass = document.getElementById('admin-pass').value;
    if(pass === ADMIN_PASSWORD) {
        document.getElementById('admin-login').classList.add('hidden');
        document.getElementById('admin-content').classList.remove('hidden');
        loadAdminOrders();
    } else {
        alert("Mot de passe incorrect");
    }
}

function logout() {
    location.reload();
}

// --- GESTION DES COMMANDES ---
function loadAdminOrders() {
    const list = document.getElementById('admin-orders-list');
    let orders = JSON.parse(localStorage.getItem('adminOrders')) || [];
    
    list.innerHTML = orders.map((o, index) => `
        <tr class="border-t border-white/5 hover:bg-white/[0.02] transition">
            <td class="p-6">
                <div class="text-white font-black text-xs uppercase italic">${o.service}</div>
                <div class="text-[9px] text-gray-500 font-bold">${o.date}</div>
            </td>
            <td class="p-6 font-bold text-purple-400 text-sm">${o.user}</td>
            <td class="p-6">
                <a href="${o.rushs}" target="_blank" class="text-blue-500 hover:underline text-xs truncate block max-w-[150px]">Lien Rushes 🔗</a>
            </td>
            <td class="p-6">
                <button onclick="deleteOrder(${index})" class="text-red-500 hover:text-white transition text-[10px] font-black uppercase">Supprimer</button>
            </td>
        </tr>
    `).join('') || "<tr><td colspan='4' class='p-20 text-center text-gray-700 italic text-sm font-medium uppercase'>Aucune donnée importée.</td></tr>";
}

function importOrder() {
    const code = document.getElementById('import-code').value;
    try {
        // Nettoie le code si copié avec des backticks de Discord
        const cleanCode = code.replace(/```json|```/g, "").trim();
        const data = JSON.parse(cleanCode);
        
        let orders = JSON.parse(localStorage.getItem('adminOrders')) || [];
        orders.unshift(data);
        localStorage.setItem('adminOrders', JSON.stringify(orders));
        
        document.getElementById('import-code').value = "";
        loadAdminOrders();
    } catch(e) {
        alert("Format de code invalide ! Vérifie le JSON envoyé sur Discord.");
    }
}

function deleteOrder(index) {
    if(confirm("Supprimer cette commande ?")) {
        let orders = JSON.parse(localStorage.getItem('adminOrders')) || [];
        orders.splice(index, 1);
        localStorage.setItem('adminOrders', JSON.stringify(orders));
        loadAdminOrders();
    }
}
