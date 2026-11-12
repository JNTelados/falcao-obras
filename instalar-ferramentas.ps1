# =====================================================================
#  Instala as ferramentas de apoio deste projeto (Git e cloudflared).
#
#  Estas ferramentas NAO ficam guardadas no repositorio (sao ~145 MB de
#  programas prontos). Em vez disso, este script baixa-as quando precisar
#  - em qualquer computador, de forma reproduzivel.
#
#  Como usar: duplo clique, ou no PowerShell:  .\instalar-ferramentas.ps1
#  (Texto apenas em ASCII por compatibilidade.)
# =====================================================================

$ErrorActionPreference = 'Stop'
$raiz = Split-Path -Parent $MyInvocation.MyCommand.Path
$tools = Join-Path $raiz 'tools'
$ProgressPreference = 'SilentlyContinue'

New-Item -ItemType Directory -Force -Path $tools | Out-Null

Write-Host ''
Write-Host '=== Instalando ferramentas de apoio ===' -ForegroundColor Cyan
Write-Host "Destino: $tools"
Write-Host ''

# ---------------------------------------------------------------- GIT
$gitExe = Join-Path $tools 'git\cmd\git.exe'
if (Test-Path $gitExe) {
    Write-Host '[ok] Git portatil ja instalado.' -ForegroundColor Green
    & $gitExe --version
} else {
    Write-Host '[..] Baixando Git portatil (MinGit, ~38 MB)...' -ForegroundColor Yellow
    try {
        $api = Invoke-RestMethod -Uri 'https://api.github.com/repos/git-for-windows/git/releases/latest' -TimeoutSec 60
        $asset = $api.assets | Where-Object { $_.name -like 'MinGit-*-64-bit.zip' } | Select-Object -First 1
        if (-not $asset) { throw 'Nao encontrei o ficheiro MinGit na ultima versao.' }

        $zip = Join-Path $tools 'mingit.zip'
        Invoke-WebRequest -Uri $asset.browser_download_url -OutFile $zip -TimeoutSec 900
        Expand-Archive -Path $zip -DestinationPath (Join-Path $tools 'git') -Force
        Remove-Item $zip -Force

        if (Test-Path $gitExe) {
            Write-Host '[ok] Git portatil instalado.' -ForegroundColor Green
            & $gitExe --version
        } else {
            throw 'A extracao do Git falhou.'
        }
    } catch {
        Write-Host "[erro] Falha ao instalar o Git: $($_.Exception.Message)" -ForegroundColor Red
        Write-Host '       Alternativa: winget install Git.Git' -ForegroundColor Yellow
    }
}

# --------------------------------------------------------- CLOUDFLARED
$cfExe = Join-Path $tools 'cloudflared.exe'
if (Test-Path $cfExe) {
    Write-Host '[ok] cloudflared ja instalado.' -ForegroundColor Green
} else {
    Write-Host '[..] Baixando cloudflared (~53 MB, para link publico temporario)...' -ForegroundColor Yellow
    try {
        $url = 'https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-windows-amd64.exe'
        Invoke-WebRequest -Uri $url -OutFile $cfExe -TimeoutSec 900
        $sig = Get-AuthenticodeSignature $cfExe
        Write-Host "[ok] cloudflared instalado (assinatura: $($sig.Status))." -ForegroundColor Green
    } catch {
        Write-Host "[aviso] Falha ao baixar o cloudflared: $($_.Exception.Message)" -ForegroundColor Yellow
        Write-Host '        E opcional - so serve para gerar um link publico temporario.' -ForegroundColor Gray
    }
}

# ------------------------------------------------------------ RESUMO
Write-Host ''
Write-Host '=== Como usar ===' -ForegroundColor Cyan
Write-Host ''
Write-Host '  Git (para enviar alteracoes):'
Write-Host '    .\tools\git\cmd\git.exe status'
Write-Host '    .\tools\git\cmd\git.exe add -A'
Write-Host '    .\tools\git\cmd\git.exe commit -m "ajustes"'
Write-Host '    .\tools\git\cmd\git.exe push'
Write-Host ''
Write-Host '  Link publico temporario (com o site a rodar em localhost:3210):'
Write-Host '    .\tools\cloudflared.exe tunnel --url http://localhost:3210'
Write-Host ''
Write-Host '  Para nao escrever o caminho completo, adicione ao PATH:'
Write-Host "    `$env:Path = `"$(Join-Path $tools 'git\cmd');`" + `$env:Path"
Write-Host ''
