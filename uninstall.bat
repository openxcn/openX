@echo off
chcp 65001 >nul
title OpenX 系列产品卸载工具

echo.
echo ========================================
echo   OpenX 系列产品卸载工具
echo ========================================
echo.
echo 正在启动卸载工具...
echo.

powershell -ExecutionPolicy Bypass -File "%~dp0uninstall.ps1"

pause
