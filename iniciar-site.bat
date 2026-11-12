@echo off
setlocal enabledelayedexpansion
title Falcao Obras - ver o site no computador

echo.
echo ===============================================
echo   VER O SITE NO COMPUTADOR
echo ===============================================
echo.

cd /d "%~dp0"
set "RAIZ=%~dp0"

REM ---- Procurar o Node.js ----
set "NODE_EXE="
for %%P in (
  "%ProgramFiles%\nodejs\node.exe"
  "%ProgramFiles(x86)%\nodejs\node.exe"
  "%LOCALAPPDATA%\Programs\nodejs\node.exe"
  "C:\Users\Keller\.dsh\dsh-runtimes\dsh-primary-runtime\dependencies\node\bin\node.exe"
) do (
  if not defined NODE_EXE if exist "%%~fP" set "NODE_EXE=%%~fP"
)

if not defined NODE_EXE (
  echo [ERRO] Node.js nao encontrado.
  echo        Instale com:  winget install OpenJS.NodeJS.LTS
  echo.
  pause
  exit /b 1
)

for %%D in ("!NODE_EXE!") do set "NODE_BIN=%%~dpD"
set "PATH=!NODE_BIN!;!PATH!"

REM ---- Procurar o pnpm ----
set "PNPM_MJS="
for %%P in (
  "%APPDATA%\npm\node_modules\pnpm\bin\pnpm.cjs"
  "%LOCALAPPDATA%\pnpm\pnpm.cjs"
  "C:\Users\Keller\.dsh\dsh-runtimes\dsh-primary-runtime\dependencies\pnpm\bin\pnpm.mjs"
) do (
  if not defined PNPM_MJS if exist "%%~fP" set "PNPM_MJS=%%~fP"
)

echo [ok] A iniciar o site...
echo.
echo    Endereco:  http://localhost:3210
echo.
echo    Para PARAR: feche esta janela ou pressione Ctrl+C
echo.

if defined PNPM_MJS (
  "!NODE_EXE!" "!PNPM_MJS!" dev
) else (
  REM Alternativa: usa o next local diretamente
  if exist "%RAIZ%node_modules\next\dist\bin\next" (
    "!NODE_EXE!" "%RAIZ%node_modules\next\dist\bin\next" dev -p 3210
  ) else (
    echo [ERRO] Dependencias nao instaladas ^(node_modules em falta^).
    echo        Instale o Node.js e rode:  npm install -g pnpm  ^&^&  pnpm install
    echo.
    pause
    exit /b 1
  )
)

pause
endlocal
