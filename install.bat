@echo off
echo =========================================
echo Astraeus Rupertus 2.0 - Installation
echo =========================================
echo.

echo Checking Node.js installation...
node --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Node.js is not installed!
    echo Please install Node.js 18 or higher from https://nodejs.org/
    pause
    exit /b 1
)

echo Node.js found:
node --version
echo.

echo Checking npm...
npm --version
echo.

echo Installing dependencies...
echo This may take a few minutes...
echo.

npm install

if errorlevel 1 (
    echo.
    echo ERROR: Installation failed!
    echo Try running: npm install --legacy-peer-deps
    pause
    exit /b 1
)

echo.
echo =========================================
echo Installation Complete! 🎉
echo =========================================
echo.
echo To start the development server, run:
echo   npm run dev
echo.
echo Then open your browser to:
echo   http://localhost:3000
echo.
echo For more information, see README.md
echo =========================================
pause

