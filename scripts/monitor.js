const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');
const { exec } = require('child_process');

// Função para liberar a porta
function freePort(port) {
  return new Promise((resolve) => {
    if (process.platform === 'win32') {
      exec(`netstat -ano | findstr :${port}`, (error, stdout) => {
        if (stdout) {
          const pids = new Set(); // Usar Set para evitar duplicatas
          const lines = stdout.split('\n');
          lines.forEach(line => {
            const match = line.match(/\s+(\d+)\s*$/);
            if (match) {
              pids.add(match[1]);
            }
          });

          if (pids.size > 0) {
            console.log(`\n🔍 Encontrados ${pids.size} processos usando a porta ${port}`);
            let killed = 0;
            pids.forEach(pid => {
              exec(`taskkill /F /PID ${pid}`, (error) => {
                if (!error) {
                  console.log(`✅ Processo ${pid} encerrado`);
                  killed++;
                }
                if (killed === pids.size) {
                  console.log(`\n✅ Porta ${port} liberada`);
                  resolve();
                }
              });
            });
          } else {
            console.log(`\n✅ Porta ${port} já está livre`);
            resolve();
          }
        } else {
          console.log(`\n✅ Porta ${port} já está livre`);
          resolve();
        }
      });
    } else {
      exec(`lsof -i :${port} | grep LISTEN | awk '{print $2}' | xargs kill -9`, () => {
        resolve();
      });
    }
  });
}

// Função para criar diretório de logs se não existir
function ensureLogsDirectory() {
  const logsDir = path.join(__dirname, '../logs');
  if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir, { recursive: true });
  }
  return logsDir;
}

// Função para criar arquivo de log
function createLogFile(logsDir) {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const logFile = path.join(logsDir, `server-${timestamp}.log`);
  fs.writeFileSync(logFile, '');
  return logFile;
}

// Função para monitorar o arquivo de log
function monitorLogFile(logFile) {
  console.log(`\n=== MONITORAMENTO INICIADO ===`);
  console.log(`Arquivo de log: ${logFile}`);
  console.log(`Hora de início: ${new Date().toISOString()}\n`);
  
  // Verificar se o arquivo existe
  if (!fs.existsSync(logFile)) {
    console.log('Arquivo de log não encontrado. Aguardando criação...');
    setTimeout(() => monitorLogFile(logFile), 1000);
    return;
  }

  // Criar stream de leitura
  const stream = fs.createReadStream(logFile, {
    encoding: 'utf8',
    autoClose: false
  });

  let errorCount = 0;
  let lastErrorTime = null;

  // Monitorar mudanças no arquivo
  stream.on('data', (data) => {
    const lines = data.toString().split('\n');
    lines.forEach(line => {
      if (line.trim()) {
        // Verificar por erros específicos
        if (line.includes('error') || line.includes('Error') || line.includes('ERROR')) {
          errorCount++;
          lastErrorTime = new Date().toISOString();
          console.log(`\n⚠️ ERRO DETECTADO (${errorCount}):`);
          console.log(`Hora: ${lastErrorTime}`);
          console.log(`Mensagem: ${line}\n`);
        }
        
        // Log de compilação
        if (line.includes('Compiled') || line.includes('compiling')) {
          console.log(`\n🔄 Compilação: ${line}`);
        }
        
        // Log de requisições
        if (line.includes('GET') || line.includes('POST')) {
          console.log(`\n🌐 Requisição: ${line}`);
        }
        
        // Log de status do servidor
        if (line.includes('Starting') || line.includes('Ready')) {
          console.log(`\n🟢 Status: ${line}`);
        }
      }
    });
  });

  // Tratar erros
  stream.on('error', (error) => {
    console.error('\n❌ Erro no monitoramento:', error);
  });
}

// Função para iniciar o servidor
async function startServer(logFile) {
  console.log('\n🔄 Iniciando servidor Next.js...');
  
  // Liberar a porta antes de iniciar
  await freePort(3006);
  
  const server = spawn('npx', ['next', 'dev', '--port', '3006', '--turbo'], {
    stdio: ['pipe', 'pipe', 'pipe'],
    shell: true
  });

  // Capturar saída padrão
  server.stdout.on('data', (data) => {
    const output = data.toString().trim();
    console.log(`\n📝 Saída: ${output}`);
    fs.appendFileSync(logFile, `[${new Date().toISOString()}] ${output}\n`);
  });

  // Capturar erros
  server.stderr.on('data', (data) => {
    const error = data.toString().trim();
    console.error(`\n❌ Erro: ${error}`);
    fs.appendFileSync(logFile, `[${new Date().toISOString()}] ERROR: ${error}\n`);
  });

  // Capturar encerramento do servidor
  server.on('close', (code) => {
    console.log(`\n⚠️ Servidor encerrado com código ${code}`);
    fs.appendFileSync(logFile, `[${new Date().toISOString()}] Servidor encerrado com código ${code}\n`);
    if (code !== 0) {
      console.log('Reiniciando servidor em 5 segundos...');
      setTimeout(() => startServer(logFile), 5000);
    }
  });

  // Capturar Ctrl+C
  process.on('SIGINT', () => {
    console.log('Encerrando servidor...');
    server.kill();
    process.exit();
  });

  return server;
}

// Função principal
function main() {
  try {
    // Garantir que o diretório de logs existe
    const logsDir = ensureLogsDirectory();
    
    // Criar arquivo de log
    const logFile = createLogFile(logsDir);
    
    // Iniciar monitoramento
    monitorLogFile(logFile);
    
    // Iniciar servidor
    startServer(logFile);
    
  } catch (error) {
    console.error('Erro ao iniciar monitoramento:', error);
  }
}

// Iniciar o programa
main(); 