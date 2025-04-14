const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

// Criar diretório de logs se não existir
const logsDir = path.join(__dirname, '../logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir);
}

// Criar arquivo de log com timestamp
const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
const logFile = path.join(logsDir, `server-${timestamp}.log`);

console.log(`Iniciando servidor Next.js...`);
console.log(`Logs serão salvos em: ${logFile}`);

// Função para escrever logs
function writeLog(message, type = 'INFO') {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] [${type}] ${message}\n`;
  fs.appendFileSync(logFile, logMessage);
  console.log(message);
}

// Função para limpar o cache do Next.js
function clearNextCache() {
  const nextCacheDir = path.join(__dirname, '../.next');
  if (fs.existsSync(nextCacheDir)) {
    writeLog('Limpando cache do Next.js...', 'SYSTEM');
    fs.rmSync(nextCacheDir, { recursive: true, force: true });
  }
}

// Configurar ambiente
process.env.NODE_ENV = 'development';
process.env.PORT = '3006';

// Iniciar servidor Next.js com retry
function startServer(retryCount = 0) {
  if (retryCount > 0) {
    writeLog(`Tentativa ${retryCount} de reiniciar o servidor...`, 'SYSTEM');
    clearNextCache();
  }

  const server = spawn('npm', ['run', 'dev'], {
    stdio: ['pipe', 'pipe', 'pipe'],
    shell: true,
    env: {
      ...process.env,
      FORCE_COLOR: '1'
    }
  });

  // Capturar saída padrão
  server.stdout.on('data', (data) => {
    writeLog(data.toString().trim(), 'STDOUT');
  });

  // Capturar erros
  server.stderr.on('data', (data) => {
    const message = data.toString().trim();
    if (!message.includes('webpack.cache') && !message.includes('Compiled')) {
      writeLog(message, 'STDERR');
    }
  });

  // Capturar erros do servidor
  server.on('error', (error) => {
    writeLog(`Erro ao iniciar servidor: ${error.message}`, 'ERROR');
    if (retryCount < 3) {
      setTimeout(() => startServer(retryCount + 1), 1000);
    } else {
      writeLog('Número máximo de tentativas excedido', 'ERROR');
      process.exit(1);
    }
  });

  // Capturar encerramento do servidor
  server.on('close', (code) => {
    if (code !== 0 && retryCount < 3) {
      writeLog(`Servidor encerrado com código ${code}. Tentando reiniciar...`, 'WARN');
      setTimeout(() => startServer(retryCount + 1), 1000);
    } else if (code !== 0) {
      writeLog(`Servidor encerrado com código ${code}. Número máximo de tentativas excedido.`, 'ERROR');
      process.exit(code);
    } else {
      writeLog('Servidor encerrado normalmente', 'INFO');
      process.exit(0);
    }
  });

  // Capturar Ctrl+C para encerrar o servidor
  process.on('SIGINT', () => {
    writeLog('Encerrando servidor...', 'SYSTEM');
    server.kill();
    process.exit(0);
  });
}

// Iniciar o servidor
startServer(); 