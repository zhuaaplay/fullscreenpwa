// Registrasi Service Worker untuk mendukung PWA
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

// Paksa orientasi landscape dan fullscreen saat dimuat
window.addEventListener('load', () => {
    // Coba paksa fullscreen
    if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen({ navigationUI: "hide" })
            .catch(err => console.log('Gagal masuk fullscreen:', err));
    }

    // Deteksi orientasi dan arahkan ke landscape
    function checkOrientation() {
        if (window.innerHeight > window.innerWidth) {
            alert("Mohon putar perangkat ke mode landscape!");
        }
    }

    window.addEventListener('resize', checkOrientation);
    checkOrientation();
});
