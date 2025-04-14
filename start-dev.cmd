@echo off
echo Configurando ambiente de desenvolvimento...

:: Definir variáveis de ambiente
set NODE_OPTIONS=--max-old-space-size=4096
set NEXT_TELEMETRY_DISABLED=1

:: Encerrar processos Node.js existentes
taskkill /F /IM node.exe >nul 2>&1

:: Aguardar um momento para garantir que os processos foram encerrados
timeout /t 2 /nobreak >nul

:: Limpar cache
if exist ".next" (
    echo Limpando cache...
    rd /s /q ".next"
)

:: Iniciar o servidor Next.js
echo Iniciando servidor Next.js...
call npx next dev --port 3006 