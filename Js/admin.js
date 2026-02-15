function createLink() {
    const name = document.getElementById('pName').value;
    const url = document.getElementById('pUrl').value;

    if(!name || !url) return alert("Veuillez remplir les champs");

    const data = { n: name, u: url, ts: Date.now() };
    const token = btoa(JSON.stringify(data)); // Encodage Base64

    // On génère le lien vers la page download.html qui est à la racine
    const finalLink = window.location.origin + window.location.pathname.replace('admin.html', 'download.html') + "?t=" + token;

    document.getElementById('res').style.display = 'block';
    document.getElementById('linkOutput').value = finalLink;
}
