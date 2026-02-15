const Auth = {
    login: (user, pass) => {
        if (user === 'admin' && pass === 'louis123') {
            localStorage.setItem('louis_session', 'admin');
            window.location.href = 'admin.html';
        } else if (user === 'client' && pass === 'guest') {
            localStorage.setItem('louis_session', 'client');
            window.location.href = 'dashboard.html';
        } else {
            alert("Accès refusé");
        }
    },
    check: (roleRequired) => {
        const session = localStorage.getItem('louis_session');
        if (!session || (roleRequired && session !== roleRequired)) {
            window.location.href = 'login.html';
        }
    },
    logout: () => {
        localStorage.removeItem('louis_session');
        window.location.href = 'index.html';
    }
};
