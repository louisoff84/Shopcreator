const Auth = {
    login: (u, p) => {
        if(u==='admin' && p==='louis123') { localStorage.setItem('role', 'admin'); window.location.href='admin.html'; }
        else if(u==='client' && p==='guest') { localStorage.setItem('role', 'client'); window.location.href='dashboard.html'; }
        else alert("Identifiants incorrects");
    },
    check: (r) => { if(localStorage.getItem('role') !== r) window.location.href='login.html'; },
    logout: () => { localStorage.clear(); window.location.href='index.html'; }
};
