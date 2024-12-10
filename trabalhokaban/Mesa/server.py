import json
import sqlite3
from http.server import BaseHTTPRequestHandler, HTTPServer

# Configurações do banco de dados
DB_NAME = 'restaurant.db'

# Função para criar a tabela de ordens
def create_table():
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS orders (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            table_id TEXT NOT NULL,
            dish_type TEXT NOT NULL,
            specific_dish TEXT NOT NULL,
            quantity INTEGER NOT NULL,
            side TEXT NOT NULL,
            beverage TEXT NOT NULL,
            beverage_quantity INTEGER NOT NULL
        )
    ''')
    conn.commit()
    conn.close()

class RequestHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        """Tratamento de requisições GET"""
        if self.path == '/tables':
            conn = sqlite3.connect(DB_NAME)
            cursor = conn.cursor()
            cursor.execute('SELECT * FROM orders')
            orders = cursor.fetchall()
            conn.close()

            # Formatando os dados para JSON
            orders_list = [
                {
                    'id': order[0],
                    'table_id': order[1],
                    'dish_type': order[2],
                    'specific_dish': order[3],
                    'quantity': order[4],
                    'side': order[5],
                    'beverage': order[6],
                    'beverage_quantity': order[7]
                }
                for order in orders
            ]

            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps(orders_list).encode())
        else:
            self.send_response(404)
            self.end_headers()

    def do_POST(self):
        """Tratamento de requisições POST"""
        if self.path.startswith('/table'):
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            order_data = json.loads(post_data.decode('utf-8'))

            conn = sqlite3.connect(DB_NAME)
            cursor = conn.cursor()

            cursor.execute('''
                INSERT INTO orders (table_id, dish_type, specific_dish, quantity, side, beverage, beverage_quantity)
                VALUES (?, ?, ?, ?, ?, ?, ?)
            ''', (
                order_data.get('table_id'),
                order_data.get('dish_type'),
                order_data.get('specific_dish'),
                order_data.get('quantity'),
                order_data.get('side'),
                order_data.get('beverage'),
                order_data.get('beverage_quantity'),
            ))

            conn.commit()
            conn.close()

            self.send_response(201)
            self.end_headers()
            self.wfile.write(b'Order added successfully')
        else:
            self.send_response(404)
            self.end_headers()

def run(server_class=HTTPServer, handler_class=RequestHandler, port=8000):
    create_table()  # Criar a tabela ao iniciar o servidor
    server_address = ('', port)
    httpd = server_class(server_address, handler_class)
    print(f'Servidor rodando na porta {port}')
    httpd.serve_forever()

if __name__ == "__main__":
    run()
