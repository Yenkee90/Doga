let state = {
  entries: {}
};

function load() {
  const saved = localStorage.getItem("dogaData");
  if (saved) {
    state = JSON.parse(saved);
  }
}

load();
