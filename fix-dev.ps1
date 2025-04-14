# Executar como Administrador
if (-NOT ([Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole] "Administrator")) {
    Write-Warning "Por favor, execute como Administrador!"
    Break
}

Write-Host "Ajustando configurações para desenvolvimento..."

# Aumenta o limite de file watchers
$registryPath = "HKLM:\SYSTEM\CurrentControlSet\Control\Session Manager\kernel"
$name = "GlobalMaxUserHandles"
$value = "524288"

if (!(Test-Path $registryPath)) {
    New-Item -Path $registryPath -Force | Out-Null
}
Set-ItemProperty -Path $registryPath -Name $name -Value $value -Type DWORD -Force

# Limpa caches do npm
Write-Host "Limpando caches..."
npm cache clean --force

# Remove pastas temporárias
Write-Host "Removendo pastas temporárias..."
if (Test-Path ".next") { Remove-Item -Recurse -Force .next }
if (Test-Path "node_modules") { Remove-Item -Recurse -Force node_modules }

# Reinstala dependências
Write-Host "Reinstalando dependências..."
npm install

Write-Host "Configurações ajustadas com sucesso!"
Write-Host "Por favor, reinicie o VS Code e execute 'npm run dev:win' novamente." 