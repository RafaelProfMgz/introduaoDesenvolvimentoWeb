const estoqueTable = document
  .getElementById("estoqueTable")
  .getElementsByTagName("tbody")[0];
const adicionarItemButton = document.getElementById("adicionarItemButton");
const modal = document.getElementById("modal");
const closeButton = document.querySelector(".close-button");
const limparButton = document.getElementById("limparButton");

// Abre o modal ao clicar no botão "Adicionar Item"
adicionarItemButton.addEventListener("click", function () {
  modal.style.display = "block";
});

// Fecha o modal ao clicar no "X"
closeButton.addEventListener("click", function () {
  modal.style.display = "none";
});

// Fecha o modal ao clicar fora do conteúdo do modal
window.addEventListener("click", function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
});

// Adiciona item ao estoque
document.getElementById("estoqueForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const itemName = document.getElementById("itemName").value;
  const itemQuantity = document.getElementById("itemQuantity").value;

  const newRow = estoqueTable.insertRow();
  const cellName = newRow.insertCell(0);
  const cellQuantity = newRow.insertCell(1);
  const cellActions = newRow.insertCell(2);

  cellName.textContent = itemName;
  cellQuantity.textContent = itemQuantity;
  cellActions.innerHTML = '<button onclick="removeItem(this)">Remover</button>';

  // Limpa o formulário e fecha o modal após adicionar o item
  this.reset();
});

// Remove item da tabela
function removeItem(button) {
  const row = button.parentNode.parentNode;
  estoqueTable.deleteRow(row.rowIndex - 1);
}

// Função para limpar todos os itens do estoque
limparButton.addEventListener("click", function () {
  while (estoqueTable.rows.length > 0) {
    estoqueTable.deleteRow(0);
  }
});
const menuButton = document.getElementById("menuButton");
menuButton.addEventListener("click", function () {
  window.location.href = "../../index.html"; // Caminho para o relatório
});
