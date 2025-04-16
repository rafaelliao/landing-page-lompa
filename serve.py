from http.server import HTTPServer, SimpleHTTPRequestHandler
import os
import sys
import webbrowser
from pathlib import Path

class NextJSHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(Path.cwd() / '.next'), **kwargs)

    def do_GET(self):
        # Se o caminho for /, redireciona para /index.html
        if self.path == '/':
            self.path = '/index.html'
        
        # Tenta servir do diretório .next/static primeiro
        static_path = Path.cwd() / '.next' / 'static' / self.path.lstrip('/')
        if static_path.exists():
            self.directory = str(Path.cwd() / '.next' / 'static')
            return SimpleHTTPRequestHandler.do_GET(self)
        
        # Se não encontrar, tenta servir do diretório public
        public_path = Path.cwd() / 'public' / self.path.lstrip('/')
        if public_path.exists():
            self.directory = str(Path.cwd() / 'public')
            return SimpleHTTPRequestHandler.do_GET(self)
        
        # Se não encontrar em nenhum lugar, tenta servir do diretório .next
        self.directory = str(Path.cwd() / '.next')
        return SimpleHTTPRequestHandler.do_GET(self)

def run(port=3000):
    server_address = ('', port)
    httpd = HTTPServer(server_address, NextJSHandler)
    print(f'Servidor rodando em http://localhost:{port}')
    webbrowser.open(f'http://localhost:{port}')
    httpd.serve_forever()

if __name__ == '__main__':
    # Primeiro, vamos construir o projeto Next.js
    print('Construindo o projeto Next.js...')
    os.system('npm run build')
    
    # Inicia o servidor
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 3000
    run(port) 