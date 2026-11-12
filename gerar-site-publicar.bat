@echo off
setlocal enabledelayedexpansion
title Falcao Obras - gerar site para publicar

echo.
echo ===============================================
echo   FALCAO OBRAS - GERAR SITE PARA PUBLICAR
echo ===============================================
echo.

cd /d "%~dp0"

set "RAIZ=%~dp0"
set "SITE=https://www.falcaoobras.pt"

REM ---------------------------------------------------------------
REM  1. Procurar o Node.js (varias localizacoes possiveis)
REM ---------------------------------------------------------------
set "NODE_EXE="
for %%P in (
  "%ProgramFiles%\nodejs\node.exe"
  "%ProgramFiles(x86)%\nodejs\node.exe"
  "%LOCALAPPDATA%\Programs\nodejs\node.exe"
  "%LOCALAPPDATA%\Microsoft\WinGet\Packages\nodejs*\node.exe"
  "C:\Users\Keller\.dsh\dsh-runtimes\dsh-primary-runtime\dependencies\node\bin\node.exe"
) do (
  if not defined NODE_EXE if exist "%%~fP" set "NODE_EXE=%%~fP"
)

if not defined NODE_EXE (
  for /f "delims=" %%N in ('where node 2^>nul') do (
    if not defined NODE_EXE set "NODE_EXE=%%N"
  )
)

if not defined NODE_EXE (
  echo [ERRO] Node.js nao encontrado neste computador.
  echo.
  echo  Instale com este comando no PowerShell:
  echo      winget install OpenJS.NodeJS.LTS
  echo.
  echo  Depois de instalar, feche esta janela e abra novamente.
  echo.
  pause
  exit /b 1
)

for /f "tokens=*" %%V in ('"!NODE_EXE!" -v') do set "NODE_VER=%%V"
echo [ok] Node.js encontrado: !NODE_EXE!  ^(versao !NODE_VER!^)

REM A pasta do Node pode nao estar no PATH do Windows - isso faz com que
REM "node" e "pnpm" falhem dentro dos scripts. Adicionamos agora.
for %%D in ("!NODE_EXE!") do set "NODE_DIR=%%~dpD"
set "PATH=!NODE_DIR!;!PATH!"
echo [ok] Pasta do Node adicionada ao PATH desta sessao.

REM ---------------------------------------------------------------
REM  2. Procurar o pnpm (varias localizacoes possiveis)
REM ---------------------------------------------------------------
set "PNPM_MJS="
for %%P in (
  "%APPDATA%\npm\node_modules\pnpm\bin\pnpm.cjs"
  "%LOCALAPPDATA%\pnpm\pnpm.cjs"
  "%ProgramFiles%\nodejs\node_modules\corepack\shims\pnpm.cjs"
  "C:\Users\Keller\.dsh\dsh-runtimes\dsh-primary-runtime\dependencies\pnpm\bin\pnpm.mjs"
) do (
  if not defined PNPM_MJS if exist "%%~fP" set "PNPM_MJS=%%~fP"
)

if not defined PNPM_MJS (
  for /f "delims=" %%N in ('where pnpm 2^>nul') do (
    if not defined PNPM_MJS set "PNPM_MJS=%%N"
  )
)

if defined PNPM_MJS (
  echo [ok] pnpm encontrado.
  echo.
  echo Compilando o site... ^(1 a 2 minutos^)
  echo.
  set "NEXT_PUBLIC_SITE_URL=%SITE%"
  set "EXPORT=1"
  "!NODE_EXE!" "!PNPM_MJS!" build:static
  if errorlevel 1 goto :compilar_direto
) else (
  echo [aviso] pnpm nao encontrado - vou usar o Next.js local diretamente.
  echo.
  goto :compilar_direto
)

goto :verificar

:compilar_direto
REM Alternativa: usa o Next.js que ja esta na pasta node_modules
set "NEXT_BIN=%RAIZ%node_modules\next\dist\bin\next"

if not exist "%NEXT_BIN%" (
  echo.
  echo [ERRO] Dependencias nao instaladas ^(node_modules\next em falta^).
  echo.
  echo  Instale o Node.js LTS e depois rode:
  echo      winget install OpenJS.NodeJS.LTS
  echo      cd /d "%RAIZ%"
  echo      npm install -g pnpm
  echo      pnpm install
  echo.
  pause
  exit /b 1
)

echo Compilando com o Next.js local... ^(1 a 2 minutos^)
echo.
set "NEXT_PUBLIC_SITE_URL=%SITE%"
set "EXPORT=1"
"!NODE_EXE!" "%NEXT_BIN%" build
if errorlevel 1 (
  echo.
  echo [ERRO] A compilacao falhou.
  echo.
  pause
  exit /b 1
)

:verificar
echo.
if exist "%RAIZ%out\index.html" (
  echo ===============================================
  echo   [OK] SITE GERADO COM SUCESSO
  echo ===============================================
  echo.
  echo  Pasta pronta:  %RAIZ%out
  echo.
  echo  Proximo passo - publicar:
  echo    1. Abra:  https://app.netlify.com/drop
  echo    2. Arraste a pasta  out  para dentro da pagina
  echo.
  echo  OU, se ja ligou o GitHub a Netlify, basta enviar:
  echo    git add -A ^&^& git commit -m "ajustes" ^&^& git push
  echo.
) else (
  echo [ERRO] A pasta "out" nao foi criada. Veja as mensagens acima.
  echo.
)

pause
endlocal
