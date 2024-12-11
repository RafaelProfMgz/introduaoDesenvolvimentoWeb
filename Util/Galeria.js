const imagePaths = [
  "./Assets/Galeria/Galeria1.jpg",
  "./Assets/Galeria/Galeria2.jpg",
  "./Assets/Galeria/Galeria3.jpg",
];

function carregarImagens() {
  console.log("teste");

  const imgElements = document.querySelectorAll(".bloco-imagem img");

  imgElements.forEach((imgElement, index) => {
    if (imgElement) {
      imgElement.src = imagePaths[index];
      imgElement.alt = `Imagem ${index + 1}`;
    }
  });
}

document.addEventListener("DOMContentLoaded", function () {
  carregarImagens();
});


