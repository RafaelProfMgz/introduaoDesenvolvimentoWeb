document.addEventListener("DOMContentLoaded", () => {
  // Carregar Banner.html
  fetch("./Component/Banner/Banner.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("banner").innerHTML = data;
    })
    .catch((error) => {
      console.error("Erro ao carregar o banner:", error);
    });

  // Carregar Sobre.html
  fetch("./Component/Sobre/Sobre.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("sobre").innerHTML = data;
    })
    .catch((error) => {
      console.error("Erro ao carregar a seção Sobre:", error);
    });


  // Carregar Galeria.html
  fetch("./Component/Galeria/Galeria.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("galeria").innerHTML = data;
      carregarImagens();
    })
    .catch((error) => {
      console.error("Erro ao carregar a seção Galeria:", error);
    });

  // Carregar Social.html
  fetch("./Component/Social/Social.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("social").innerHTML = data;
      carregarImagensSocial();
    })
    .catch((error) => {
      console.error("Erro ao carregar a seção social:", error);
    });
});

// Função para carregar as imagens na galeria
function carregarImagens() {
  const imgElements = document.querySelectorAll(".bloco-imagem img");

  imgElements.forEach((imgElement, index) => {
    if (imgElement && imagePaths[index]) {
      imgElement.src = imagePaths[index];
      imgElement.alt = `Imagem ${index + 1}`;
    }
  });
}

// Função para carregar as imagens sociais
function carregarImagensSocial() {
  const socialIcons = {
    facebook: "./Assets/Facebook/Facebook.png",
    instagram: "./Assets/Instagram/Instagram.png",
    whatsapp: "./Assets/Whatsapp/Whatsapp.png",
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
