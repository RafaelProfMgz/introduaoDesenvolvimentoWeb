document.addEventListener("DOMContentLoaded", () => {
  // Carregar NavBar.html
  fetch("../../Component/NavBar/NavBar.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("NavBar").innerHTML = data;
    })
    .catch((error) => {
      console.error("Erro ao carregar a seção NavBar:", error);
    });

  // Carregar Restaurante.html
  fetch("../../Component/Restaurante/Restaurante.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("restaurante").innerHTML = data;
      carregarImagens();
    })
    .catch((error) => {
      console.error("Erro ao carregar a seção Restaurante:", error);
    });

  // Carregar Social.html
  fetch("../../Component/Social/Social.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("social").innerHTML = data;
      carregarImagensSocial();
    })
    .catch((error) => {
      console.error("Erro ao carregar a seção social:", error);
    });
});

// Função para carregar as imagens sociais
function carregarImagensSocial() {
  const socialIcons = {
    facebook: "../../Assets/Facebook/Facebook.png",
    instagram: "../../Assets/Instagram/Instagram.png",
    whatsapp: "../../Assets/Whatsapp/Whatsapp.png",
  };

  const facebookIcon = document.getElementById("facebook-icon");
  const whatsappIcon = document.getElementById("whatsapp-icon");
  const instagramIcon = document.getElementById("instagram-icon");

  if (facebookIcon) {
    facebookIcon.src = socialIcons.facebook;
  }
  if (whatsappIcon) {
    whatsappIcon.src = socialIcons.whatsapp;
  }
  if (instagramIcon) {
    instagramIcon.src = socialIcons.instagram;
  }
}
// Função para carregar as imagens e exibir na galeria
function carregarImagens() {
  const galeriaContainer = document.getElementById("imagens");

  const totalImagens = 6; 

  // Loop para criar cards de imagens
  for (let i = 1; i <= totalImagens; i++) {
    const imageName = `Galeria${i}.jpg`; // Altere a extensão conforme necessário

    // Criar o card de imagem
    const card = document.createElement("div");
    card.classList.add("card-imagem");

    const img = document.createElement("img");
    img.src = `../../Assets/Galeria/${imageName}`;
    img.alt = `Imagem ${i}`;
    img.classList.add("imagem-galeria");

    // Adiciona a imagem ao card
    card.appendChild(img);

    // Adiciona o card à galeria
    galeriaContainer.appendChild(card);

    // Atraso progressivo para cada imagem
    setTimeout(() => {
      card.classList.add("visible");
    }, i * 300); // Atraso de 300ms entre cada imagem
  }
}
