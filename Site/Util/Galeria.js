const imagePaths = [
  "./Assets/Galeria/Galeria1.jpg",
  "./Assets/Galeria/Galeria2.jpg",
  "./Assets/Galeria/Galeria3.jpg",
];

function carregarImagens() {
  console.log("teste");

  // Selecionando todas as imagens dentro de blocos com a classe 'bloco-imagem'
  const imgElements = document.querySelectorAll(".bloco-imagem img");

  imgElements.forEach((imgElement, index) => {
    if (imgElement) {
      // Atribuindo o caminho da imagem e o texto alternativo
      imgElement.src = imagePaths[index];
      imgElement.alt = `Imagem ${index + 1}`;
    }
  });
}

// Usando o evento 'DOMContentLoaded' para garantir que o DOM foi carregado antes de manipular os elementos
document.addEventListener("DOMContentLoaded", function () {
  carregarImagens();
});
