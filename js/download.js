const t = new URLSearchParams(window.location.search).get('t');
if(t) {
    try {
        const data = JSON.parse(atob(t));
        document.getElementById('title').innerText = "Prêt : " + data.n;
        const b = document.getElementById('btn');
        b.href = data.u; b.style.display = "inline-block";
    } catch(e) { document.getElementById('title').innerText = "Lien invalide ❌"; }
}
