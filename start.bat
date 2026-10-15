@echo off
setlocal
title Solvanta Energy - Development Server

rem ================================================================
rem  Solvanta Energy - Windows launcher
rem  Double-click this file to start the Vite development server.
rem  No administrator rights are needed and no application files
rem  are changed. Dependencies are installed only when the
rem  node_modules folder is missing.
rem ================================================================

rem Work from the folder that contains this script, so the launcher
rem keeps working if the project folder is renamed or moved.
cd /d "%~dp0"
if errorlevel 1 (
    echo ERROR: Could not open the project folder:
    echo   %~dp0
    echo.
    pause
    exit /b 1
)

rem Vite's dev server uses port 5173 by default. If you change the
rem dev port in vite.config.ts, update DEV_PORT below to match.
set "DEV_PORT=5173"

echo ================================================================
echo   Solvanta Energy - starting the development server
echo ================================================================
echo Project folder: %CD%
echo.

rem ---------------- Step 1 of 4: check Node.js ---------------------
where node >nul 2>&1
if errorlevel 1 goto :missing_node

for /f "delims=" %%V in ('node --version 2^>nul') do set "NODE_VERSION=%%V"
echo [1/4] Node.js found - version %NODE_VERSION%

rem ---------------- Step 2 of 4: check npm -------------------------
where npm >nul 2>&1
if errorlevel 1 goto :missing_npm

for /f "delims=" %%V in ('npm --version 2^>nul') do set "NPM_VERSION=%%V"
echo [2/4] npm found - version %NPM_VERSION%

rem ------- Step 3 of 4: install dependencies only if needed -------
if not exist "node_modules\" goto :install_dependencies
echo [3/4] Dependencies already installed - skipping npm install.
goto :check_port

:install_dependencies
echo [3/4] node_modules not found - running npm install.
echo       This can take a few minutes the first time.
echo.
call npm install
if errorlevel 1 goto :install_failed
if not exist "node_modules\" goto :install_failed
echo.
echo       Dependencies installed.

rem ----- Step 4 of 4: check whether a server is already up --------
:check_port
echo [4/4] Checking whether a development server is already running...
netstat -an | findstr /C:":%DEV_PORT% " | findstr /I "LISTENING" >nul 2>&1
if not errorlevel 1 goto :server_already_running

:run_server
echo.
echo Starting the Vite development server...
echo Your browser should open automatically. If it does not,
echo the local address is printed below as "Local".
echo Press Ctrl+C in this window to stop the server.
echo.
call npm run dev -- --open
set "DEV_EXIT=%ERRORLEVEL%"
echo.
if not "%DEV_EXIT%"=="0" goto :server_problem
echo Development server stopped. Press a key to close this window.
pause
exit /b 0

rem ================================================================
rem  Error and choice handlers
rem ================================================================

:missing_node
echo.
echo ----------------------------------------------------------------
echo ERROR: Node.js was not found on this computer.
echo.
echo To run this website you need Node.js version 20.19 or newer.
echo   1. Download the LTS installer from https://nodejs.org
echo   2. Install it with the default options.
echo   3. Close this window, then double-click start.bat again.
echo ----------------------------------------------------------------
echo.
pause
exit /b 1

:missing_npm
echo.
echo ----------------------------------------------------------------
echo ERROR: npm was not found, even though Node.js is present.
echo.
echo npm normally ships with Node.js. To fix this:
echo   1. Reinstall Node.js from https://nodejs.org
echo   2. If you manage Node versions with nvm or fnm, select a
echo      version and make sure it is on your PATH.
echo   3. Close this window, then double-click start.bat again.
echo ----------------------------------------------------------------
echo.
pause
exit /b 1

:install_failed
echo.
echo ----------------------------------------------------------------
echo ERROR: npm install did not finish successfully.
echo.
echo What to try:
echo   - Scroll up and read the first error message npm printed.
echo   - Check your internet connection.
echo   - Delete the node_modules folder and run this file again.
echo   - Run "npm install" in this folder manually to see the
echo     full output.
echo ----------------------------------------------------------------
echo.
pause
exit /b 1

:server_already_running
echo.
echo NOTE: Something is already listening on port %DEV_PORT% on this
echo computer - usually, that is this website's development server
echo still running in another window.
echo.
choice /C OSE /N /M "  Press O to open it in your browser / S to start another server anyway / E to exit: "
if errorlevel 3 goto :exit_quiet
if errorlevel 2 goto :run_server
start "" "http://localhost:%DEV_PORT%/"
echo.
echo Opened http://localhost:%DEV_PORT%/ in your default browser.
echo This window can be closed now.
timeout /t 3 >nul 2>&1
exit /b 0

:exit_quiet
echo.
echo Nothing was started. This window can be closed.
timeout /t 3 >nul 2>&1
exit /b 0

:server_problem
echo ----------------------------------------------------------------
echo The development server stopped with exit code %DEV_EXIT%.
echo.
echo If you did not stop it yourself with Ctrl+C, the server may
echo have failed to start. What to try:
echo   - Scroll up and read the first error message above.
echo   - Make sure nothing else is using port %DEV_PORT%.
echo   - Run "npm run dev" directly in this folder to see the
echo     complete output.
echo   - Confirm your Node.js version is 20.19 or newer.
echo ----------------------------------------------------------------
echo.
pause
exit /b 1
