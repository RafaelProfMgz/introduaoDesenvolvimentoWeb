import sqlite3
from random import choice, randint
from datetime import datetime, timedelta

# Conexão com o banco de dados
def get_db_connection():
    conn = sqlite3.connect('C:\\Server\\Banco\\pedidos.db')  # Atualize para o caminho correto
    return conn

# Função para gerar dados fictícios
def generate_fake_orders():
    clients = ["Ricardo Gomes", "Bruna Martins", "Carlos Silva", "Ana Souza", "João Oliveira", 
               "Maria Ferreira", "Lucas Lima", "Patrícia Santos", "Gabriel Costa", "Renata Almeida"]
    
    items = ["Estrogonofe de Carne", "Pão de Queijo", "Feijoada", "Lasanha", "Sushi", 
             "Salada Caesar", "Pizza", "Tacos", "Burguer", "Mousse de Chocolate"]
    
    statuses = ["Solicitado", "Entregue", "Cancelado", "Em Preparação"]

    start_date = datetime(2024, 11, 1)  # Altere para a data de início desejada

    conn = get_db_connection()
    cursor = conn.cursor()

    for day in range(30):  # 30 dias
        date = start_date + timedelta(days=day)
        for _ in range(10):  # 10 pedidos por dia
            client = choice(clients)
            item = choice(items)
            status = choice(statuses)

            cursor.execute('INSERT INTO orders (client, item, status, date) VALUES (?, ?, ?, ?)', 
                           (client, item, status, date.strftime("%Y-%m-%d")))

    conn.commit()
    conn.close()
    print("Dados fictícios gerados com sucesso.")

# Executa a função
if __name__ == "__main__":
    generate_fake_orders()
