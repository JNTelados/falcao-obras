# =====================================================================
#  Falcao Obras - liberar o site para acesso pelo celular
#
#  Como usar:
#    - Duplo clique em  abrir-para-celular.bat   (recomendado), ou
#    - Clique direito neste arquivo > "Executar com PowerShell"
#
#  O script pede permissao de administrador automaticamente (UAC).
#  (Texto apenas em ASCII para funcionar em qualquer codificacao.)
# =====================================================================

$ErrorActionPreference = 'Continue'
$porta = 3210
$nomeRegra = "Falcao Site $porta (TCP-In)"

# --- eleva para administrador automaticamente -------------------------
$souAdmin = ([Security.Principal.WindowsPrincipal] `
    [Security.Principal.WindowsIdentity]::GetCurrent()
  ).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)

if (-not $souAdmin) {
    Write-Host 'Pedindo permissao de administrador (clique em SIM na janela do Windows)...' -ForegroundColor Yellow
    Start-Process -FilePath 'powershell.exe' -Verb RunAs -ArgumentList @(
        '-NoProfile', '-ExecutionPolicy', 'Bypass', '-NoExit',
        '-File', "`"$PSCommandPath`""
    )
    return
}

Write-Host ''
Write-Host '=== Falcao Obras - acesso pelo celular ===' -ForegroundColor Cyan
Write-Host ''

# --- 1. define a rede atual como Privada ------------------------------
$perfis = Get-NetConnectionProfile | Where-Object { $_.IPv4Connectivity -ne 'Disconnected' }
foreach ($p in $perfis) {
    if ($p.NetworkCategory -ne 'Private') {
        Set-NetConnectionProfile -InterfaceIndex $p.InterfaceIndex -NetworkCategory Private
        Write-Host "[ok] Rede '$($p.Name)' reclassificada para Privada." -ForegroundColor Green
    } else {
        Write-Host "[ok] Rede '$($p.Name)' ja esta como Privada." -ForegroundColor Green
    }
}

# --- 2. cria (ou atualiza) a regra de firewall ------------------------
$existente = Get-NetFirewallRule -DisplayName $nomeRegra -ErrorAction SilentlyContinue

if ($existente) {
    Set-NetFirewallRule -DisplayName $nomeRegra -Enabled True -Action Allow -Profile Private
    Write-Host "[ok] Regra '$nomeRegra' ja existia e foi atualizada." -ForegroundColor Green
} else {
    $parametros = @{
        DisplayName = $nomeRegra
        Direction   = 'Inbound'
        Protocol    = 'TCP'
        LocalPort   = "$porta"
        Action      = 'Allow'
        Profile     = 'Private'
        Description = 'Permite abrir o site da Falcao Obras a partir de celulares e tablets da rede local.'
        ErrorAction = 'Stop'
    }
    try {
        New-NetFirewallRule @parametros | Out-Null
        Write-Host "[ok] Regra '$nomeRegra' criada (porta $porta/TCP)." -ForegroundColor Green
    } catch {
        Write-Host "[erro] Nao foi possivel criar a regra: $($_.Exception.Message)" -ForegroundColor Red
        Write-Host '       Verifique se aceitou o pedido de administrador.' -ForegroundColor Red
    }
}

# --- 3. mostra os enderecos de acesso ---------------------------------
Write-Host ''
Write-Host '=== Enderecos para acessar ===' -ForegroundColor Cyan
Write-Host ''

$ips = Get-NetIPAddress -AddressFamily IPv4 |
    Where-Object { $_.IPAddress -notlike '127.*' -and $_.IPAddress -notlike '169.254.*' } |
    Select-Object -ExpandProperty IPAddress -Unique

foreach ($ip in $ips) {
    Write-Host ("  Celular / tablet :  http://{0}:{1}" -f $ip, $porta) -ForegroundColor White
}
Write-Host ("  Neste computador :  http://localhost:{0}" -f $porta) -ForegroundColor White

# --- 4. verifica se o servidor esta no ar -----------------------------
Write-Host ''
Write-Host '=== Verificacao ===' -ForegroundColor Cyan
try {
    $resp = Invoke-WebRequest -Uri "http://localhost:$porta/" -TimeoutSec 15 -UseBasicParsing
    Write-Host "[ok] Servidor respondendo (HTTP $($resp.StatusCode))." -ForegroundColor Green
} catch {
    Write-Host '[aviso] O servidor nao respondeu.' -ForegroundColor Yellow
    Write-Host '        Inicie o site na pasta C:\rea\falcao-site com o comando:  pnpm dev' -ForegroundColor Yellow
}

Write-Host ''
Write-Host 'Pronto! Abra o endereco do celular no navegador do telefone.' -ForegroundColor Cyan
Write-Host 'O celular precisa estar no MESMO Wi-Fi deste computador.' -ForegroundColor Gray
Write-Host ''
