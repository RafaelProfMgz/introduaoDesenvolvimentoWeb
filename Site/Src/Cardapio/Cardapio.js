document.addEventListener("DOMContentLoaded", () => {
  // Carregar Cardapio.html
  fetch("../../Component/Cardapio/Cardapio.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("Cardapio").innerHTML = data;
    })
    .catch((error) => {
      console.error("Erro ao carregar o Cardapio:", error);
    });
  // Carregar NavBar.html
  fetch("../../Component/NavBar/NavBar.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("NavBar").innerHTML = data;
    })
    .catch((error) => {
      console.error("Erro ao carregar a seção NavBar:", error);
    });
});

document.querySelectorAll(".btn-ver-mais").forEach((button, index) => {
  button.addEventListener("click", () => {
    const cardImage = document.querySelectorAll(".card-img")[index];
    const modal = document.getElementById("modal");
    const modalImg = document.getElementById("modal-img");

    modalImg.src = cardImage.src;
    modal.style.display = "flex";
  });
});

document.querySelector(".close").addEventListener("click", () => {
  document.getElementById("modal").style.display = "none";
});

window.addEventListener("click", (event) => {
  const modal = document.getElementById("modal");
  if (event.target === modal) {
    modal.style.display = "none";
  }
});
