const { spawn } = require('child_process');
const path = require('path');

// Configurações do ambiente
process.env.NODE_OPTIONS = '--max-old-space-size=4096';
process.env.WATCHPACK_POLLING = 'true';
process.env.PORT = '3005';

// Função para iniciar o servidor Next.js
function startServer() {
  console.log('🚀 Iniciando servidor Next.js...');
  
  const server = spawn('npx.cmd', ['next', 'dev'], {
    stdio: 'inherit',
    env: {
      ...process.env,
      NODE_ENV: 'development',
    },
    shell: true
  });

  server.on('error', (err) => {
    console.error('❌ Erro ao iniciar servidor:', err);
    process.exit(1);
  });

  process.on('SIGINT', () => {
    server.kill('SIGINT');
    process.exit(0);
  });
}

// Execução principal
console.log('📦 Iniciando ambiente de desenvolvimento...');
startServer(); 