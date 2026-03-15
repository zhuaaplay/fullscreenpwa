if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('Service Worker terdaftar:', registration.scope);
            })
            .catch(error => {
                console.log('Registrasi Service Worker gagal:', error);
            });
    });
}

window.addEventListener('load', () => {
    if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen({ navigationUI: "hide" })
            .catch(err => console.log('Gagal masuk fullscreen:', err));
    }

    function checkOrientation() {
        if (window.innerHeight > window.innerWidth) {
            alert("Mohon putar perangkat ke mode landscape!");
        }
    }

    window.addEventListener('resize', checkOrientation);
    checkOrientation();
});

let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    const installBtn = document.createElement('button');
    installBtn.textContent = 'Instal Aplikasi';
    installBtn.style.position = 'absolute';
    installBtn.style.top = '20px';
    installBtn.style.right = '20px';
    installBtn.style.padding = '8px 16px';
    installBtn.style.border = 'none';
    installBtn.style.borderRadius = '4px';
    installBtn.style.backgroundColor = '#2ea44f';
    installBtn.style.color = 'white';
    installBtn.style.cursor = 'pointer';
    document.body.appendChild(installBtn);

    installBtn.addEventListener('click', () => {
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('Pengguna menerima instalasi');
            } else {
                console.log('Pengguna menolak instalasi');
            }
            deferredPrompt = null;
            installBtn.remove();
        });
    });
});
