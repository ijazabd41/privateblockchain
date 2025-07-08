@echo off
echo Starting Backend Server...
cd backend
echo Current directory: %CD%
echo.
echo Make sure you have created a .env file in the backend directory with:
echo CONTRACT_ADDRESS=your_contract_address
echo PRIVATE_KEY=your_private_key
echo PROVIDER_URL=your_provider_url
echo PORT=4000
echo.
echo Installing dependencies...
npm install
echo.
echo Starting server...
npm start
pause 