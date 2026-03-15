// Registrasi Service Worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Sesuaikan path SW dengan repository
        navigator.serviceWorker.register('/fullscreenpwa/sw.js')
            .then(registration => {
                console.log('Service Worker terdaftar:', registration.scope);
            })
            .catch(error => {
                console.log('Registrasi Service Worker gagal:', error);
            });
    });
}

// Paksa fullscreen dan landscape
window.addEventListener('load', () => {
    // Paksa fullscreen tanpa batasan
    const enterFullscreen = () => {
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen({
                navigationUI: "hide",
                screenOrientation: {
                    angle: 90 // Paksa landscape
                }
            }).catch(err => console.log('Gagal masuk fullscreen:', err));
        } else if (document.documentElement.webkitRequestFullscreen) {
            // Khusus untuk browser berbasis WebKit
            document.documentElement.webkitRequestFullscreen({
                navigationUI: "hide"
            });
            screen.orientation.lock('landscape').catch(err => console.log('Gagal kunci orientasi:', err));
        }
    };

    enterFullscreen();
    window.addEventListener('resize', enterFullscreen);

    // Cek orientasi
    function checkOrientation() {
        if (window.innerHeight > window.innerWidth) {
            alert("Mohon putar perangkat ke mode landscape!");
        }
    }
    window.addEventListener('resize', checkOrientation);
    checkOrientation();
});

// Prompt instalasi mirip GitHub
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
    installBtn.style.zIndex = '999';
    document.body.appendChild(installBtn);

    installBtn.addEventListener('click', () => {
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then((choiceResult) => {
            deferredPrompt = null;
            installBtn.remove();
        });
    });
});
