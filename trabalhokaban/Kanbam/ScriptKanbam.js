// Variável para armazenar o contador de pedidos
let orderCount = 1; // Começamos em 1 para ID de pedidos

// Obtém o modal e os botões
const modal = document.getElementById("orderModal");
const closeModal = document.getElementById("closeModal");
const addOrderButton = document.getElementById("addOrderButton");
const orderForm = document.getElementById("orderForm");
const modalEdit = document.getElementById("orderModalEdit");
const closeModalEdit = document.getElementById("closeModalEdit");
const orderEditForm = document.getElementById("orderEditForm");

// Função para carregar pedidos do localStorage
function loadOrders() {
  const orders = JSON.parse(localStorage.getItem("orders")) || {};
  for (const [id, order] of Object.entries(orders)) {
    addOrderToColumn(order.name, order.status, id);
  }
}

// Função para adicionar um novo pedido
function addOrder(event) {
  event.preventDefault(); // Impede o envio do formulário

  const orderDescription = document
    .getElementById("orderDescription")
    .value.trim();
  const orderType = document.getElementById("orderType").value;
  const orderQuantity = document.getElementById("orderQuantity").value;

  // Verifica se os campos de entrada não estão vazios
  if (orderDescription && orderType && orderQuantity) {
    const order = {
      id: `pedido-${orderCount}`,
      name: `${orderDescription} (${orderType}) - Qtd: ${orderQuantity}`,
      status: "Solicitado",
    };

    // Adiciona o pedido ao localStorage
    saveOrder(order);

    // Adiciona o novo pedido à coluna "Solicitado"
    addOrderToColumn(order.name, order.status, order.id);

    // Limpa os campos de entrada e fecha o modal
    orderForm.reset();
    closeModalFunction();
    orderCount++;

    alert(`Pedido adicionado: ${order.name}`);
    console.log("Pedido adicionado:", order);
  } else {
    alert("Por favor, preencha todos os campos.");
  }
}

// Função para abrir o modal de adicionar pedido
function openModal() {
  modal.style.display = "block";
}

// Função para fechar o modal de adicionar pedido
function closeModalFunction() {
  modal.style.display = "none";
}

// Função para abrir o modal de editar pedido
function openEditModal(orderId) {
  const orders = JSON.parse(localStorage.getItem("orders")) || {};
  const order = orders[orderId];

  if (order) {
    document.getElementById("editOrderDescription").value =
      order.name.split(" (")[0];
    document.getElementById("editOrderType").value =
      order.name.match(/\((.*?)\)/)[1];
    document.getElementById("editOrderQuantity").value =
      order.name.match(/Qtd: (\d+)/)[1];
    modalEdit.style.display = "block";

    // Atualiza o formulário de edição com o ID do pedido
    orderEditForm.onsubmit = (event) => editOrder(event, orderId);
  }
}

// Função para fechar o modal de edição
function closeEditModal() {
  modalEdit.style.display = "none";
}

// Adiciona eventos de clique e submissão
addOrderButton.addEventListener("click", openModal);
closeModal.addEventListener("click", closeModalFunction);
orderForm.addEventListener("submit", addOrder);
closeModalEdit.addEventListener("click", closeEditModal);

// Função para adicionar um pedido a uma coluna específica
function addOrderToColumn(orderName, status, orderId) {
  const newOrder = document.createElement("div");
  newOrder.className = "kanban-item";
  newOrder.draggable = true;
  newOrder.id = orderId;
  newOrder.textContent = orderName;
  newOrder.dataset.id = orderId;

  // Criação de um contêiner para os botões
  const buttonContainer = document.createElement("div");
  buttonContainer.className = "button-container";

  // Adiciona botões de editar e remover
  const editButton = document.createElement("button");
  editButton.className = "edit-button";
  editButton.innerHTML = `<i class="fas fa-pencil-alt"></i>`;
  editButton.onclick = () => openEditModal(orderId); // Abre o modal de edição

  const removeButton = document.createElement("button");
  removeButton.className = "remove-button";
  removeButton.innerHTML = `<i class="fas fa-trash"></i>`;
  removeButton.onclick = () => removeOrder(orderId);

  // Adiciona os botões ao contêiner
  buttonContainer.appendChild(editButton);
  buttonContainer.appendChild(removeButton);

  // Adiciona o contêiner de botões ao novo pedido
  newOrder.appendChild(buttonContainer);

  // Adiciona o novo pedido à coluna correspondente
  const column = document.getElementById(`${status.toLowerCase()}-column`);
  column.appendChild(newOrder);

  // Adiciona eventos de arrastar
  newOrder.addEventListener("dragstart", drag);
}

// Função para salvar o pedido no localStorage
function saveOrder(order) {
  const orders = JSON.parse(localStorage.getItem("orders")) || {};
  orders[order.id] = { name: order.name, status: order.status };
  localStorage.setItem("orders", JSON.stringify(orders));
}

// Função para permitir arrastar
function allowDrop(event) {
  event.preventDefault();
}

// Função para lidar com o drop
function drop(event) {
  event.preventDefault();
  const data = event.dataTransfer.getData("text/plain");
  const draggableElement = document.getElementById(data);
  const dropzone = event.target.closest(".kanban-column");

  if (dropzone && draggableElement) {
    dropzone.appendChild(draggableElement);

    // Atualiza o status do pedido no localStorage
    updateOrderStatus(data, dropzone.querySelector("h3").textContent);
  }
}

// Função para iniciar o arrasto
function drag(event) {
  event.dataTransfer.setData("text/plain", event.target.id);
}

// Função para atualizar o status do pedido no localStorage
function updateOrderStatus(orderId, newStatus) {
  const orders = JSON.parse(localStorage.getItem("orders")) || {};
  if (orders[orderId]) {
    orders[orderId].status = newStatus;
    localStorage.setItem("orders", JSON.stringify(orders));
  }
}

// Função para remover um pedido
function removeOrder(orderId) {
  const itemToRemove = document.getElementById(orderId);
  if (itemToRemove) {
    itemToRemove.remove();

    // Remove o pedido do localStorage
    const orders = JSON.parse(localStorage.getItem("orders")) || {};
    delete orders[orderId];
    localStorage.setItem("orders", JSON.stringify(orders));
  }
}

// Função para editar um pedido
function editOrder(event, orderId) {
  event.preventDefault(); // Impede o envio do formulário

  const orderDescription = document
    .getElementById("editOrderDescription")
    .value.trim();
  const orderType = document.getElementById("editOrderType").value;
  const orderQuantity = document.getElementById("editOrderQuantity").value;

  if (orderDescription && orderType && orderQuantity) {
    const updatedOrderName = `${orderDescription} (${orderType}) - Qtd: ${orderQuantity}`;
    const itemToEdit = document.getElementById(orderId);

    if (itemToEdit) {
      itemToEdit.childNodes[0].nodeValue = updatedOrderName;

      // Atualiza o nome no localStorage
      const orders = JSON.parse(localStorage.getItem("orders")) || {};
      orders[orderId].name = updatedOrderName;
      localStorage.setItem("orders", JSON.stringify(orders));

      alert(`Pedido editado: ${updatedOrderName}`);
      console.log("Pedido editado:", updatedOrderName);
    }

    closeEditModal();
  } else {
    alert("Por favor, preencha todos os campos.");
  }
}

// Adiciona os eventos de arrasto e soltura
document.querySelectorAll(".kanban-column").forEach((column) => {
  column.addEventListener("dragover", allowDrop);
  column.addEventListener("drop", drop);
});

// Carrega pedidos existentes ao iniciar a página
loadOrders();
