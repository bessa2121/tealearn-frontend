// Materiais recentes — Home
const RECENT_ITEMS = [
  { title: "Limites e Continuidade", summary: "Introdução aos conceitos de limite e funções contínuas.", thumb: "thumb-accent" },
  { title: "Renascimento Italiano",  summary: "Arte, ciência e cultura no Renascimento.",                thumb: "thumb-primary" },
  { title: "Ética em Aristóteles",   summary: "Virtude e felicidade na filosofia clássica.",             thumb: "thumb-secondary" },
  { title: "Mitose e Meiose",        summary: "Divisão celular e reprodução das células.",               thumb: "thumb-accent-soft" },
];

const ALLOWED_EXTS = [".txt", ".pdf", ".docx"];

function renderRecent() {
  const grid = document.getElementById("recent-grid");
  grid.innerHTML = RECENT_ITEMS.map((it) => `
    <article class="card">
      <div class="card-thumb ${it.thumb}"></div>
      <h3 class="card-title">${it.title}</h3>
      <p class="card-summary">${it.summary}</p>
    </article>
  `).join("");
}

function setupUpload() {
  const input = document.getElementById("file-input");
  const pick = document.getElementById("file-pick");
  const nameEl = document.getElementById("file-name");
  const errEl = document.getElementById("file-error");

  pick.addEventListener("click", () => input.click());
  input.addEventListener("change", (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const ok = ALLOWED_EXTS.some((ext) => file.name.toLowerCase().endsWith(ext));
    if (!ok) {
      errEl.textContent = `Tipo inválido. Permitidos: ${ALLOWED_EXTS.join(", ")}`;
      errEl.hidden = false; nameEl.hidden = true;
      return;
    }
    errEl.hidden = true;
    nameEl.textContent = file.name;
    nameEl.hidden = false;
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderRecent();
  setupUpload();
});
