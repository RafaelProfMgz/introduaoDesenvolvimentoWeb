// ScriptRelatory.js

// Função para gerar o relatório de pedidos
export function generateReport(orders) {
  const reportData = {};

  // Agrupar pedidos por dia da semana
  for (const order of orders) {
    const orderDate = new Date(order.date); // Converter string para objeto Date
    const dayName = orderDate.toLocaleString("pt-BR", { weekday: "long" }); // Nome do dia da semana

    // Adiciona o pedido ao dia correspondente
    if (!reportData[dayName]) {
      reportData[dayName] = [];
    }
    reportData[dayName].push(order);
  }

  // Renderizar o relatório na página
  const reportContainer = document.getElementById("reportContainer");
  reportContainer.innerHTML = ""; // Limpa o container antes de adicionar novos dados

  for (const [day, orders] of Object.entries(reportData)) {
    const daySection = document.createElement("section");
    daySection.innerHTML = `<h4>${
      day.charAt(0).toUpperCase() + day.slice(1)
    }</h4>`;

    const table = document.createElement("table");
    table.className = "report-table";
    table.innerHTML = `
        <thead>
          <tr>
            <th>ID do Pedido</th>
            <th>Cliente</th>
            <th>Item</th>
            <th>Status</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
        </tbody>
      `;

    const tbody = table.querySelector("tbody");
    orders.forEach((order) => {
      const row = document.createElement("tr");
      row.innerHTML = `
          <td>${order.id}</td>
          <td>${
            order.name.split(" ")[0]
          }</td> <!-- Nome do cliente, assume que é a primeira palavra -->
          <td>${order.name}</td> <!-- Nome do item -->
          <td>${order.status}</td>
          <td>${new Date(order.date).toLocaleDateString(
            "pt-BR"
          )}</td> <!-- Formata a data -->
        `;
      tbody.appendChild(row);
    });

    daySection.appendChild(table);
    reportContainer.appendChild(daySection);
  }
}

// Função para carregar os pedidos
export function loadOrders() {
  const orders = [
    {
      id: "001",
      name: "Pizza Margherita",
      status: "Entregue",
      date: "2024-09-12",
    },
    {
      id: "002",
      name: "Hambúrguer Gourmet",
      status: "Pronto",
      date: "2024-09-12",
    },
    {
      id: "003",
      name: "Espaguete à Carbonara",
      status: "Produção",
      date: "2024-09-12",
    },
    {
      id: "004",
      name: "Sushi Variado",
      status: "Solicitado",
      date: "2024-09-12",
    },
    {
      id: "005",
      name: "Salada Caesar",
      status: "Entregue",
      date: "2024-09-11",
    },
    // Adicione mais pedidos conforme necessário
  ];

  // Armazenar os pedidos no localStorage
  localStorage.setItem("orders", JSON.stringify(orders));

  return orders;
}

// Inicializa o relatório quando o documento estiver pronto
document.addEventListener("DOMContentLoaded", () => {
  const orders = JSON.parse(localStorage.getItem("orders")) || loadOrders();
  generateReport(orders);
});
