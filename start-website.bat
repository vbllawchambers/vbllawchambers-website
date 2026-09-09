@echo off
title VBL Law Chambers Website
cd /d "%~dp0website"
echo Starting VBL Law Chambers Website...
echo Opening http://localhost:5174 in your browser...
start http://localhost:5174
npm run dev -- --port 5174
pause
