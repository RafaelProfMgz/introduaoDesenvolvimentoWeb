const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 3000;

// Middleware para servir arquivos estáticos da pasta 'public'
app.use(express.static("public"));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Função para conectar ao banco de dados
function getDbConnection() {
  return new sqlite3.Database("C:\\Server\\Banco\\pedidos.db"); // Atualizado para o novo caminho
}

// Rota para buscar pedidos por data
app.get("/orders", (req, res) => {
  const date = req.query.date;
  if (!date) {
    return res.status(400).json({ error: "Data não fornecida" });
  }

  const db = getDbConnection();
  db.all("SELECT * FROM orders WHERE date = ?", [date], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (rows.length === 0) {
      return res
        .status(404)
        .json({ message: "Nenhum pedido encontrado para essa data." });
    }

    res.json(rows);
  });

  db.close();
});

// Rota para adicionar um novo pedido
app.post("/orders", (req, res) => {
  const { date, item } = req.body; // Supondo que um pedido contém uma data e um item
  if (!date || !item) {
    return res.status(400).json({ error: "Data e item são obrigatórios." });
  }

  const db = getDbConnection();
  db.run(
    "INSERT INTO orders (date, item) VALUES (?, ?)",
    [date, item],
    function (err) {
      if (err) {
        db.close();
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({ id: this.lastID, date, item });
      db.close();
    }
  );
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://127.0.0.1:${port}/`);
});
