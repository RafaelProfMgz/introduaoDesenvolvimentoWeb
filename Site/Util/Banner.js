document.addEventListener("DOMContentLoaded", () => {
  const bannerImage = document.querySelector("#banner");
  const imagePath = "./Assets/Banner/Banner.webp";
  const img = new Image();
  img.src = imagePath;

  img.onload = () => {
    bannerImage.style.backgroundImage = `url(${img.src})`;
  };

  img.onerror = () => {
    console.error("Erro ao carregar a imagem do banner.");
    bannerImage.style.backgroundColor = "var(--cor-hover)";
  };
});
