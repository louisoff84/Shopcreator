function createLink() {
    const n = document.getElementById('pName').value;
    const u = document.getElementById('pUrl').value;
    if(!n || !u) return alert("Remplis tout !");
    const token = btoa(JSON.stringify({n, u, d: Date.now()}));
    const res = document.getElementById('res');
    res.value = window.location.origin + window.location.pathname.replace('admin.html', 'download.html') + "?t=" + token;
    res.style.display = 'block';
}
