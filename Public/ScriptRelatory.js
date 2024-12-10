// Função para buscar pedidos por data usando a API
async function fetchOrdersByDate(date) {
  try {
    const response = await fetch(`http://127.0.0.1:3000/orders?date=${date}`);
    if (!response.ok) {
      throw new Error("Nenhum pedido encontrado para essa data.");
    }
    const orders = await response.json();
    renderOrders(orders);
  } catch (error) {
    console.error(error);
    alert(error.message); // Exibe uma mensagem de erro ao usuário
  }
}

// Função para renderizar pedidos na tabela
function renderOrders(orders) {
  const tbody = document.querySelector(".report-table tbody");
  tbody.innerHTML = ""; // Limpa a tabela existente

  if (orders.length === 0) {
    tbody.innerHTML =
      '<tr><td colspan="5">Nenhum pedido encontrado para essa data.</td></tr>';
    return;
  }

  orders.forEach((order) => {
    const row = document.createElement("tr");
    row.innerHTML = `
          <td>${order.id}</td>
          <td>${order.client}</td>
          <td>${order.item}</td>
          <td>${order.status}</td>
          <td>${order.date}</td>
      `;
    tbody.appendChild(row);
  });
}

// Evento para buscar pedidos ao clicar no botão
document.getElementById("search-button").addEventListener("click", () => {
  const dateInput = document.getElementById("date-input").value; // Obtém a data do campo de input
  if (dateInput) {
    fetchOrdersByDate(dateInput); // Chama a função com a data selecionada
  } else {
    alert("Por favor, selecione uma data.");
  }
});
