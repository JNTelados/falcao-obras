@echo off
setlocal enabledelayedexpansion
title Falcao Obras - publicar alteracoes no GitHub

echo.
echo ===============================================
echo   PUBLICAR ALTERACOES NO GITHUB
echo ===============================================
echo.

cd /d "%~dp0"

set "RAIZ=%~dp0"

REM ---------------------------------------------------------------
REM  1. Procurar o Git (instalado ou portatil na pasta tools)
REM ---------------------------------------------------------------
set "GIT_EXE="
for %%P in (
  "%ProgramFiles%\Git\cmd\git.exe"
  "%ProgramFiles(x86)%\Git\cmd\git.exe"
  "%LOCALAPPDATA%\Programs\Git\cmd\git.exe"
  "%RAIZ%tools\git\cmd\git.exe"
) do (
  if not defined GIT_EXE if exist "%%~fP" set "GIT_EXE=%%~fP"
)

if not defined GIT_EXE (
  for /f "delims=" %%N in ('where git 2^>nul') do (
    if not defined GIT_EXE set "GIT_EXE=%%N"
  )
)

if not defined GIT_EXE (
  echo [ERRO] Git nao encontrado.
  echo.
  echo  Opcao 1 - instalar ^(recomendado^):
  echo      winget install Git.Git
  echo.
  echo  Opcao 2 - baixar a versao portatil:
  echo      duplo clique em  instalar-ferramentas.bat
  echo.
  pause
  exit /b 1
)

REM ATENCAO: nao usar o nome GIT_DIR - e uma variavel reservada do Git
REM e faz com que ele procure o repositorio na pasta errada.
for %%D in ("!GIT_EXE!") do set "GIT_BIN=%%~dpD"
set "PATH=!GIT_BIN!;!PATH!"
REM Garante que nenhuma variavel de ambiente do Git atrapalha
set "GIT_DIR="
set "GIT_WORK_TREE="
echo [ok] Git encontrado: !GIT_EXE!
echo.

REM ---------------------------------------------------------------
REM  2. Mostrar o que mudou
REM    (usamos -C para apontar o repositorio explicitamente: o Git
REM     portatil do MinGit perde a referencia da pasta sem isto)
REM ---------------------------------------------------------------
echo --- Alteracoes detectadas ---
"!GIT_EXE!" -C "%RAIZ%." status --short
echo ----------------------------
echo.

REM ---------------------------------------------------------------
REM  3. Pedir a mensagem do commit
REM ---------------------------------------------------------------
set "MSG=%~1"
if "!MSG!"=="" (
  set /p "MSG=Descreva a alteracao (ou pressione Enter para usar a data): "
)
if "!MSG!"=="" (
  for /f "tokens=1-4 delims=/:. " %%a in ("!date! !time!") do set "MSG=Atualizacao do site %%a-%%b-%%c"
)

REM ---------------------------------------------------------------
REM  4. Enviar
REM ---------------------------------------------------------------
echo.
echo [..] Preparando ficheiros...
"!GIT_EXE!" -C "%RAIZ%." add -A
if errorlevel 1 goto :erro

echo [..] Gravando: !MSG!
"!GIT_EXE!" -C "%RAIZ%." commit -m "!MSG!"
if errorlevel 1 (
  echo.
  echo [aviso] Nada para gravar - o repositorio ja esta atualizado.
  echo.
  pause
  exit /b 0
)

echo [..] Enviando para o GitHub...
"!GIT_EXE!" -C "%RAIZ%." push
if errorlevel 1 goto :erro

echo.
echo ===============================================
echo   [OK] ENVIADO COM SUCESSO
echo ===============================================
echo.
echo  Repositorio: https://github.com/JNTelados/falcao-obras
echo.
echo  Se a Netlify ja estiver ligada a este repositorio,
echo  o site e publicado automaticamente em 2 a 3 minutos.
echo.
pause
exit /b 0

:erro
echo.
echo [ERRO] Nao foi possivel concluir. Veja as mensagens acima.
echo.
pause
exit /b 1
