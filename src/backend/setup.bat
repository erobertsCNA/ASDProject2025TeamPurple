@echo off
echo Setting up the project...

:: Step 1: Check if Node.js is installed
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo Error: Node.js is not installed. Please install it from https://nodejs.org/
    exit /b
)
echo [SUCCESS] Node.js is installed!

:: Step 2: Ask for MongoDB connection string and database name
set /p MONGO_URI=Enter your MongoDB connection string:
set /p DB_NAME=Enter your database name:

:: Step 3: Ask for a port, ensuring it's NOT 3000
:ask_port
set /p BACKPORT=Enter the port number for your app (default: 5000, must not be 3000):

:: Use default port 5000 if left blank
if "%BACKPORT%"=="" set BACKPORT=5000

:: Ensure port is NOT 3000
if "%BACKPORT%"=="3000" (
    echo Port 3000 is reserved for React. Please choose another port.
    goto ask_port
)

:: Step 4: Create .env file with user-provided values
(
    echo MONGO_URI=%MONGO_URI%
    echo DB_NAME=%DB_NAME%
    echo BACKPORT=%BACKPORT%
    echo JWT_SECRET=yourSuperSecretKey
    echo NODE_ENV=development  # Change to 'production' in production environment
) > .env

echo .env file created successfully!

:: Step 5: Install dependencies from package.json
echo Installing dependencies...
call npm install
echo.
echo ==================================
echo Setup complete! You can now run:
echo   npm run dev  (for nodemon)
echo   npm start    (for normal node)
echo ==================================
