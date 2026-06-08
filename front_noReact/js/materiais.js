// Tela "Meus Materiais" — filtro por matéria

const MATERIALS = [
  { title: "Brasil Colônia",       subject: "História",  date: "Hoje",      summary: "Período colonial e ciclos econômicos." },
  { title: "Relevo Brasileiro",    subject: "Geografia", date: "Ontem",     summary: "Planaltos, planícies e depressões." },
  { title: "Figuras de Linguagem", subject: "Português", date: "2 dias",    summary: "Metáfora, metonímia e antítese." },
  { title: "Revolução Francesa",   subject: "História",  date: "1 semana",  summary: "Causas, etapas e legado." },
  { title: "Climas do Mundo",      subject: "Geografia", date: "1 semana",  summary: "Zonas climáticas e suas características." },
  { title: "Análise Sintática",    subject: "Português", date: "2 semanas", summary: "Sujeito, predicado e complementos." },
];

const ALLOWED_EXTS = [".txt", ".pdf", ".docx"];

const state = {
  subjects: ["História", "Geografia", "Português"],
  selected: "Todas",
  open: false,
};

function renderGrid() {
  const grid = document.getElementById("materials-grid");
  const list = state.selected === "Todas"
    ? MATERIALS
    : MATERIALS.filter((m) => m.subject === state.selected);

  if (list.length === 0) {
    grid.innerHTML = `<p class="empty">Nenhum material encontrado.</p>`;
    return;
  }

  grid.innerHTML = list.map((m) => `
    <article class="card">
      <div class="card-thumb thumb-light"></div>
      <p class="card-meta">${m.subject} · ${m.date}</p>
      <h3 class="card-title">${m.title}</h3>
      <p class="card-summary">${m.summary}</p>
    </article>
  `).join("");
}

function renderDropdown() {
  const dd = document.getElementById("filter-dropdown");
  const items = ["Todas", ...state.subjects];
  dd.innerHTML = `
    ${items.map((s) => `
      <button class="filter-item ${state.selected === s ? "active" : ""}" data-value="${s}">${s}</button>
    `).join("")}
    <div class="new-subject">
      <input id="new-subject" type="text" placeholder="Nova matéria" />
      <button id="add-subject">+</button>
    </div>
  `;

  dd.querySelectorAll(".filter-item").forEach((btn) => {
    btn.addEventListener("click", () => {
      state.selected = btn.dataset.value;
      state.open = false;
      updateUI();
    });
  });

  const newInput = document.getElementById("new-subject");
  const addBtn = document.getElementById("add-subject");
  const addSubject = () => {
    const v = newInput.value.trim();
    if (!v || state.subjects.includes(v)) return;
    state.subjects.push(v);
    newInput.value = "";
    renderDropdown();
  };
  addBtn.addEventListener("click", addSubject);
  newInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") { e.preventDefault(); addSubject(); }
  });
}

function updateUI() {
  const btn = document.getElementById("filter-btn");
  btn.textContent = state.selected === "Todas" ? "Filtrar" : `Filtrar: ${state.selected}`;
  document.getElementById("filter-dropdown").classList.toggle("open", state.open);
  renderDropdown();
  renderGrid();
}

function setupFilter() {
  const btn = document.getElementById("filter-btn");
  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    state.open = !state.open;
    updateUI();
  });

  document.addEventListener("click", (e) => {
    const dd = document.getElementById("filter-dropdown");
    if (!dd.contains(e.target) && e.target.id !== "filter-btn" && state.open) {
      state.open = false;
      updateUI();
    }
  });
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
  setupFilter();
  setupUpload();
  updateUI();
});
