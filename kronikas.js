function toggleKronikas() {
  document.getElementById("kronikas").classList.toggle("hidden");
}

function applyKronikas() {
  const input = document.getElementById("kronikasInput").value;

  try {
    const data = JSON.parse(input);
    localStorage.setItem("dogaData", JSON.stringify(data));
    alert("Alkalmazva");
  } catch (e) {
    alert("Hibás JSON");
  }
}

function exportData() {
  const data = localStorage.getItem("dogaData");
  console.log(data);
  alert("Export a konzolra");
}
