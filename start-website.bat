@echo off
title Sterling & Associates Law Firm Website
cd /d "%~dp0law-firm-website"
echo Starting Sterling & Associates Law Firm Website...
echo Opening http://localhost:5174 in your browser...
start http://localhost:5174
npm run dev -- --port 5174
pause
