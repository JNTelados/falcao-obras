# =====================================================================
#  Gera o site estatico (pasta out\) pronto para publicar de graca.
#
#  Como usar:
#    - Duplo clique neste arquivo, ou
#    - No PowerShell:  .\gerar-site-publicar.bat
#
#  Resultado: pasta  C:\rea\falcao-site\out
#  Publique essa pasta em app.netlify.com/drop (arrastar e soltar).
#  (Texto apenas em ASCII por compatibilidade.)
# =====================================================================

$ErrorActionPreference = 'Stop'
$raiz = 'C:\rea\falcao-site'
$site = 'https://falcao.netlify.app'

Write-Host ''
Write-Host '=== Gerando o site estatico para publicacao ===' -ForegroundColor Cyan
Write-Host ''

Set-Location $raiz

# Endereco publico usado no SEO (canonical, Open Graph, sitemap)
$env:NEXT_PUBLIC_SITE_URL = $site
$env:EXPORT = '1'

Write-Host "Endereco configurado: $site" -ForegroundColor White
Write-Host 'Compilando (pode levar 1 a 2 minutos)...' -ForegroundColor Yellow
Write-Host ''

$pnpm = 'C:\Users\Keller\.dsh\dsh-runtimes\dsh-primary-runtime\dependencies\pnpm\bin\pnpm.mjs'
$node = 'C:\Users\Keller\.dsh\dsh-runtimes\dsh-primary-runtime\dependencies\node\bin\node.exe'

if (-not (Test-Path $node)) { $node = 'node' }

if (Test-Path $pnpm) {
    & $node $pnpm exec next build
} else {
    & pnpm exec next build
}

if ($LASTEXITCODE -ne 0) {
    Write-Host ''
    Write-Host '[erro] A compilacao falhou.' -ForegroundColor Red
    exit 1
}

# --- verificacao do resultado -----------------------------------------
$out = Join-Path $raiz 'out'
Write-Host ''
Write-Host '=== Resultado ===' -ForegroundColor Cyan

if (Test-Path (Join-Path $out 'index.html')) {
    $tamanho = (Get-ChildItem $out -Recurse -File | Measure-Object -Property Length -Sum).Sum
    $ficheiros = (Get-ChildItem $out -Recurse -File).Count
    Write-Host "[ok] Pasta pronta: $out" -ForegroundColor Green
    Write-Host ("     {0} ficheiros, {1:N1} MB" -f $ficheiros, ($tamanho / 1MB)) -ForegroundColor Green
} else {
    Write-Host '[erro] A pasta out nao foi criada corretamente.' -ForegroundColor Red
    exit 1
}

# --- confirmacao de que o SEO aponta para o dominio certo --------------
$html = Get-Content (Join-Path $out 'index.html') -Raw
if ($html -match [regex]::Escape($site)) {
    Write-Host "[ok] SEO apontando para $site" -ForegroundColor Green
} else {
    Write-Host '[aviso] Nao encontrei o endereco no HTML gerado.' -ForegroundColor Yellow
}

Write-Host ''
Write-Host '=== Proximo passo (publicar) ===' -ForegroundColor Cyan
Write-Host ''
Write-Host '  1. Abra:  https://app.netlify.com/drop'
Write-Host '  2. Arraste a pasta  out  para dentro da pagina'
Write-Host '  3. Crie a conta gratuita quando pedir (pode entrar com Google)'
Write-Host '  4. Renomeie o site para:  falcao   ->  fica falcao.netlify.app'
Write-Host ''
Write-Host 'Pronto, o site fica no ar 24h por dia, sem precisar do seu PC.' -ForegroundColor Green
Write-Host ''
