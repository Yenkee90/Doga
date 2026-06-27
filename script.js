// ===============================
// Doga
// script.js
// ===============================

// Emlékezz a múltra! gomb
const memoryButton = document.getElementById("memoryButton");

memoryButton.addEventListener("click", function () {

    // Később ide kerül majd az átirányítás.

    // Példa:
    // window.location.href = "mult.html";

});


// Exit gomb
const exitButton = document.getElementById("exitButton");

exitButton.addEventListener("click", function () {

    // Megpróbálja bezárni az oldalt
    window.close();

    // Ha nem sikerül, visszalép az előző oldalra
    history.back();

});
