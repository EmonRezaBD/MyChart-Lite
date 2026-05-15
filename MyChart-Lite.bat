@echo off
title MyChart-Lite Experiment Server
echo ==========================================
echo   MyChart-Lite - Experiment Server
echo ==========================================
echo.
echo Starting server...
echo Open http://localhost:3001 in your browser
echo Press Ctrl+C to stop
echo.
cd /d D:\FramingApp\MyChart-Lite\server
node index.js
pause