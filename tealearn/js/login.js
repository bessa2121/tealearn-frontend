// Tela de login

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("login-form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    if (!email || !password) {
      alert("Preencha e-mail e senha.");
      return;
    }
    // Mock: vai direto para a home
    window.location.href = "dashboard.html";
  });
});
