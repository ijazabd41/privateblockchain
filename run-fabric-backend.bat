@echo off
echo Starting Fabric-Inspired Blockchain Backend...
cd backend
echo Current directory: %CD%
echo.
echo Installing dependencies...
npm install
echo.
echo Starting Fabric-inspired blockchain server...
echo.
echo The server will start with:
echo - REST API on http://localhost:4000
echo - WebSocket on ws://localhost:4000
echo - Default channel: mychannel
echo - Default chaincode: document-registry-1.0
echo.
echo Default users:
echo - admin/admin123 (ADMIN)
echo - healthcare_user/health123 (HEALTHCARE)
echo - agriculture_user/agri123 (AGRICULTURE)
echo - finance_user/finance123 (FINANCE)
echo.
npm start
pause 