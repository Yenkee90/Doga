// Ugrimuu - UI kezelő
// Kezeli a kijelzőket, gombokat és játék vége ablakot

const UI = {
    elements: {},

    init() {
        this.elements.uiText = document.getElementById("ui");
        this.elements.startButton = document.getElementById("start-btn");
        this.elements.overlay = document.getElementById("screen-overlay");
        this.elements.overlayTitle = document.getElementById("overlay-title");
        this.elements.overlayDesc = document.getElementById("overlay-desc");
        this.elements.overlayButton = document.getElementById("start-btn-overlay");

        console.log("UI rendszer betöltve");
    },


    updateInfo(zona, tavolsag, veszely = false) {
        if (!this.elements.uiText) return;

        let jelzes = veszely ? " ⚠️ UFO VESZÉLY!" : "";

        this.elements.uiText.innerHTML =
            `Zóna: ${zona} | Hátralévő út: ${Math.floor(tavolsag)} m${jelzes}`;
    },


    showGameOver(gyozelem = false) {
        if (!this.elements.overlay) return;

        this.elements.overlay.style.display = "flex";

        if (gyozelem) {
            this.elements.overlayTitle.innerHTML = "GYŐZELEM!";
            this.elements.overlayTitle.style.color = "#33ff33";

            this.elements.overlayDesc.innerHTML =
                "A tehén biztonságban bejutott a rendőrségre!";
        } 
        else {
            this.elements.overlayTitle.innerHTML = "JÁTÉK VÉGE";
            this.elements.overlayTitle.style.color = "#ff3333";

            this.elements.overlayDesc.innerHTML =
                "Az UFO elrabolta a tehenet!";
        }
    },


    hideOverlay() {
        if (!this.elements.overlay) return;

        this.elements.overlay.style.display = "none";
    },


    showRestartButton() {
        if (this.elements.startButton) {
            this.elements.startButton.style.display = "block";
        }
    },


    hideRestartButton() {
        if (this.elements.startButton) {
            this.elements.startButton.style.display = "none";
        }
    }
};
