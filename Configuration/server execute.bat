@echo off
REM Change to the directory where this .bat file is located
cd /d %~dp0

echo Starting Node server...
node server.js

echo.
echo Server stopped.
pause