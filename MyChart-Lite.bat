@echo off
title MyChart-Lite Experiment Server
echo ==========================================
echo   MyChart-Lite - Experiment Server
echo ==========================================
echo.
echo Starting server...
echo.
cd /d D:\FramingApp\MyChart-Lite\server
start "MyChart Server" node index.js
timeout /t 2 /nobreak >nul

REM Try Edge first (default path on Windows), fall back to Chrome
set "EDGE_PATH=C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"

if exist "%EDGE_PATH%" (
    echo Opening Microsoft Edge in kiosk mode...
    start "" "%EDGE_PATH%" --kiosk http://localhost:3001 --edge-kiosk-type=fullscreen --no-first-run
) else (
    echo Edge not found, trying Chrome...
    start chrome --kiosk --incognito http://localhost:3001
)

echo.
echo Browser launched. Press Alt+F4 to exit kiosk mode.
echo Close this window after the session ends.
echo.
pause