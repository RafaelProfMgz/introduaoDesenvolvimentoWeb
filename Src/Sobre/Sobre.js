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

  // Carregar Sobre.html
  fetch("../../Component/Sobre/Sobre.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("sobre").innerHTML = data;
    })
    .catch((error) => {
      console.error("Erro ao carregar a seção Sobre:", error);
    });
  // Carregar Detalhes.html
  fetch("../../Component/Detalhes/Detalhes.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("detalhes").innerHTML = data;
    })
    .catch((error) => {
      console.error("Erro ao carregar a seção detalhes:", error);
    });
  // Carregar Footer.html
  fetch("../../Component/Footer/Footer.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("Footer").innerHTML = data;
    })
    .catch((error) => {
      console.error("Erro ao carregar a seção Footer:", error);
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
