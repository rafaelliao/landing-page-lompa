@echo off
echo Iniciando monitoramento do servidor...

:: Configurar variáveis de ambiente
set NODE_OPTIONS=--max-old-space-size=4096
set NEXT_TELEMETRY_DISABLED=1
set WATCHPACK_POLLING=true
set CHOKIDAR_USEPOLLING=true
set FAST_REFRESH=true

:: Criar pasta de logs se não existir
if not exist "logs" mkdir logs

:: Verificar e liberar porta 3006
echo Verificando porta 3006...
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :3006') do (
    echo Encerrando processo %%a...
    taskkill /F /PID %%a
)

:: Aguardar liberação da porta
timeout /t 2 /nobreak >nul

:: Limpar cache
if exist ".next" (
    echo Limpando cache...
    rd /s /q ".next"
)
if exist "node_modules\.cache" (
    echo Limpando cache do node_modules...
    rd /s /q "node_modules\.cache"
)

:: Iniciar servidor com monitoramento
echo Iniciando servidor Next.js...
node scripts/monitor.js

if errorlevel 1 (
  echo Erro ao iniciar monitoramento. Tentando novamente...
  timeout /t 2
  node scripts/monitor.js
) 