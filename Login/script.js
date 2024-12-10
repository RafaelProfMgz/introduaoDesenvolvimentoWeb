window.onload = function () {
  const loginForm = document.getElementById("loginForm");
  const errorMessage = document.getElementById("errorMessage");
  const usernameInput = document.getElementById("username");
  const rememberMeCheckbox = document.getElementById("rememberMe");

  // Checar se há um usuário salvo no cache (localStorage)
  const savedUsername = localStorage.getItem("lastUsername");
  if (savedUsername) {
    usernameInput.value = savedUsername;
    rememberMeCheckbox.checked = true;
  }

  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const username = usernameInput.value;
    const password = document.getElementById("password").value;

    // Usuário e senha padrão
    const defaultUsername = "admin";
    const defaultPassword = "admin";

    if (username === defaultUsername && password === defaultPassword) {
      if (rememberMeCheckbox.checked) {
        localStorage.setItem("lastUsername", username); // Salvar usuário no cache
      } else {
        localStorage.removeItem("lastUsername"); // Remover usuário do cache
      }
      // Redirecionar para a página inicial (pode modificar a URL conforme necessário)
      window.location.href = "/Menu/Menu.html";
    } else {
      errorMessage.style.display = "block"; // Exibir mensagem de erro
    }
  });
};
