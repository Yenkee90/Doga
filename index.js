// Service Worker regisztrálása
if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker.register("sw.js");
    });
}

// PWA telepítés
let deferredPrompt = null;

window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    deferredPrompt = e;
});

const installBtn = document.getElementById("installBtn");

installBtn.addEventListener("click", async () => {

    // Ha a PWA már telepítve van
    if (window.matchMedia("(display-mode: standalone)").matches) {
        window.location.href = "1one/index1.html";
        return;
    }

    // Ha a böngésző támogatja a telepítést
    if (deferredPrompt) {

        deferredPrompt.prompt();

        const result = await deferredPrompt.userChoice;

        if (result.outcome === "accepted") {
            window.location.href = "1one/index1.html";
        }

        deferredPrompt = null;

    } else {

        alert(
            "A telepítés ezen a böngészőn nem érhető el.\n\nHa Android Chrome böngészőt használsz, a menüben válaszd az »Alkalmazás telepítése« vagy a »Hozzáadás a kezdőképernyőhöz« lehetőséget."
        );

    }

});

// Ha az alkalmazás már telepítve lett
window.addEventListener("appinstalled", () => {
    window.location.href = "1one/index1.html";
});
